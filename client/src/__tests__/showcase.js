import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store';
import Showcase from '../components/landing/Showcase';

test('submitting the form calls onSubmit with name, username, email, pw, and pw2 ', () => {
  let submittedData;
  const onSubmit = (data) => (submittedData = data);

  render(
    <Provider store={store}>
      <Showcase onSubmit={onSubmit} image="showcase image" />
    </Provider>
  );

  const name = 'coolio schade';
  const username = 'coolioboolio123';
  const email = 'cooooooolio123@gmail.com';
  const password = 'password123';
  const password2 = 'password123';

  userEvent.type(screen.getByPlaceholderText(/Name/), name);
  userEvent.type(screen.getByRole('textbox', { name: /username/i }), username);
  userEvent.type(screen.getByPlaceholderText(/email/i), email);
  userEvent.type(screen.getByPlaceholderText(/new password/i), password);
  userEvent.type(screen.getByPlaceholderText(/confirm password/i), password2);
  userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  expect(submittedData).toEqual({
    name,
    username,
    email,
    password,
    password2,
  });
});
