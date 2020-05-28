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
  const [review, setReview] = useState(null);
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

    axios.post('/reviews', newReview).then((res) => console.log(res.data));
    setTimeout(() => (window.location = '/main'), 500);
  };

  const setStar = (number) => {
    setReview(number);
  };

  const renderStar = (number) => (
    <span
      onClick={() => setStar(number)}
      className={review >= number ? 'fa fa-star checked' : 'fa fa-star hover'}
    ></span>
  );
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle} className="review-movie-btn">
        Review Movie
      </Button>
      <Modal isOpen={modal} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>Review Movie</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmitReview}>
            <div className="rating">
              {renderStar(5)}
              {renderStar(4)}
              {renderStar(3)}
              {renderStar(2)}
              {renderStar(1)}
            </div>

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
