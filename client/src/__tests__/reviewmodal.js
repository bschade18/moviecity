import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store';
import ReviewModal from '../components/movie/ReviewModal';

test('submitting the review form calls onSubmit with rating and review text', () => {
  let submittedData;
  const onSubmitReview = (data) => (submittedData = data);

  const movie = { title: 'liar liar' };
  const user = { name: 'Bobby' };

  render(
    <Provider store={store}>
      <ReviewModal
        onSubmit={onSubmitReview}
        addReview={() => {}}
        movie={movie}
        user={user}
        rating={3}
      />
    </Provider>
  );

  userEvent.click(screen.getByRole('button', { name: /review movie/i }));

  const review = 'I liked this movie a lot';
  userEvent.type(screen.getByPlaceholderText(/enter comments/i), review);
  userEvent.click(screen.getByRole('button', { name: /post review/i }));

  expect(submittedData).toEqual({
    review,
  });
});
