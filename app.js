const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const port = process.env.PORT || 3000;
const app = express();


const indexRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
    secret: 'This is secratre KEY',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


app.use('/', indexRoutes);

app.listen(port, () => {
    console.log('Connection Established At PORT:', port);
    console.log('Open your favourite browser and visit http://localhost:3000 and have fun!!!');
});
