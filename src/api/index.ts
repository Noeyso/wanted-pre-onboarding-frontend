import axios, { AxiosResponse } from 'axios';

const URL = 'https://pre-onboarding-selection-task.shop';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export function signup(email: string, pw: string): Promise<AxiosResponse<any, any>> {
  const response = instance.post(`${URL}/auth/signup`, { email: email, password: pw });

  return response;
}

export const signin = (email: string, pw: string): Promise<void> => {
  const response = instance.post(`${URL}/auth/signin`, { email: email, password: pw }).then((res) => {
    localStorage.setItem('login-token', res.data.access_token);
  });

  return response;
};
