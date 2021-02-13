import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Settings from '../../config/globalConfig';
import Button from 'react-bootstrap/esm/Button';
import Header from '../Header.jsx';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { verifyToken } from '../../store/Action/Token/verifytoken';


const apiUrl = Settings.API_ROOT;

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],


        }
    }
    componentDidMount() {
        this.props.verifyToken()
        this.getallblogs()
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props)
        if (props.token.length <= 0) {
            props.history.push("/Login")
        }

    }
    getallblogs = () => {
        axios
            .get(`${apiUrl}/allblogentries`)
            .then(response => response.data)
            .then(
                result => {

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
        const { entries } = this.state
        return (
            <div className="w-100" >
                <div className="w-100 d-flex justify-content-end">

                    <Header />
                </div>
                {entries.map(i => (
                    <div className=" p-5 ">
                        <Card className="">
                           {i.pictureurl!==null? <Card.Header><img src={i.pictureurl} alt='pic' style={{width:'100px', height:'50px'}}></img></Card.Header>:null}
                            <Card.Body>
                                <Card.Title><h1>{i.blogheading}</h1></Card.Title>
                                <Card.Text>
                                    {i.blogbody}
                                </Card.Text>
                                <Button variant="primary" onClick={() => this.props.history.push('/blogpost', { blogid: i.id })}>Read more</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">Posted by: <cite >{i.postedby} </cite> . Posted on: <cite >{new Date(i.createddate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                day: '2-digit',
                                month: '2-digit',
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            })}</cite> </Card.Footer>
                        </Card>

                    </div>
                ))}


            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.reducer1.token

})

export default withRouter(connect(mapStateToProps, { verifyToken })(Homepage));
