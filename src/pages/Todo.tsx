import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../api';
import styles from './Style.module.css';

export default function Todo() {
  const navigate = useNavigate();

  const [inputText, setInputText] = React.useState<string>('');
  const [todoText, setTodoText] = React.useState<string>('');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [modify, setModify] = React.useState<{ id: number; isModify: boolean }>({ id: -1, isModify: false });
  const modifyRef = React.useRef<HTMLInputElement>(null);
  const itemRef = React.useRef<HTMLLIElement[] | null[]>([]);

  const getTodoList = () =>
    getTodos().then((res) => {
      setTodos(res.data as Todo[]);
    });

  React.useEffect(() => {
    if (localStorage.getItem('login-token')) {
      getTodoList();
    } else {
      navigate('/signin');
    }
  }, []);

  const onAddTodo = () => {
    addTodo(inputText).then(() => {
      getTodoList();
      setInputText('');
      itemRef.current[todos.length - 1]!.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>, id: number, text: string) => {
    updateTodo(id, text, e.currentTarget.checked).then(() => {
      getTodoList();
    });
  };
  const onModify = (id: number, text: string, isCompleted: boolean) => {
    updateTodo(id, text, isCompleted).then(() => {
      getTodoList();
      setModify({ id: -1, isModify: false });
    });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };
  const onModifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.currentTarget.value);
  };

  const onDelete = (id: number) => {
    deleteTodo(id).then(() => {
      getTodoList();
    });
  };

  return (
    <div className={styles.container}>
      <h2>TODO LIST</h2>
      <div className={styles.add_todo}>
        <input value={inputText} onChange={onChangeInput} data-testid='new-todo-input' />
        <button onClick={onAddTodo} data-testid='new-todo-add-button'>
          추가
        </button>
      </div>

      {todos.length > 0 ? (
        <ul className={styles.todo_list}>
          {todos.map((todo, i) => (
            <li key={i} className={styles.todo_item} ref={(el) => (itemRef.current[i] = el)}>
              <label className={styles.checkbox}>
                <input type='checkbox' checked={todo.isCompleted} onChange={(e) => onCheck(e, todo.id, todo.todo)} />
                <span className={styles.checkbox_icon}></span>
                {modify.id !== todo.id && <span className={styles.checkbox_text}>{todo.todo}</span>}
              </label>

              {modify.id !== todo.id && (
                <div className={styles.btns}>
                  <button
                    className={styles.btn_modify}
                    onClick={() => {
                      setModify({ id: todo.id, isModify: true });
                      setTodoText(todo.todo);
                    }}
                    data-testid='modify-button'
                  >
                    수정
                  </button>
                  <button className={styles.btn_delete} onClick={() => onDelete(todo.id)} data-testid='delete-button'>
                    삭제
                  </button>
                </div>
              )}
              {modify.isModify && modify.id === todo.id && (
                <>
                  <input
                    type='text'
                    className={styles.modify_input}
                    value={todoText}
                    ref={modifyRef}
                    onChange={onModifyChange}
                    data-testid='modify-input'
                  />
                  <div className={styles.btns}>
                    <button
                      className={styles.btn_submit}
                      onClick={() => onModify(todo.id, modifyRef.current!.value, todo.isCompleted)}
                      data-testid='submit-button'
                    >
                      제출
                    </button>
                    <button
                      className={styles.btn_cancel}
                      onClick={() => setModify({ id: -1, isModify: false })}
                      data-testid='cancel-button'
                    >
                      취소
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.no_list}>
          <span>목록 없음</span>
          <span>TODO 아이템을 추가해주세요!</span>
        </div>
      )}
    </div>
  );
}
