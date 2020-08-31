import React from 'react';
import DeleteModal from './DeleteModal';

const ShowConvo = ({
  movieImg,
  messageId,
  movieTitle,
  toggleConvo,
  renderConvo,
  onSubmit,
  onChange,
  text,
  messagesEndRef,
}) => (
  <div className="show-convo">
    <div className="show-convo-heading">
      <span className="show-convo-heading-left">
        <img className="show-convo-img mr-3" src={movieImg} alt="movie" />
        <h3 className="show-convo-movietitle">{movieTitle}</h3>
      </span>

      <div className="show-convo-icons">
        <i className="fa fa-times" onClick={toggleConvo}></i>
        <DeleteModal id={messageId} toggleConvo={toggleConvo} />
      </div>
    </div>
    <div className="show-convo-body">
      <div className="show-convo-messages mb-5">{renderConvo()}</div>
      <div ref={messagesEndRef} />
    </div>
    <form className="show-convo-form" onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        className="form-control"
        value={text}
      />
      <input
        className="btn btn-success ml-1"
        type="submit"
        id="submit"
        value="Reply"
      />
    </form>
  </div>
);

export default ShowConvo;
