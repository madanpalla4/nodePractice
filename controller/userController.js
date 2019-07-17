var usermodel = require('../Models/userModel.js')
var userdetails = require('../Models/userDetailsModel.js')

var passhash = require('password-hash')
var jwt = require('jsonwebtoken')
var config = require('../config/config.js')
const bearerToken = require('express-bearer-token');
const commonmethods = require('../Common/CommonMethod.js')

exports.create = (req, res) => {

    jwt.verify(req.token, config.secrete, (err, re) => {
        if (err) {
            res.json({ "message": "authentication Fail", "status": true })
        }
        else {
            const users = new usermodel({
                Name: req.body.Name,
                Email: req.body.Email,
                password: passhash.generate(req.body.password)
            });
            console.log(users);
            usermodel.findOne({ Email: req.body.Email }, (err, user) => {
                if (err) {
                    res.send(err);
                }
                if (!user) {
                    users.save().then(data => {
                        console.log(data);
                        res.send(data);
                    }).catch(er => {
                        console.log('some thisn happened');
                    })
                }
                else {
                    res.json({ "message": "user Already exists" })
                }
            })
        }

    });


}
exports.login = (req, res) => {
    console.log(req.body.Email);
    const users = new usermodel({
        Email: req.body.Email
    })
    usermodel.findOne({ Email: req.body.Email }, (err, user) => {
        if (err) {
        }
        console.log('lolll')
        console.log(user);

        if (user.Email === req.body.Email && passhash.verify(req.body.password, user.password)) {
            console.log('email and password verified');
            const payload = {
                admin: 'user',
                UserId: user._id
            }
            var token = jwt.sign(payload, config.secrete, { expiresIn: "1h" })

            console.log(token)

            res.send({ users, token });

        }
    })


}

exports.personaldetails = (req, res) => {
    jwt.verify(req.token, config.secrete, (err, op) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(op)
            usermodel.findOne({ _id: op.UserId }, (err, Udata) => {
                if (err) {
                    console.log(err)
                }
                else
                {
                    console.log(op);
                    const users=new userdetails({
                    FullName:req.body.fullName,
                    Userid:op.UserId,
                    DOB:req.body.dob,
                    Email:req.body.email,
                    Country:req.body.country,
                    State:req.body.state,
                    Phone:req.body.phone,
                    });
                    users.save().then(data => {
                                 res.send(data);
                    }).catch(er => {
                        console.log('some thisn happened');
                    })
                  
                }
            })
        }
    })
}