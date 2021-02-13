import React, { Component } from 'react';
import axios from 'axios';

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';
import Settings from '../../config/globalConfig';

const apiUrl = Settings.API_ROOT;

class Userupdate extends Component {
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
  componentDidMount() {
    axios
      .get(`${apiUrl}/getuserbyid/${this.props.id}`)
      .then(response => response.data)
      .then(
        result => {


          this.setState({
            firstname: result.data.firstname,
            lastname: result.data.lastname,
            email: result.data.emailid,
            password: result.data.password,
            role: result.data.role,
            id: result.data.id

          });

        },
        err => {
          console.log(err);
        }
      );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { firstname, lastname, email, password, role, id } = this.state
    const data = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      emailid: email,
      role: role,
      password: password
    }
    axios
      .put(`${apiUrl}/updateuser`, data)
      .then(response => response.data)
      .then(
        result => {
          this.props.transfer.close()
          this.props.transfer.get()

          console.log(result);


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
            Update User
        </Button>
        </Form>
      </div>

    );
  }
}

export default Userupdate;