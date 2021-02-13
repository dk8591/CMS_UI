import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Settings from '../config/globalConfig';


import "../App.css";
const apiUrl = Settings.API_ROOT;

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
            email:'',
            password:''
        }
    }

//   function validateForm() {
//     return email.length > 0 && password.length > 0;
//   }

   handleSubmit=(event)=> {
    event.preventDefault();
const {email,password}=this.state;

    if(email!=='' && password!==''){
const params={
  email:email,
  password:password
}
      axios
      .post(`${apiUrl}/login`,params)
      .then(response => response.data)
      .then(
          result => {
           
              console.log(result);
        this.props.history.push('/home');
        localStorage.setItem('Token',result.token)
        localStorage.setItem('role',result.data.role)
              

          },
          err => {
              console.log(err);
          }
      );

    
    }

  }
  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
    render() {
const {email,password}=this.state;
        
        return (
            <div className="Login">
              
      <Form onSubmit={this.handleSubmit}>
   
      <Form.Label className="mb-5"> <h4>  LOGIN TO YOUR ACCOUNT</h4></Form.Label>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
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
        {/* <Button block size="lg" type="submit" disabled={!this.validateForm()}> */}
        <Button block size="lg" type="submit" >
          Login
        </Button>
      </Form>
    </div>
 
        );
    }
}

export default Login;