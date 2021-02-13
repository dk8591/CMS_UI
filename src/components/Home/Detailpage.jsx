import React, { Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { verifyToken } from '../../store/Action/Token/verifytoken';
import Settings from '../../config/globalConfig';
import Card from 'react-bootstrap/esm/Card';
import Header from '../Header';

const apiUrl = Settings.API_ROOT;

class Detailpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            blogpostid: '',
            comments: '',
            pictureurl: '',
            comment: []

        }
    }
    componentDidMount() {
        this.props.verifyToken()
        console.log(this.props.location.state.blogid)
        console.log(this.props)
        axios
            .get(`${apiUrl}/getentrybyid/${this.props.location.state.blogid}`)
            .then(response => response.data)
            .then(
                result => {


                    this.setState({
                        title: result.data.blogheading,
                        content: result.data.blogbody,
                        pictureurl: result.data.pictureurl,
                        blogpostid: result.data.id

                    });
                    this.getcommentbyid(result.data.id)
                },
                err => {
                    console.log(err);
                }
            );
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props)
        if (props.token.length <= 0) {
            props.history.push("/Login")
        }

    }
    getcommentbyid = (blogpostid) => {
        axios
            .get(`${apiUrl}/commentsByblogid/${blogpostid}`)
            .then(response => response.data)
            .then(
                result => {


                    this.setState({
                        comment: result.data


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
        const { blogpostid, comments } = this.state
        if (comments.length > 0) {
            const params = {
                comment: comments,
                blogentryid: blogpostid,
                postedby: localStorage.getItem('role')
            }
            this.addcomment(params)
        }

    }
    addcomment = (params) => {
        axios
            .post(`${apiUrl}/addcomment`, params)
            .then(response => response.data)
            .then(
                result => {
                    this.setState({
                        comments: ''
                    })
                },
                err => {
                    console.log(err);
                }
            );
    }

    render() {
        const { title, content, comments, comment, pictureurl } = this.state
        return (
            <div className="Detailspage w-100">
                <div className="w-100 d-flex justify-content-end">

                    <Header />
                </div>
                <Jumbotron fluid>
                    <Button variant='primary' className="float-right mr-3" onClick={() => window.history.back()}>Back</Button>
                    <div className="d-flex justify-content-center">
                        {pictureurl !== null ? <img src={pictureurl} alt='pic' style={{ width: '150px', height: '100px' }}></img> : null}
                    </div>
                    <Container>

                    </Container>
                    <Container>

                        <h1>{title}</h1>
                        <p>
                            {content}
                        </p>
                    </Container>


                    <Container className="scroll" >
                        {comment.map(c => (
                            <Card border="primary" style={{ marginBottom: '15px' }}>
                                <Card.Header>Posted by: <cite >{c.postedby} </cite> . Posted on: <cite >{new Date(c.createddate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    day: '2-digit',
                                    month: '2-digit',
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit"
                                })}</cite></Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {c.comment}
                                    </Card.Text>
                                   
                                </Card.Body>
                            </Card>


                        ))}

                    </Container>

                    <Container>


                        <Form onSubmit={this.handleSubmit} className="Addpost">
                            <Form.Group size="lg" controlId="content">
                                <Form.Label>Add comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    variant="primary"
                                    rows={5}
                                    name="comments"
                                    value={comments}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Button block size="sm" type="submit" style={{ width: "10rem" }}>
                                Post
        </Button>
                        </Form>


                    </Container>
                </Jumbotron>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.reducer1.token

})

export default withRouter(connect(mapStateToProps, { verifyToken })(Detailpage));