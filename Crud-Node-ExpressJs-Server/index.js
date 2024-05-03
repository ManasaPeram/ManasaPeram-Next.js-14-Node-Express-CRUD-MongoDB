// const express = require('express');
// const mongoose = require('mongoose');
// const UserMOdel = require('./User')

// const app = express();
// app.use(express.json());

// async function main() {
//     await mongoose.connect("mongodb+srv://Nextjs14-crud:Manasa1980@cluster0.f3o0wxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {});
//     console.log('Connected to database');
// }

// main().catch(err => console.error('Error connecting to database:', err.message));

// app.get('/hello', (req, res) => {
//     res.send('Hello World');
// });

 
// app.get('/', (req, res) => {
//     UserMOdel.find()
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })
  
  
// app.get('/get/:id', (req, res) => {
//     const id = req.params.id
//     UserMOdel.findById({_id: id})
//     .then(post => res.json(post))
//     .catch(err => console.log(err))
// })
  
// app.post('/create', (req, res) => {
//     UserMOdel.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => res.json(err))
// })
  
// app.put('/update/:id', (req, res) => {
//     const id = req.params.id;
//     UserMOdel.findByIdAndUpdate({_id: id}, {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     }).then(user => res.json(user))
//     .catch(err => res.json(err))
// })
  
// app.delete('/deleteuser/:id', (req, res) => {
//     const id = req.params.id;
//     UserMOdel.findByIdAndDelete({_id: id})
//     .then(response => res.json(response))
//     .catch(err => res.json(err))
// })

// const PORT = 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./User');

const app = express();

app.use(cors());
app.use(express.json());

async function main() {
    try {
        await mongoose.connect("mongodb+srv://Nextjs14-crud:Manasa1980@cluster0.f3o0wxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {});
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    }
}

main();

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

app.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Internal Server Error
    }
});

app.post('/create', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
});

app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });
        res.json(user);
    } catch (err) {
        res.json(err);
    }
});

app.delete('/deleteuser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await UserModel.findByIdAndDelete(id);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
