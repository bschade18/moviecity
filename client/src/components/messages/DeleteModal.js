import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { deleteMessage } from '../../actions/messages';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DeleteModal = ({ id, toggleChat, deleteMessage }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div onClick={toggle}>
      <i className="fa fa-trash"></i>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader>Delete Message?</ModalHeader>
        <ModalBody>
          <div>This will permanently remove this message</div>
          <Button color="secondary" onClick={toggle} className="mt-3">
            Cancel
          </Button>{' '}
          <Button
            color="danger"
            onClick={() => deleteMessage(id, toggleChat)}
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
  toggleChat: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default connect(null, { deleteMessage })(DeleteModal);
