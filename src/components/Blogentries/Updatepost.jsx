import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Settings from '../../config/globalConfig';

const apiUrl = Settings.API_ROOT;

class Updatepost extends Component {
    constructor(props) {
		super(props);
		this.state = {
            id:'',
            title:'',
            content:''
        }
    }


componentDidMount(){
    axios
      .get(`${apiUrl}/getentrybyid/${this.props.id}`)
      .then(response => response.data)
      .then(
          result => {
                        
              
              this.setState({
               title:result.data.blogheading,
               content:result.data.blogbody,
                id:result.data.id
                 
              });

          },
          err => {
              console.log(err);
          }
      );
}
   handleSubmit=(event)=> {
    event.preventDefault();
    const {title,content,id}=this.state;
if(title.length > 0 && content.length > 0){
    const params={
       
        title:title,
        content:content,
         id:id
    }
    axios
            .put(`${apiUrl}/updateblogentry`,params)
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
    
  }
  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
    render() {
const {title,content}=this.state;
        
        return (
            <div className="Addpost w-100">
                 
      <Form onSubmit={this.handleSubmit}>
        <Form.Group size="lg" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            autoFocus
            type="title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
          //  maxLength={200}
         
            name="content"
            value={content}
            onChange={this.handleChange}
          />
        </Form.Group>
      
        <Button block size="lg" type="submit" >
          Update Blog Entry
        </Button>
      </Form>
    </div>
 
        );
    }
}

export default Updatepost;