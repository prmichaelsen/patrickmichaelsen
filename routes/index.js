var marked = require('marked');


exports.index = function(req, res){
  res.render('index', { title: 'Patrick Michaelsen.com' })
};

exports.blog = (req,res)=>{
	db.collection('blogPostList').find().toArray((err,result)=>{
		if(err){return console.log(err);}
		res.render('blog', { title: 'Blog', blogPostList: result}); 
	});
};

exports.blogPost = (req,res)=>{
	db.collection('blogPostList').findOne({url: req.params.blogPost},(err,result)=>{
		if(err){return console.log(err);}
		res.render('blogPost', { title: result.title, blogPost: result, body: marked(result.body)}); 
	});
};

exports.redirectHome = (req,res)=>{
	res.redirect('/');
}