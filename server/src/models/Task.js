const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    name: String,
    description: String,
    done: {
        type: Boolean,
        default: false
    }
});

let Task = model('Task', taskSchema, 'tasks');
module.exports = Task;