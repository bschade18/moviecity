import '@testing-library/jest-dom';

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store';

import Showcase from '../components/landing/Showcase';

test('submitting the form calls onSubmit with name, username, email, pw, and pw2 ', () => {
  let submittedData;
  const onSubmit = (data) => {
    submittedData = data;
  };
  render(
    <Provider store={store}>
      <Showcase onSubmit={onSubmit} />
    </Provider>
  );
  screen.debug();

  screen.getByPlaceholderText(/new password/i);
  screen.getByPlaceholderText(/confirm password/i);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  screen.debug();

  expect(submittedData).toEqual({
    username: 'bobbys',
    password: 'password',
  });
});
