const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const names = [];
const tasks = [];

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.render('index', { names, tasks, error: null });
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
        res.render('index', { names, tasks, error: null });
    } else {
        res.render('index', { names, tasks, error: "Please enter a name" });
    }
});

app.get('/greet/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (id >= 0 && id < names.length) {
        res.render('wazzup', { name: names[id] });
    } else {
        next(new Error("Invalid name index"));
    }
});

app.use((err, req, res, next) => {
    res.status(400).render('index', { names, tasks, error: err.message });
});

app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) tasks.push(task);
    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json({ tasks });
});

app.get('/task/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id >= 0 && id < tasks.length) {
        tasks.splice(id, 1);
    }
    res.redirect('/');
});

app.get('/task/up/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id > 0) {
        [tasks[id - 1], tasks[id]] = [tasks[id], tasks[id - 1]];
    }
    res.redirect('/');
});

app.get('/task/down/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id < tasks.length - 1) {
        [tasks[id + 1], tasks[id]] = [tasks[id], tasks[id + 1]];
    }
    res.redirect('/');
});

app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    names.push(name);
    res.json({ names });
});


