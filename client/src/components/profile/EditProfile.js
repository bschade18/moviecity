import '../../styles/EditProfile.css';
import React, { useState } from 'react';
import { updateUserPhoto } from '../../actions/auth';
import { updateUser } from '../../actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useFormState from '../hooks/useFormState';

const EditProfile = ({ user, updateUser, updateUserPhoto }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');

  const [name, setName] = useFormState(user.name);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // update user name
    updateUser(user._id, { name });

    // update user photo
    const formData = new FormData();
    formData.append('file', file);

    updateUserPhoto(formData, setMessage);
  };

  return (
    <div className="edit-profile">
      <form onSubmit={onSubmit}>
        <label>Profile Picture</label>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        {file instanceof File ? (
          <img
            className="edit-profile-img"
            src={URL.createObjectURL(file)}
            alt="user avatar"
          />
        ) : (
          <img
            className="edit-profile-img"
            src={`/uploads/${user.photo}`}
            alt="user avatar"
          />
        )}
        <div className="form-group mt-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={setName}
          />
        </div>
        <input
          type="submit"
          value="Save"
          className="btn btn-block mt-4 upload-btn"
        />
      </form>
      {message && (
        <p className="edit-profile-msg text-center mt-2">{message}</p>
      )}
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserPhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser, updateUserPhoto })(
  EditProfile
);
