const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const PORT = 3000;
const passportMiddleware = require('./middlewares/passport');
const attachUser = require('./middlewares/attachUser')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('css', express.static('public/css', { 'extensions': ['css']}));

app.set('view engine', 'ejs');

// mongodb connetion
const uri = 'mongodb://127.0.0.1:27017/Kreate';
// const uri = process.env.MONGODB_URI;

mongoose.connect(uri);
const db = mongoose.connection;
// Event listeners for connection status
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async() => {
  console.log('Connected to MongoDB successfully!');
});

// Session configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and use session
app.use(passportMiddleware.initializePassport());
app.use(passportMiddleware.sessionPassport());

app.use(attachUser);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  // res.locals.user = req.user || null;
  next();
});

// ROUTES 
const homeRoute = require("./routes/homeRoute");
const signupRoute = require("./routes/signupRoute");
const provideJobDetailsRoute = require("./routes/provideJobDetailsRoute");
const findJobRoute = require("./routes/findJobRoute");
const jobApplicationRoute = require("./routes/jobApplicationRoute");
const jobInfoRoute = require("./routes/jobInfoRoute");
const loginRoute = require("./routes/loginRoute");
const newPasswordRoute = require("./routes/newPasswordRoute");
const resetPasswordRoute = require("./routes/resetPasswordRoute");
const formsRoute = require("./routes/formsRoute");
const jobsPostedRoute = require("./routes/jobsPostedRoute");
const editJobRoute = require("./routes/editJobRoute");
const logoutRoute = require("./routes/logoutRoute");
const viewJobsApplicationRoute = require("./routes/viewJobsApplicationRoute");
// const Route = require("./routes/Route");
const handleMulterErrors = require('./middlewares/handleMulterErrors');

// APP.USE 
app.use('/', homeRoute);
app.use("/signup", signupRoute);
app.use("/post-job", provideJobDetailsRoute);
app.use("/find-job", findJobRoute);
app.use("/job-application", jobApplicationRoute);
app.use("/job-info", jobInfoRoute);
app.use("/login", loginRoute);
app.use("/new-password", newPasswordRoute);
app.use("/reset-password", resetPasswordRoute);
app.use("/", formsRoute);
app.use("/", jobsPostedRoute);
app.use("/", editJobRoute);
app.use("/", viewJobsApplicationRoute);
app.use("/logout", logoutRoute);
// app.use("/", Route);
app.use(handleMulterErrors);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});