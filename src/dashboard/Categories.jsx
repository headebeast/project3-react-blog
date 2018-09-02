import React, { Component } from 'react';
import  axios  from "axios";


class Categories extends Component {
   state = {
    comments: [],
    loading: true,
    categories: {
      userId: '',
      body: '',
    }
  }

  deletePost = (id) => {
    axios.delete('http://localhost:3000/categories/' + id)
      .then(res => {
        console.log(res);
        this.setState({
          comments: this.state.comments.filter(x => x.id !== id)
        })
      })
  }

  componentDidMount() {
    axios.get('http://localhost:3000/categories/')
      .then(res => {
        this.setState({
          comments: res.data,
          loading: false
        })
      })

  }

  bindInputToState = e => {
    this.setState({
      comment: {
        ...this.state.comment,
        [e.target.name]: e.target.value
      }
    })
  }

  updatePost = e => {
    e.preventDefault();

    if (this.state.comment.id) {
      axios.put('http://localhost:3000/categories/' + this.state.comment.id,
        this.state.comment)
        .then(res => {
          this.setState({
            comments: this.state.comments.map(x => {
              if (x.id === res.data.id) {
                return res.data;
              }

              return x;
            }),
            comment: { userId: '', body: '' }
          })
        })
    } else {
      axios.post('http://localhost:3000/categories/', this.state.comment)
        .then(res => {
          console.log(res)
        })
    }
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.updatePost} className="formOn">
              <input id="title" value={this.state.comment.userId}
                onChange={this.bindInputToState}
                type="text" name="title" className="form-control" placeholder="Title" />
              <textarea id="body" value={this.state.comment.body}
                onChange={this.bindInputToState}
                name="body" className="form-control" cols="30" rows="10"></textarea>
              <button type="submit" className="btn btn-success saveBtn" onChange={this.bindInputToState}>Save</button>
            </form>
          </div>
          <div className="col-lg-12 table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>body</th>
                  <th>Post Id</th>
                  <th>user Id</th>
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
                      <td>{x.postId}</td>
                      <td>{x.userId}</td>
                      <td className="">
                        <div className="d-flex flex-wrap align-content-center">
                          <button onClick={() => this.setState({ comment: x })} className="btn btn-warning editBtn">
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

export default Categories;
