import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    // Ofc, you should use the local not this link
    axios.get('http://localhost:3000/users')
      .then(res => {
        this.setState({
          users: res.data
        })

        // Now the state will be updated with the data received from response
      })
  }

  render() {
    return (
      <div className="row">
        Users CRUD
      </div>
    );
  }
}

export default Users;
