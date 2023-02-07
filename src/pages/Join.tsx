import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';
import styles from './Style.module.css';

export default function Join() {
  const [email, setEmail] = React.useState<string>('');
  const [pw, setPW] = React.useState<string>('');

  const navigate = useNavigate();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPW(e.currentTarget.value);
  };

  const join = () => {
    signup(email, pw).then(() => {
      navigate('/signin');
    });
  };

  return (
    <div className={styles.container}>
      <h2>회원가입</h2>
      <h3>이메일</h3>
      <input className={styles.input} onChange={onChangeEmail} data-testid='email-input' placeholder='이메일을 입력하세요' />
      <h3>패스워드</h3>
      <input className={styles.input} onChange={onChangePW} data-testid='password-input' placeholder='비밀번호를 입력하세요' />
      <button className={styles.button} data-testid='signup-button' disabled={!(email.includes('@') && pw.length > 7)} onClick={join}>
        회원가입
      </button>
    </div>
  );
}
