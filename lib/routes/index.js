
/*
 * GET home page.
 */

exports.index = function(req, res){
  // console.log(req.headers);
  res.render('index', { title: 'Home', req: req });
};
