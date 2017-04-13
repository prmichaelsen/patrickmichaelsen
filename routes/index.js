var marked = require('marked');


exports.index = function(req, res){
  res.render('index', { title: 'patrickmichaelsen' })
};

exports.blog = (req,res)=>{
	db.collection('blogPostList').find().toArray((err,result)=>{
		if(err){return console.log(err);}
		res.render('blog', { title: 'Blog', blogPostList: result}); 
	});
};

exports.actorJournal = (req,res)=>{
	db.collection('blogPostList').find({focus: "actor",type: "journal"}).toArray((err,result)=>{
		if(err){return console.log(err);}
		res.render('blog', { title: 'Actor Journal', blogPostList: result}); 
	});
};

exports.blogPost = (req,res)=>{
	db.collection('blogPostList').findOne({url: req.params.blogPost},(err,result)=>{
		if(err){return console.log(err);}
		res.render('blogPost', { title: result.title, blogPost: result, body: marked(result.body)}); 
	});
};

exports.developer = (req,res)=>{
	res.render('developer', {title:'developer', focus:'developer'} );
};

exports.actor = (req,res)=>{
	res.render('actor', {title:'actor', focus:'actor'} );
};

exports.musician = (req,res)=>{
	res.render('musician', {title:'musician', focus:'musician'} );
};

exports.portfolio = (req,res)=>{
		res.render(req.params.focus+'.portfolio.ejs', {title: req.params.focus, focus: req.params.focus});
};

exports.focusBlog = (req,res)=>{
	db.collection('blogPostList').find({focus: req.params.focus}).toArray((err,result)=>{
		if(err){return console.log(err);}
		res.render('blog', {title: req.params.focus, focus: req.params.focus, blogPostList: result});
	});
};

exports.redirectHome = (req,res)=>{
	res.redirect('/');
}
