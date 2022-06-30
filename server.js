const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

//database

const db = require('./database');
const studentUsersDB = require("./database/models/studentUsersDB.js");

db.start();



app.get("/", function (req, res) {
    res.render("homepage");
})


app.get("/login", function (req, res) {
    res.render("login",{msg:''});
})
app.post("/login", function (req, res) {
    const email = req.body.email;
    const pwd = req.body.pwd;
    console.log(req.body);
    console.log(req.body.pwd);
    studentUsersDB.findOne({
        userEmail: email,
        userPwd: pwd
    }).then(function (user) {
        if(user){
            console.log(user);
            res.send("Hello user");
            res.end();

        }
        else{
            console.log(user);
            res.render("login",{msg:'User not Found'})
        }
    })

})




app.get("/optionRegistration", function (req, res) {
    res.render('optionRegistration');
})

app.get("/teacherRegister", function (req, res) {
    res.render("teacherRegister");
})

app.get("/studentRegister", function (req, res) {
    res.render("studentRegister");
})

app.post("/studentRegister", function (req, res) {
    console.log(req.body);
    var name = req.body.firstName + " " + req.body.lastName;

    const universityRollNo = req.body.universityRollNo;
    const enrolmentNo = req.body.enrolmentNo;
    const collegeName = req.body.collegeName;
    const pic = req.body.pic;
    const contactNo = req.body.contactNo;
    const emailId = req.body.emailId;
    const pwd = req.body.pwd;

    studentUsersDB.find({
        userEmail: emailId
    }).then(function (user) {
        if (user.length > 0)
            res.render("studentRegister", {
                // err: "alredy registered"
            })

        else {


            studentUsersDB.create({

                userName: name,
                userEmail: emailId,
                userPwd: pwd,
                // userpic: pic,
                userVerified: false,
                userType: 0,
                userUniversityRollNo: universityRollNo,
                userEnrolmentNo: enrolmentNo,
                userCollegeName: collegeName,
                userContactNo: contactNo,




            }).then(function (user) {
                console.log("sucessful");
                res.render("login");
            })
        }

    });
});

app.get("/adminLogin", function (req, res) {
    res.render("adminLogin");
})


app.listen(3000, function () {
    console.log('server is started at: 3000');
});