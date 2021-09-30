import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store';
import Showcase from '../components/landing/Showcase';
import faker from 'faker';

function buildRegisterForm(overrides) {
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    password2: this.password,
    ...overrides,
  };
}
test('submitting the form calls register with name, username, email, pw, and pw2 ', () => {
  const mockRegister = jest.fn();

  render(
    <Provider store={store}>
      <Showcase register={mockRegister} image="showcase image" />
    </Provider>
  );

  const { name, username, email, password, password2 } = buildRegisterForm();

  userEvent.type(screen.getByPlaceholderText(/Name/), name);
  userEvent.type(screen.getByRole('textbox', { name: /username/i }), username);
  userEvent.type(screen.getByPlaceholderText(/email/i), email);
  userEvent.type(screen.getByPlaceholderText(/new password/i), password);
  userEvent.type(screen.getByPlaceholderText(/confirm password/i), password2);
  userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  expect(mockRegister).toHaveBeenCalledTimes(1);
  expect(mockRegister).toHaveBeenCalledWith(
    expect.objectContaining({
      name,
      username,
      email,
      password,
      password2,
    })
  );
});
