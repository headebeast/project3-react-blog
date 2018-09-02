import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Col, Row, Button} from 'reactstrap';


class MainPage extends Component {

  state = {
    modalOpen: false
  }

  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
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
