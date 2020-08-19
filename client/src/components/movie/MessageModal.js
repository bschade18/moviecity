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

import { sendMessage } from '../../actions/messages';
import { imageUrl } from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MessageModal = ({
  movie: { original_title, poster_path },
  user,
  users,
  sendMessage,
}) => {
  const [recipient, setRecipient] = useState('');
  const [text, setText] = useState('');
  const [modal, setModal] = useState(false);

  const onSubmitMessage = (e) => {
    e.preventDefault();

    const newMessage = {
      sender: user.username,
      recipient,
      movieTitle: original_title,
      conversation: [{ name: user.username, text: text }],
      imageUrl: `${imageUrl}w185${poster_path}`,
    };

    sendMessage(newMessage);
  };

  const toggle = () => setModal(!modal);

  const onChangeRecipient = (e) => {
    setRecipient(e.target.value);
  };

  return (
    <Fragment>
      <Button
        color="outline-success"
        onClick={toggle}
        className="review-movie-btn"
      >
        Send to Friend
      </Button>
      <Modal isOpen={modal} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>Message</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmitMessage}>
            <FormGroup>
              <Label for="select">Send To:</Label>
              <select
                required
                className="form-control"
                value={recipient}
                name="recipient"
                onChange={onChangeRecipient}
                id="recipient"
              >
                <option value="">--Select Friend--</option>
                {users
                  .filter((friend) => user.friends.includes(friend.username))
                  .map((user) => {
                    return (
                      <option key={user.username} value={user.username}>
                        {user.username}
                      </option>
                    );
                  })}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="name">Comments</Label>
              <Input
                type="textarea"
                name="comments"
                id="comments"
                placeholder="Enter comments..."
                className="mb-3"
                onChange={(e) => setText(e.target.value)}
              />
            </FormGroup>
            <Button className="send-btn" color="primary" type="submit" block>
              Send!
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

MessageModal.propTypes = {
  users: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});

export default connect(mapStateToProps, { sendMessage })(MessageModal);
