import '@testing-library/jest-dom';

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store';
import UserSearch from '../components/elements/UserSearch';

test('typing in user search form correctly sets the form value', () => {
  render(
    <Provider store={store}>
      <UserSearch />
    </Provider>
  );

  const search = 'bobby';

  const input = screen.getByRole('textbox');
  userEvent.type(screen.getByRole('textbox'), search);

  expect(search).toEqual(input.value);
});
