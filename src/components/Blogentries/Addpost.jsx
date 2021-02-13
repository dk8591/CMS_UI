import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Settings from '../../config/globalConfig';

const apiUrl = Settings.API_ROOT;
let srcData = ''
class Addpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      Image64: '',
      imagename: ''
    }
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content, Imagename, Image64 } = this.state;
    if (title.length > 0 && content.length > 0) {
      const params = {
        blogHeader: title,
        blogBody: content,
        name: Imagename,
        buffer: Image64
      }
      axios
        .post(`${apiUrl}/addblogentries`, params)
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


  getimg = () => {

    const filesSelected = document.getElementById('inimg2').files;
    if (filesSelected.length > 0) {
      const fileToLoad = filesSelected[0];
      console.log(filesSelected);
      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        srcData = fileLoadedEvent.target.result; // <--- data: base64

        console.log(srcData);




      };


      setTimeout(() => {
        this.imgsave(fileToLoad.name, srcData);

      }, 1000);
      fileReader.readAsDataURL(fileToLoad);

    }
  };

  imgsave = (name, srcData) => {
      const st = srcData.split(',');

    console.log(st);
    
    this.setState({

      Image64: st[1],
      Imagename: name,
    })



  };


  render() {
    const { title, content } = this.state;

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
          <input
            accept="image/*"

            className="mb-3 flex flex-col "
            id="inimg2"
            single
            label="hello"

            onChange={this.getimg}

            type="file"
          />
         
          <Button block size="lg" type="submit" >
            Add Blog Entry
        </Button>
        </Form>
      </div>

    );
  }
}

export default Addpost;