import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addTodo, getTodos } from '../api';
import styles from './Style.module.css';

export default function Todo() {
  const navigate = useNavigate();

  const [todos, setTodos] = React.useState<Todo[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    //console.log(localStorage.getItem('login-token'));
    if (localStorage.getItem('login-token')) {
      getTodos().then((res) => {
        setTodos(res.data as Todo[]);
      });
    } else {
      navigate('/signin');
    }
  }, []);

  const onAddTodo = () => {
    console.log(inputRef.current?.value);
    if (inputRef.current?.value) {
      addTodo(inputRef.current?.value).then(() => {
        getTodos().then((res) => setTodos(res.data as Todo[]));
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>TODO LIST</h2>
      <div className={styles.add_todo}>
        <input ref={inputRef} data-testid='new-todo-input' />
        <button onClick={onAddTodo} data-testid='new-todo-add-button'>
          추가
        </button>
      </div>

      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={0} className={styles.todo_item}>
              <label>
                <input type='checkbox' />
                <span>{todo.todo}</span>
                <button data-testid='modify-button'>수정</button>
                <button data-testid='delete-button'>삭제</button>
              </label>
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
