import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Col, Row, Button} from 'reactstrap';
import axios from "axios";

class MainPage extends Component {

  state = {
    modalOpen: false
  }

  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  componentDidMount() {
    axios.get('http://localhost:3000/')
      .then(res => {
        this.setState({
          posts: res.data,
          loading: false
        })
      })

  }

  render() {
    return (
      <Row>
        {/* <Col md={12}> is same as <div className="col-md-12">  */}
        <div className="col-md-12">
          Main Page
        </div>

        <Col md={12}>
          <Button color="success" onClick={this.toggle}>Toggle Modal</Button>
        </Col>

        <Col md={12}>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
              <div className="col-lg-12 table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr className="table">
                      <th>Id</th>
                      <th>body</th>
                      <th>User Id</th>
                      <th>title</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loading
                      ? <tr><td>LOADING</td></tr>
                      : this.state.posts.map((x, i) => (
                        <tr key={i}>
                          <td>{x.id}</td>
                          <td>{x.body}</td>
                          <td>{x.userId}</td>
                          <td>{x.title}</td>
                          <td>
                            <div className="d-flex flex-wrap align-content-center">
                              <button onClick={() => this.setState({ post: x })} className="btn btn-warning editBtn">
                                Edit
                        </button>
                              <button onClick={() => this.deletePost(x.id)} className="btn btn-danger deleteBtn">
                                Delete
                        </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

          </ModalBody>
          <ModalFooter>
            <div>
              Footer
            </div>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </Col>
      </Row>
    );
  }
}

export default MainPage;
