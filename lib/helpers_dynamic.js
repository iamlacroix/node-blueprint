module.exports = function(req, res) {

  res.locals({

    ////
    // Headers
    //
    headers: function() {
      return req.headers;
    }

  });

};
