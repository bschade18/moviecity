import React, { useState, Fragment } from 'react';
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
import Rating from './Rating';
import { addReview } from '../../actions/review';
import { imageUrl } from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ReviewModal = ({ movie, addReview, history, user }) => {
  const [rating, setRating] = useState(null);
  const [text, setText] = useState('');
  const [modal, setModal] = useState(false);

  const onSubmitReview = (e) => {
    e.preventDefault();

    const newReview = {
      name: user.name,
      user: user._id,
      username: user.username,
      movieTitle: movie.original_title,
      rating,
      imageUrl: `${imageUrl}w185${movie.poster_path}`,
      text,
      movieId: movie.id,
    };

    addReview(newReview, history);
  };

  const toggle = () => setModal(!modal);

  return (
    <Fragment>
      <Button color="success" onClick={toggle} className="review-movie-btn">
        Review Movie
      </Button>
      <Modal isOpen={modal} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>Review Movie</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmitReview}>
            <Rating setRating={setRating} rating={rating} />
            <FormGroup>
              <Label for="name">Comments</Label>
              <Input
                type="textarea"
                name="comments"
                id="comments"
                placeholder="Enter comments..."
                className="mb-3"
                rows="4"
                onChange={(e) => setText(e.target.value)}
              />
            </FormGroup>
            <Button className="send-btn" color="primary" type="submit" block>
              Post Review
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

ReviewModal.propTypes = {
  addReview: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(null, { addReview })(ReviewModal);
