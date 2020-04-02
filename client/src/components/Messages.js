import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Message = props => (
  <tr>
    <td>{props.message.sender}</td>
    <td>
      <img
        className="movie-poster-list-img"
        src={props.message.imageUrl}
        alt="movie poster"
      />
    </td>
    <td>{props.message.movieTitle}</td>
    <td>{props.message.message}</td>
  </tr>
);

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    axios
      .get('/message/')
      .then(response => {
        this.setState({
          messages: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  messagesList() {
    const messages = this.state.messages.filter(
      currentmessage => currentmessage.recipient === this.props.user.name
    );

    return messages.map(currentmessage => {
      return <Message message={currentmessage} key={currentmessage._id} />;
    });
  }

  render() {
    return (
      <div>
        <div id="navigation">
          <div className="navigation-container">
            <div className="navigation-content">
              <Link to="/">
                <p>Home</p>
              </Link>
              <p>|</p>
              <p>Inbox</p>
            </div>
          </div>
        </div>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>From</th>
              <th>Movie</th>
              <th>Title</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>{this.messagesList()}</tbody>
        </table>
      </div>
    );
  }
}
