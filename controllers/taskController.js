const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch tasks' });
    }
};

exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    console.log(req.body);
    console.log(req.user.id);
    try {
        const task = new Task({ 
            title, 
            description, 
            status, 
            user: req.user.id 
        });
        console.log(task);
        await task.save();
        
        res.status(201).json({ 
            message: 'Task created successfully',
            success: true
        });
    } catch (err) {
        res.status(400).json({ 
            error: 'Task creation failed',
            message: err.message
        });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const task = await Task.findOneAndUpdate({
             _id: id, 
             user: req.user.id 
            }, 
            { 
                title, 
                description, 
                status }, 
                { new: true }
            );
        res.status(200).json({
            success:true,
            task
        });
    } catch (err) {
        res.status(400).json({ error: 'Task update failed' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findOneAndDelete({ _id: id, user: req.user.id });
    
        res.json({ 
            success : true,
            message: 'Task deleted successfully'
         });
    } catch (err) {
        res.status(400).json({ error: 'Task deletion failed' });
    }
};
