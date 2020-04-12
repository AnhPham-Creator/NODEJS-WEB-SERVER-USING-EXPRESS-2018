var express = require('express');
var db = require('../db');

var router = express.Router();

db.defaults({ users: [] })
  .write();

router.get('/', (req, res) => res.render('users/index', {
	users: db.get('users').value(),
	content: ''
}));

router.get('/search', (req, res) => {
			var q = req.query.key;
			var searchusers = db.get('users').filter(user => {
				return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
			}).value();
			res.render('users/index',{
				users: searchusers,
				content: q
			});
		});

router.get('/create', (req, res) => {
	let users = db.get('users').value();
	let id = Number(users[users.length - 1].id) + 1
	res.render('users/create', {
		id: id
	})
	});

router.post('/create', (req, res) => {
	db.get('users').push(req.body).write();
	res.redirect('/users');
});

router.get('/:id', (req, res) => {
	let id = req.params.id;
	let user = db.get('users').find({ id: id}).value();
	res.render('users/view', {
		user: user
	});
});

module.exports = router;