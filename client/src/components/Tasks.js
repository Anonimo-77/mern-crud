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

    render() {
        
        let tasks = []

        for (let i = 0; i<this.state.tasks.length;i++) {
            tasks.push(
                
                <li key={this.state.tasks[i]._id}>{this.state.tasks[i].name}</li>
                
            )
        }
        return (
            <ul>
                {tasks}
            </ul>
        )
    }

}