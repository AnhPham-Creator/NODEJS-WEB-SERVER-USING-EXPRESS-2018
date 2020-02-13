const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views')

var users = [
	{name: 'tuan anh', age: 25},
	{name: 'chi toan' , age: 20},
	{name: 'le chi' , age: 24}
]

app.get('/', (req, res) => res.render('index', {
	name: 'Coder.tokyos'
}));

app.get('/users', (req, res) => res.render('users/index', {
	users: users,
	content: ''
}));

app.get('/users/search', (req, res) => {
			var q = req.query.key;
			var searchusers = users.filter(user => {
				return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
			});
			res.render('users/index',{
				users: searchusers,
				content: q
			});
		});

app.get('/users/create', (req, res) => 
	res.render('users/create')
	);

app.post('/users/create', (req, res) => {
	users.push(req.body);
	res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));