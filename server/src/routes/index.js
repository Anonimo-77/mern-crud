const { Router } = require('express');
const router = Router();

const Task = require('../models/Task');

router.route('/tasks')
    .get(async (req,res) => {
        res.json(await Task.find())
    })
    .post(async (req,res) => {
        let newTask = new Task(req.body);
        await newTask.save();
        res.json(await Task.find());
});
router.route('/tasks/:id')
    .delete(async (req,res) => {
        await Task.deleteOne({ _id: req.params.id });
        res.json(await Task.find());
    })
    .put(async (req,res) => {
        let task = await Task.findOne({ _id: req.params.id });
        await Task.updateOne({ _id: req.params.id }, { done: !task.done });
        res.json(await Task.find());
})

module.exports = router;
