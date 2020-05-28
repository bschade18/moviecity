import React, { useState, useEffect } from 'react';
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

const MessageModal = ({ movie: { original_title, poster_path }, user }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onSubmitMessage = (e) => {
    e.preventDefault();

    const newMessage = {
      sender: user.name,
      recipient,
      movieTitle: original_title,
      message,
      messageDate: new Date(),
      imageUrl: `${imageUrl}w185${poster_path}`,
    };

    axios.post('/messages', newMessage).then((res) => console.log(res.data));

    setTimeout(() => (window.location = '/main'), 500);
  };

  const toggle = () => setModal(!modal);

  const onChangeRecipient = (e) => {
    setRecipient(e.target.value);
  };

  return (
    <div>
      <Button color="success" onClick={toggle} className="review-movie-btn">
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
                  .filter((friend) => user.friends.includes(friend.name))
                  .map((user) => {
                    return (
                      <option key={user.name} value={user.name}>
                        {user.name}
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
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit" block>
              Send!
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MessageModal;
