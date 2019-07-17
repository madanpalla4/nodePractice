const users = require('../controller/userController.js')
const jwt = require('jsonwebtoken');
const configSecret = require('../config/config.js')

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, configSecret.secrete, (err, re) => {
            if (err) {
                res.json({ "message": "un authorized", "status": false })
            }
            else {
                console.log(re.UserId);
                next();
            }
        })
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.json({ "Welcome": "Palla" })
    });

    app.post('/createUser', checkToken, users.create);

    app.post('/login', users.login)

app.post('/PersonalDetails',checkToken,users.personaldetails)


}