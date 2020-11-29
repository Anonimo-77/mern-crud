import React, { Component } from 'react';
import axios from 'axios'


export default class Tasks extends Component {

    constructor(props) {
        super(props);
    }


    

    state = {
        name: '',
        description: '',
        tasks: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/tasks').then((res) => {
            this.setState({
                tasks: res.data
            })
        })
        
    }

    handleInputChange(event) {
        console.log(event.target.name);
        if (event.target.name === "name") {
            this.setState({name: event.target.value});
        } else if (event.target.name === "description") {
            this.setState({description: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let task = {
            name: this.state.name,
            description: this.state.description
        };
        axios.post('http://localhost:5000/api/tasks', task).then((res) => {
            let data = res.data;
            this.setState({ tasks: data });
            this.setState({ name: '',description: '' })
        }).catch(err => console.error(err));
    }

    handleDeleteClick(event, id) {
        axios.delete(`http://localhost:5000/api/tasks/${id}`).then((res) => {
            let data = res.data;
            this.setState({ tasks: data });
            this.setState({ name: '',description: '' })
        }).catch(err => console.error(err));
    }

    handleUpdate(event, id) {
        axios.put(`http://localhost:5000/api/tasks/${id}`, {}).then((res) => {
            let data = res.data;
            this.setState({ tasks: data });
            this.setState({ name: '',description: '' })
        }).catch(err => console.error(err));
    }

    render() {
        
        let tasks = []

        for (let i = 0; i<this.state.tasks.length;i++) {
            tasks.push(
                
                <tr key={this.state.tasks[i]._id}>
                    <td>{i}</td>
                    <td>{this.state.tasks[i].name}</td>
                    <td>{this.state.tasks[i].description}</td>
                    <td><input className="form-check-input" type="checkbox" name="checkbox" checked={this.state.tasks[i].done} onChange={(event) => this.handleUpdate(event, this.state.tasks[i]._id)} /></td>
                    <td><button className="btn-danger text-white" onClick={(event) => this.handleDeleteClick(event, this.state.tasks[i]._id)}><i className="far fa-trash-alt"></i></button></td>

                </tr>
                
            )
        }
        return (
            <div>
                <table className="table" style={{ width: "70%" }}>
                <thead>

                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Done</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks}
                </tbody>
            </table>
            <br/>
            <br/>
            <div className="card" style={{width: "70%"}}>
                <form className="card-body" onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={(event) => this.handleInputChange(event)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" value={this.state.description} onChange={(event) => this.handleInputChange(event)} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
            </div>
        )
    }

}