var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var blogs = [{'id':0,'comment':'ยอดเยี่ยม'},
			{'id':1,'comment':'ดี'}];
	
var index =2;

app.use(express.static('public_html')) 

router.route('/blogs')
	.get(function(req,res){
		res.json(blogs);
	})

	.post(function(req, res) {
		var blog = {};
		blog.id = index++;
		blog.name = req.body.name;
		blog.comment = req.body.comment;
		blogs.push(blog);
		res.json(blogs);
	})

router.route('/blogs/:blog_id')
	.get(function(req,res){
		res.json(blogs[req.params.blog_id]);
	})

	.put(function(req, res) {
		var id = req.params.blog_id
		blogs[id].name = req.body.name;
		blogs[id].comment= req.body.comment;
		res.json(blogs[req.params.blog_id]);
	})

	.delete(function(req,res){
		var id = req.params.blog_id
		delete blogs[id];	
	})

	.put(function(req,res){
		var id = req.params.blog_id
		blogs[id].name = req.body.name
		blogs[id].comment = req.body.comment
		// res.json(blogs[id])
		res.json({message: 'blog updated'})
	})

	.delete(function(req,res){
		var id = req.params.blog_id
		delete blogs[id]
		// res.json(blogs)
		res.json({message: 'blog deleted'})
	})

// all of our routes will be prefixed with /api
app.use('/api',bodyParser.json(),router);

app.listen(50046);
console.log('web sarver is running...');