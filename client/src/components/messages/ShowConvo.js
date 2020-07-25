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
  <div className="message-container">
    <div className="message-container-heading">
      <span className="message-heading-left">
        <img className="message-img mr-3" src={movieImg} alt="movie" />
        <h3 className="message-movietitle">{movieTitle}</h3>
      </span>

      <div className="icons">
        <i className="fa fa-times" onClick={toggleConvo}></i>
        <DeleteModal id={messageId} toggleConvo={toggleConvo} />
      </div>
    </div>
    <div id="message-body">
      <div className="messages mb-5">{renderConvo()}</div>
      <div ref={messagesEndRef} />
    </div>
    <form className="message-form" onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        className="message-reply form-control"
        value={text}
      />
      <input
        className="btn btn-success messages-reply-submit ml-1"
        type="submit"
        id="submit"
        value="Reply"
      />
    </form>
  </div>
);

export default ShowConvo;
