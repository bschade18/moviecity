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
  const [uploadedFile, setUploadedFile] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [name, setName] = useFormState(user.name);
  const [username, setUsername] = useFormState(user.username);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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

      const fileName = res.data.filename;

      setUploadedFile(fileName);

      updateUserImage(fileName);

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

  const onSubmitUserChanges = (e) => {
    e.preventDefault();

    updateUser(user._id, { name, username });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Profile Picture</label>
        <div className="custom-file mb-4">
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
        <Progress percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-block mt-4 upload-btn"
        />
      </form>

      {uploadedFile ? (
        <div className="row mt-5">
          <div className="m-auto">
            <img
              style={{ width: '100%', borderRadius: '50%' }}
              src={`/uploads/${uploadedFile}`}
              alt=""
            />
          </div>
        </div>
      ) : null}
      {message && <p className="text-center mt-2">{message}</p>}
      <form onSubmit={onSubmitUserChanges}>
        <div className="form-group mt-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={setName}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={setUsername}
          />
        </div>
        <button className="btn btn-success btn-block" type="submit">
          Save
        </button>
      </form>
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
