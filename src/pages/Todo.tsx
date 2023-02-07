import React from 'react';
import styles from './Style.module.css';

export default function Todo() {
  React.useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2>TODO LIST</h2>
      <div className={styles.add_todo}>
        <input data-testid='new-todo-input' />
        <button data-testid='new-todo-add-button'>추가</button>
      </div>
      <ul>
        <li key={0} className={styles.todo_item}>
          <label>
            <input type='checkbox' />
            <span>TODO 1</span>
            <button data-testid='modify-button'>수정</button>
            <button data-testid='delete-button'>삭제</button>
          </label>
        </li>
      </ul>
    </div>
  );
}
