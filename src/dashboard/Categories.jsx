import React, { Component } from 'react';
import  axios  from "axios";


class Categories extends Component {
   state = {
    categories: [],
    loading: true,
    category: {
      userId: '',
      categoryName: '',
      Id: ''
    }
  }

  deletePost = (id) => {
    axios.delete('http://localhost:3000/categories/' + id)
      .then(res => {
        console.log(res);
        this.setState({
          categories: this.state.categories.filter(x => x.id !== id)
        })
      })
  }

  componentDidMount() {
    axios.get('http://localhost:3000/categories/')
      .then(res => {
        this.setState({
          categories: res.data,
          loading: false
        })
      })

  }

  bindInputToState = e => {
    this.setState({
      category: {
        ...this.state.category,
        [e.target.name]: e.target.value
      }
    })
  }

  updatePost = e => {
    e.preventDefault();

    if (this.state.category.id) {
      axios.put('http://localhost:3000/categories/' + this.state.category.id,
        this.state.category)
        .then(res => {
          this.setState({
            categories: this.state.categories.map(x => {
              if (x.id === res.data.id) {
                return res.data;
              }

              return x;
            }),
            category: { userId: '', categoryName: '' }
          })
        })
    } else {
      axios.post('http://localhost:3000/categories/', this.state.category)
      this.setState({
        category: {
          ...this.state.category,
          [e.target.name]: e.target.value
        }
      })
    }
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.updatePost} className="formOn">
              <input id="userId" value={this.state.category.userId}
                onChange={this.bindInputToState}
                type="text" name="userId" className="form-control" placeholder="Title" />
              <textarea id="categoryName" value={this.state.category.categoryName}
                onChange={this.bindInputToState}
                name="categoryName" className="form-control" cols="30" rows="10"></textarea>
              <button type="submit" className="btn btn-success saveBtn" onChange={this.bindInputToState}>Save</button>
            </form>
          </div>
          <div className="col-lg-12 table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>user Id</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.loading
                  ? <tr><td>LOADING</td></tr>
                  : this.state.categories.map((x, i) => (
                    <tr key={i}>
                      <td>{x.userId}</td>
                      <td>{x.categoryName}</td>
                      <td className="">
                        <div className="d-flex flex-wrap align-content-center">
                          <button onClick={() => this.setState({ category: x })} className="btn btn-warning editBtn">
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
