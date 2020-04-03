import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import axios from "axios";

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: "",
      email: "",
      password: "",
      msg: null
    };
  }

  componentDidUpdate() {
    if (this.state.modal) {
      if (this.props.isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password
    };

    this.register(newUser);
  };

  returnErrors = (data, status) => {
    this.setState({
      msg: data.msg
    });
  };

  register = newUser => {
    const { name, email, password } = newUser;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name, email, password });

    axios
      .post("/auth/register", body, config)
      .then(res => this.registerSuccess(res.data))
      .catch(err => this.returnErrors(err.response.data, err.response.status));
  };

  registerSuccess = data => {
    localStorage.setItem("token", data.token);
    this.props.authSuccess(data.user);
  };

  render() {
    return (
      <div>
        <div>
          <Button
            id="register-btn"
            color="primary"
            onClick={this.toggle}
            href="#"
          >
            Sign up
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create your account</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Button color="primary" style={{ marginTop: "2rem" }} block>
                  Create
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
