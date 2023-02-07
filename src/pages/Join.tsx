import React from 'react';

export default function Join() {
  return (
    <div>
      회원가입
      <input data-testid='email-input' />
      <input data-testid='password-input' />
      <button data-testid='signup-button'>회원가입</button>
    </div>
  );
}
