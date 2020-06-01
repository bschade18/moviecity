import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

const DeleteModal = ({ id }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const deleteMessage = (id) => {
    axios.delete(`/messages/${id}`).then((response) => {
      console.log(response.data);
    });
    toggle();
  };

  return (
    <div>
      <i onClick={toggle} className="fa fa-trash"></i>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader>Delete Message?</ModalHeader>
        <ModalBody>
          <div>This will permanently remove this message</div>
          <Button color="secondary" onClick={toggle} className="mt-3">
            Cancel
          </Button>{' '}
          <Button
            color="danger"
            onClick={() => deleteMessage(id)}
            className="mt-3"
          >
            Delete
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

DeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteModal;
