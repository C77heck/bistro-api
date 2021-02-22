const fs = require('fs');
const path = require('path');
require('dotenv').config();


const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//ROUTES
const menuRoutes = require('./routes/menu-routes');
const inputRoutes = require('./routes/input-routes');
const adminRoutes = require('./routes/admin-routes');

//MIDDLEWARE
const app = express();
app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//app.use(express.static(path.join('public')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE')
    next()
})
mongoose.set('useCreateIndex', true);


// API ENDPOINTS

app.use('/api/menu', menuRoutes);
app.use('/api/resources', inputRoutes);
app.use('/api/admin', adminRoutes);

// HANDLING THE REACT ROUTING BY ALWAYS SENDING BACK THE index.html on different routes
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})


// DELETING UPLOADED IMAGES FROM THE FILESYSTEM
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});


//MONGOOSE INITATION AND SERVER LAUNCH ASYNCRONOUSLY 
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ch77ecked.eih2z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT || 2000, () => console.log('Server is running'));
    })
    .catch(err => {
        console.log(err)
    })

