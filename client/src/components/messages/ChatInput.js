import '../../styles/ChatInput.css';
import React from 'react';

const ChatInput = ({ onSubmit, setText, text }) => (
  <form className="show-chat-form" onSubmit={onSubmit}>
    <input
      onChange={setText}
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
);

export default ChatInput;
