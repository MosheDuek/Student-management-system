const express = require("express");
const fs = require('fs')
const { getAllStudents, addStud, deleteStudent, updateStudent, getStudent, getStudentsScores, getSubject, insertScores, avgS, getStudentDeatails, avgSubject } = require("../models/studentdb");

const mainRouter = express.Router();

mainRouter.get('/',(req,res)=>{
    getAllStudents().then(db=>{
        res.render('table',{db})
    }).catch(err=>res.send(err))
})

mainRouter.get('/add',(req,res)=>{
    res.render('add-stud')
})

mainRouter.post('/add',(req,res)=>{
    let name = req.body.name;
    let last = req.body.last;
    let mail = req.body.mail;
    addStud(name,last,mail).then(()=>{res.redirect('/')}).catch(err=>res.send(err))
})

mainRouter.get('/delete/:id',(req,res)=>{
    deleteStudent(req.params.id).then(()=>res.redirect('/')).catch(err=>res.send(err))
})

mainRouter.get('/update/:id',(req,res)=>{
    const id = req.params.id
    res.render('update-stud',{id})
})

mainRouter.post('/update/:id',(req,res)=>{
    let name = req.body.name;
    let last = req.body.last;
    let mail = req.body.mail;
    let id = req.params.id
    updateStudent(id,name,last,mail).then(()=>res.redirect('/')).catch(err=>res.send(err))
})

mainRouter.get('/student/:id',(req,res)=>{
let id = req.params.id
getStudent(id)
.then(db=>{
    let name = db[0].full_name
res.render('student', {name, id:id, db})
})
.catch(()=>{
    getStudentDeatails(id)
    .then(db=>{
        console.log(db)
        let name = db[0].full_name
        res.render('student', {
            name,
            id: id,
            db
        })
    })
    
})
})

mainRouter.get('/students/scores',(req,res)=>{
    getStudentsScores().then(db=>{
        res.render('allStudentScore',{db})
    }).catch(err=>{res.send(err)})
})

mainRouter.get('/student/add-score/:id',(req,res)=>{
    let id = req.params.id;
    let name = req.params.name;
    getSubject().then(db=>{
        res.render('add-score', {id: id, name: name, db})
    }).catch(err=>{res.send(err)})


})

mainRouter.post('/student/add-score/:id',(req,res)=>{
    let id = req.params.id;
    let sub = req.body.subject;
    let score = req.body.score;
    insertScores(id,sub,score).then(()=>res.redirect(`/student/${id}`)).catch(err=>{res.send(err)})
})

mainRouter.get('/student/avg/:id',(req,res)=>{
    let id = req.params.id;
    avgS(id)
    .then((db)=>{
        let name = db[0].full_name;
        let avgg = db[0].avg;
        let avgNum = Number(avgg)
        let avg = avgNum.toFixed(1)  
        res.render('avgS',{name,avg,id})})
    .catch(()=>res.redirect(`/student/${id}`))
})

mainRouter.get('/subject/avg/:id',(req,res)=>{
    let id = req.params.id
    avgSubject(id)
    .then(db=>res.json(db))
    .catch(err=>res.status(400).json(err))
})

mainRouter.get('/subject/avg',(req,res)=>{
 getSubject().then(db => {
     res.render('avgScore', { db })
 }).catch(err => {
     res.send(err)
 })
})

mainRouter.get('/style.css',(req,res)=>{
return fs.createReadStream(__dirname + '/../public/style/style.css').pipe(res)
})



module.exports = mainRouter