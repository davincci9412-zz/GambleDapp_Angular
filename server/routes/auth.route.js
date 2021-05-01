const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const encrypt = require('crypto');

const router = express.Router();
module.exports = router;

//router.post('/register', asyncHandler(register), login);
//router.post('/login', passport.authenticate('local', { session: false }), login);
router.post('/register', register);
router.post('/login', login);
router.post('/forgot', forgot);
router.post('/setting', setting);
router.post('/metaUserProfile', metaUserProfile);
router.post('/userProfile', userProfile);
router.post('/metaUserNotification', metaUserNotification);

router.get('/me', passport.authenticate('jwt', { session: false }), login);

var UserSchema = require('../models/user.model.js') 
var shasum = encrypt.createHash('sha1');

/*

async function register(req, res, next) {
	
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
  
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
*/
function register(req, res) {
  
  UserSchema.findOne({email : req.body.email}).exec(function(err,user){
    if (user == null || user==undefined || user==""){
      var shasum = encrypt.createHash('sha1');
      shasum.update(req.body.password);
      var data = {
        "fullname"      : req.body.fullname,
        "email"         : req.body.email,
        "password"      : shasum.digest('hex') 
      }
      UserSchema.create(data, function(err, doc){
        if (err){
          res.json({err, err});
        } else {
          res.json({doc,doc}) ;
        }
      })
    } else {
      res.json({user,user}) ;
    }
  }); 
}


function login(req, res) {
/*  
  const result = await UserSchema.find({email : req.body.email, password:bcrypt.hashSync(req.body.password, 10)}, function (err, doc){
    if (err) {
      res.send(err);      
    } else {
      res.send(doc);
    }
  })
*/ 
  var shasum = encrypt.createHash('sha1');
  shasum.update(req.body.password);
  UserSchema.findOne({email : req.body.email, password:shasum.digest('hex') }).exec(function(err,user){
    if (err){
      res.json({err, err});
    } else {
      res.json({user,user}) ;
    }
  });

}

function forgot(req, res) {
  UserSchema.findOne({email : req.body.email}).exec(function(err,user){
    if (err){
        res.json({err, err});
    } else {
        res.json({user,user}) ;
    }
  });
}

function setting(req, res) {
  var shasum = encrypt.createHash('sha1');
  shasum.update(req.body.password);
  var data = {
    "password"      : shasum.digest('hex') 
  }

  var query = {'_id' : req.body._id}

  UserSchema.updateOne(query, data, function (err, doc){
    if (err) res.json({err, err});
  })

  UserSchema.findOne({ _id: req.body._id, }).exec(function (err, user) {
    if (err) {
      res.json({ err, err });
    } else {
      res.json({ user, user });
    }
  });
}

// 
function metaUserProfile(req, res) {
  
  UserSchema.findOne({email : req.body.email}).exec(function(err,user){
    if (user == null || user==undefined || user==""){
      var data = {
        "username"          : req.body.username,
        "bio"           : req.body.bio,
		"email"      : req.body.email,
        "address"      : req.body.address,
        "hash"          : req.body.hash,
        "signStatus"      : req.body.signStatus
	  }
      UserSchema.create(data, function(err, user){
        if (err){
          res.json({err, err});
        } else {
          res.json({user,user}) ;
        }
      })
    } else {
      var data = {
        "username"          : req.body.username,
        "bio"           : req.body.bio,
        "address"      : req.body.address,
        "hash"          : req.body.hash,
        "signStatus"      : req.body.signStatus
	  }
	  
	  var query = {'_id' : user._id}

	  UserSchema.updateOne(query, data, function (err, doc){
		if (err) {
			res.json({err, err});
		} else {
			UserSchema.findOne({'_id' : user._id}, function (err, user){
				if (err){
				  res.json({err, err});
				} else {
				  res.json({user,user}) ;
				  
				}
			})
		}
	  })	  
    }
  }); 
}

function userProfile(req, res) {
    if (req.body.address && req.body.email){
	  UserSchema.findOne({ address: req.body.address, email:req.body.email }).exec(function (err, user) {
		if (err) {
		  res.json({ err, err });
		} else {
		  res.json({ user, user });
		}
	  });
	} else if (req.body.email) {
	   UserSchema.findOne({ email:req.body.email }).exec(function (err, user) {
		if (err) {
		  res.json({ err, err });
		} else {
		  res.json({ user, user });
		}
	  });
	} else if (req.body.address){
	   UserSchema.findOne({ address: req.body.address }).exec(function (err, user) {
		if (err) {
		  res.json({ err, err });
		} else {
		  res.json({ user, user });
		}
	  });
	}
}

function metaUserNotification(req, res) {
  var data = {
        "item"          : req.body.item,
        "bid"           : req.body.bid,
		"price"      : req.body.price,
        "auction"      : req.body.auction,
        "outbid"          : req.body.outbid,
        "referral"      : req.body.referral,
		"asset"          : req.body.asset,
        "purchase"           : req.body.purchase,
		"newsletter"      : req.body.newsletter,
        "ethvalue"      : req.body.ethvalue,
		"exchange"      : req.body.exchange
	  }
  UserSchema.findOne({email : req.body.email}).exec(function(err,user){
    if (user == null || user==undefined || user==""){  
	  UserSchema.findOne({address : req.body.address}).exec(function(err,user){
		if (user == null || user==undefined || user==""){  

		} else {
			var query = {'address' : user.address}
			console.log(222+user.address)
			UserSchema.updateOne(query, data, function (err, doc){
			if (err) {
				res.json({err, err});
			} else {
				UserSchema.findOne({'_id' : user._id}, function (err, user){
					if (err){
					  res.json({err, err});
					} else {
					  res.json({user,user}) ;
					  
					}
				})
			}
		  })
		}
	  })
    } else {
		//
      var query = {'_id' : user._id}
	  console.log(111+user._id)
      UserSchema.updateOne(query, data, function (err, doc){
		if (err) {
			res.json({err, err});
		} else {
			UserSchema.findOne({'_id' : user._id}, function (err, user){
				if (err){
				  res.json({err, err});
				} else {
				  res.json({user,user}) ;
				  
				}
			})
		}
	  })
    }
  }); 
}