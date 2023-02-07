import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../api';
import styles from './Style.module.css';

export default function Login() {
  const [email, setEmail] = React.useState<string>('');
  const [pw, setPW] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const navigate = useNavigate();

  React.useEffect(() => {
    const loginToken = localStorage.getItem('login-token');
    if (loginToken) {
      navigate('/todo');
    }
  }, []);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPW(e.currentTarget.value);
  };
  const login = () => {
    signin(email, pw)
      .then(() => {
        navigate('/todo');
      })
      .catch((e) => {
        setErrorMessage(e.response.data.message);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>
      <h3 className={styles.label}>이메일</h3>
      <input
        className={styles.input}
        onChange={onChangeEmail}
        data-testid='email-input'
        placeholder='이메일을 입력하세요'
      />
      <h3 className={styles.label}>패스워드</h3>
      <input
        className={styles.input}
        onChange={onChangePW}
        data-testid='password-input'
        placeholder='비밀번호를 입력하세요'
      />
      <span className={styles.error}>{errorMessage}</span>
      <button
        className={styles.button}
        data-testid='signin-button'
        disabled={!(email.includes('@') && pw.length > 7)}
        onClick={login}
      >
        로그인
      </button>

      <span className={styles.is_join}>
        가입을 안하셨나요? <Link to='/signup'>가입하기</Link>
      </span>
    </div>
  );
}
