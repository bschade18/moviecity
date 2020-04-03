import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import axios from 'axios';
import { imageUrl } from '../config';

const ReviewModal = ({ movie, user }) => {
  const [review, setReview] = useState('');
  const [comments, setComments] = useState('');
  const [modal, setModal] = useState(false);

  const onSubmitReview = (e) => {
    e.preventDefault();

    const newReview = {
      user: user.name,
      movieTitle: movie.original_title,
      review,
      reviewDate: new Date(),
      imageUrl: `${imageUrl}w185${movie.poster_path}`,
      comments,
      movieId: movie.id,
    };

    axios.post('/review/add', newReview).then((res) => console.log(res.data));
    setTimeout(() => (window.location = '/main'), 500);
  };

  const handleClick = (e) => {
    setReview(e.target.value);
  };

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle} className="review-movie-btn">
        Review Movie
      </Button>
      <Modal isOpen={modal} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>Review Movie</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmitReview}>
            <FormGroup>
              <Button
                color={review === 'good' ? 'success' : 'secondary'}
                type="button"
                value="good"
                onClick={handleClick}
              >
                Loved it!!
              </Button>
            </FormGroup>

            <FormGroup>
              <Button
                type="button"
                color={review === 'bad' ? 'danger' : 'secondary'}
                value="bad"
                onClick={handleClick}
              >
                It's a bust
              </Button>
            </FormGroup>
            <FormGroup>
              <Label for="name">Comments</Label>
              <Input
                type="textarea"
                name="comments"
                id="comments"
                placeholder="Enter comments..."
                className="mb-3"
                onChange={(e) => setComments(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit" block>
              Post Review
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ReviewModal;
