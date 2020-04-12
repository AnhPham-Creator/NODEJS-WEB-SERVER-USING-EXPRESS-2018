const express = require('express');
const app = express();
const port = 3000;

const userRouter = require('./router/router');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', {
	name: 'Coder.tokyos'
}));

app.use('/users', userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));