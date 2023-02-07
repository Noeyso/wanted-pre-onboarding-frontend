import React from 'react';

export default function Login() {
  return (
    <div>
      <h1>로그인 화면</h1>
      <input data-testid='email-input' />
      <input data-testid='password-input' />
      <button data-testid='signup-button'>로그인</button>
    </div>
  );
}
