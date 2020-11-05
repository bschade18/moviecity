import '@testing-library/jest-dom';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Landing from '../components/landing/Landing';

test('logs in user when log in is pressed', () => {
  render(<Landing>{testMessage}</Landing>);
});
