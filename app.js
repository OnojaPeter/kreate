const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use('css', express.static('public/css', { 'extensions': ['css']}));

app.set('view engine', 'ejs');

// mongodb connetion
const Job = require('./models/jobs'); //using this to add the dummy work info
const uri = 'mongodb://127.0.0.1:27017/Kreate';
// const uri = process.env.MONGODB_URI;

mongoose.connect(uri);
const db = mongoose.connection;
// Event listeners for connection status
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async() => {
    // if (await Job.countDocuments().exec() > 0) return

    // Promise.all([
    //     Job.create({name:'developer', location: 'remote'}),
    //     Job.create({name:'developer', location: 'remote'}),
    //     Job.create({name:'designer', location: 'world'}),
    //     Job.create({name:'developer', location: 'world'}),
    //     Job.create({name:'frontend', location: 'remote'}),
    //     Job.create({name:'backend', location: 'remote'}),
    // ]).then(() => console.log('added jobs'))
  console.log('Connected to MongoDB successfully!');
});



// ROUTES 
const homeRoute = require("./routes/homeRoute");
const chooseSignupRoute = require("./routes/chooseSignupRoute");
const clientSignupRoute = require("./routes/clientSignupRoute");
const talentSignupRoute = require("./routes/talentSignupRoute");
const provideJobDetailsRoute = require("./routes/provideJobDetailsRoute");
const findJobRoute = require("./routes/findJobRoute");
const jobApplicationRoute = require("./routes/jobApplicationRoute");
const jobInfoRoute = require("./routes/jobInfoRoute");
const loginRoute = require("./routes/loginRoute");
const newPasswordRoute = require("./routes/newPasswordRoute");
const resetPasswordRoute = require("./routes/resetPasswordRoute");
const formsRoute = require("./routes/formsRoute");
// const Route = require("./routes/Route");
const handleMulterErrors = require('./middlewares/handleMulterErrors');

// APP.USE 
app.use('/', homeRoute);
app.use("/signup", chooseSignupRoute);
app.use("/signup/client", clientSignupRoute);
app.use("/signup/talent", talentSignupRoute);
app.use("/post-job", provideJobDetailsRoute);
app.use("/find-job", findJobRoute);
app.use("/job-application", jobApplicationRoute);
app.use("/job-info", jobInfoRoute);
app.use("/login", loginRoute);
app.use("/new-password", newPasswordRoute);
app.use("/reset-password", resetPasswordRoute);
app.use("/", formsRoute);
// app.use("/", Route);
app.use(handleMulterErrors);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});