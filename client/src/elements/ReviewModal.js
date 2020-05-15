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
            <div className="rating">
              <span
                onClick={() => setStar(5)}
                className={
                  review === 5 ? 'fa fa-star checked' : 'fa fa-star hover'
                }
              ></span>
              <span
                onClick={() => setStar(4)}
                className={
                  review >= 4 ? 'fa fa-star checked' : 'fa fa-star hover'
                }
              ></span>
              <span
                onClick={() => setStar(3)}
                className={
                  review >= 3 ? 'fa fa-star checked' : 'fa fa-star hover'
                }
              ></span>
              <span
                onClick={() => setStar(2)}
                className={
                  review >= 2 ? 'fa fa-star checked' : 'fa fa-star hover'
                }
              ></span>
              <span
                onClick={() => setStar(1)}
                className={
                  review >= 1 ? 'fa fa-star checked' : 'fa fa-star hover'
                }
              ></span>
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
