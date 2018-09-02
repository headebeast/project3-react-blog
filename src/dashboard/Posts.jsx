import React, { Component } from 'react';
import axios from "axios";

class Posts extends Component {

  state = {
    posts: [],
    loading: true,
    post: {
      title: '',
      body: '',
    }
  }

  deletePost = (id) => {
    axios.delete('http://localhost:3000/posts/' + id)
      .then(res => {
        console.log(res);
        this.setState({
          posts: this.state.posts.filter(x => x.id !== id)
        })
      })
  }

  componentDidMount() {
      axios.get('http://localhost:3000/posts')
        .then(res => {
          this.setState({
            posts: res.data,
            loading: false
          })
        })
    
  }

  bindInputToState = e => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    })
  }

  updatePost = e => {
    e.preventDefault();

    if (this.state.post.id) {
      axios.put('http://localhost:3000/posts/' + this.state.post.id,
        this.state.post)
        .then(res => {
          this.setState({
            posts: this.state.posts.map(x => {
              if (x.id === res.data.id) {
                return res.data;
              }

              return x;
            }),
            post: { title: '', body: '' }
          })
        })
    } else {
      axios.post('http://localhost:3000/posts', this.state.post)
        .then(res => {
          this.setState(prevState => ({
            posts: [...prevState.posts, res.data],
            post: { title: '', body: '' }
          }))
        })
    }
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.updatePost} className="formOn">
              <input id="title" value={this.state.post.title}
                onChange={this.bindInputToState}
                type="text" name="title" className="form-control" placeholder="Title" />
              <textarea id="body" value={this.state.post.body}
                onChange={this.bindInputToState}
                name="body" className="form-control" cols="30" rows="10"></textarea>
              <button type="submit" className="btn btn-success saveBtn btn-lg" onChange={this.bindInputToState}>Save</button>
            </form>
          </div>
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
        </div>
      </div>
    );
  }
}

export default Posts;
