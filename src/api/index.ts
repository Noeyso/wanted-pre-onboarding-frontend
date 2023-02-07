import axios, { AxiosResponse } from 'axios';

const URL = 'https://pre-onboarding-selection-task.shop';

export function signup(email: string, pw: string): Promise<AxiosResponse<any, any>> {
  const response = axios.post(
    `${URL}/auth/signup`,
    { email: email, password: pw },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
}

export const signin = (email: string, pw: string): Promise<void> => {
  const response = axios
    .post(
      `${URL}/auth/signin`,
      { email: email, password: pw },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      localStorage.setItem('login-token', res.data.access_token);
    });
  return response;
};

export function getTodos(): Promise<AxiosResponse<any, any>> {
  const response = axios.get(`${URL}/todos`, { headers: { Authorization: `Bearer ${localStorage.getItem('login-token')}` } });
  console.log(response);
  return response;
}

export function addTodo(todo: string): Promise<AxiosResponse<any, any>> {
  const response = axios.post(
    `${URL}/todos`,
    { todo },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response);
  return response;
}
