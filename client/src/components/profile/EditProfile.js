import '../../styles/EditProfile.css';
import React, { useState } from 'react';
import Progress from './Progress';
import api from '../../utils/api';
import { updateUserImage } from '../../actions/auth';
import { updateUser } from '../../actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useFormState from '../hooks/useFormState';

const EditProfile = ({ updateUserImage, user, updateUser }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

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

    try {
      const res = await api.put('/auth/photo', formData, {
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      updateUserImage(res.data);

      setMessage('Success!');
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.error);
      }
    }
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

        <Progress percentage={uploadPercentage} />

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
  updateUserImage: PropTypes.func,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUserImage, updateUser })(
  EditProfile
);
