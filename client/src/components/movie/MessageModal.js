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
  sendMessage,
  history,
}) => {
  const [recipient, setRecipient] = useState('');
  const [text, setText] = useState('');
  const [modal, setModal] = useState(false);

  const onSubmitMessage = (e) => {
    e.preventDefault();
    let messageRecipient = user.friends.filter(
      (friend) => friend.username === recipient
    );

    const newMessage = {
      recipient: messageRecipient[0]._id,
      sender: user._id,
      movieTitle: original_title,
      conversation: [{ user: user._id, text: text }],
      imageUrl: `${imageUrl}w185${poster_path}`,
    };

    sendMessage(newMessage, history);
  };

  const toggle = () => setModal(!modal);

  const onChangeRecipient = (e) => setRecipient(e.target.value);

  return (
    <Fragment>
      <Button color="success" onClick={toggle}>
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
                {user.friends.map((friend) => (
                  <option key={friend._id} value={friend.username}>
                    {friend.username}
                  </option>
                ))}
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
  sendMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});

export default connect(mapStateToProps, { sendMessage })(MessageModal);
