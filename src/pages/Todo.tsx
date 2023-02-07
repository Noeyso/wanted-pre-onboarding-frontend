import React from 'react';

export default function Todo() {
  return (
    <div>
      Todos
      <ul>
        {Array(5)
          .fill(0)
          .map((num, i) => (
            <li>아이템{i}</li>
          ))}
      </ul>
    </div>
  );
}
