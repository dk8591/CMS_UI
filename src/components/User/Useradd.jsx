import React, { Component } from 'react';
import axios from 'axios';

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';
import Settings from '../../config/globalConfig';

const apiUrl = Settings.API_ROOT;

class Useradd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'Admin',
      show: false

    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { firstname, lastname, email, password, role } = this.state
    const data = {
      firstName: firstname,
      lastName: lastname,
      emailId: email,
      role: role,
      password: password
    }
    axios
      .post(`${apiUrl}/adduser`, data)
      .then(response => response.data)
      .then(
        result => {
          this.props.transfer.close()
          this.props.transfer.get()

          console.log(result);
          this.setState({
            entries: result.data

          });

        },
        err => {
          console.log(err);
        }
      );
  }


  render() {
    const { firstname, lastname, email, password, role } = this.state;
    return (
      <div className="Addpost w-100">


        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              name="firstname"
              value={firstname}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control

              type="text"
              name="lastname"
              value={lastname}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Email</Form.Label>
            <Form.Control

              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group size="lg" >
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" name="role" value={role} onChange={this.handleChange}>
              <option value='Admin'>Admin</option>
              <option value='User'>User</option>

            </Form.Control>
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button block size="lg" type="submit" >
            Add User
        </Button>
        </Form>
      </div>

    );
  }
}

export default Useradd;