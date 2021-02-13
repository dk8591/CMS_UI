import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';


let path = "/home"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: "/home",
            auth: ''

        }
    }

    change = (e) => {

        path = e.target.value
        const { history } = this.props;

        history.push(path);
        this.setState({
            pages: path
        })
    }

    render() {

        return (
            <div className="d-flex mt-4 mr-2">
                <div className="flex flex-column" hidden={localStorage.getItem('role') === 'Admin' ? false : true}>
                    <Form >
                        <Form.Group size="lg" >

                            <Form.Control as="select" onChange={this.change} value={path} name='pages'>
                                <option value="/home">Home</option>
                                <option value="/userlist" >Manage Users</option>
                                <option value="/Bloglist" >Manage Blog Posts</option>
                                <option value="/commentlist" >Manage Comments</option>

                            </Form.Control>
                        </Form.Group>

                    </Form>


                </div>
                <div className="flex flex-column ml-3"><Button variant='primary' onClick={() => { localStorage.removeItem('Token'); localStorage.removeItem('role'); this.props.history.push('/Login') }}>Logout</Button></div>
            </div>
        );
    }
}
export default withRouter(Header);
