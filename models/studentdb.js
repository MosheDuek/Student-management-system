const {
    promise
} = require("./db");
const connection = require("./db");

const getAllStudents = () => {
    return new Promise((res, rej) => {
        connection.query(`select * from college_students order by id`, (err, db) => {
            if (err) {
                return rej(err)
            }
            res(db)
        })
    })
}

const addStud = (fName, lName, email) => {
    return new Promise((res, rej) => {
        const sql = `insert into college_students(first_name,last_name,email)values(?,?,?)`
        connection.query(sql, [fName, lName, email], (err, db) => {
            if (err) {
                return rej(err)
            }
            res('added todo')
        })
    })

}

const deleteStudentScore = (id) => {
    return new Promise((res, rej) => {
        const sql = `delete from students_scores where id_student = ?`
        connection.query(sql, [id], (err, db) => {
            if (err) {
                return rej(err)
            }
            res('delete successfully')
        })
    })
}

const deleteStudent = (id) => {
    return new Promise((res, rej) => {
        const sql = `delete from college_students where id = ?`
        connection.query(sql, [id], (err, db) => {
            if (err) {
                return rej(err)
            }
            res(deleteStudentScore(id))
        })
    })
}



const updateStudent = (id, name, last, mail) => {
    return new Promise((res, rej) => {
        const sql = `update college_students set first_name = ? , last_name = ? , email = ? where id = ?`
        connection.query(sql, [name, last, mail, id], (err, db) => {
            if (err) {
                return rej(err)
            }
            res('update success')
        })
    })
}

const getStudent = (id) => {
    return new Promise((res, rej) => {
        const sql = `SELECT concat(college_students.first_name, " " , college_students.last_name) as full_name, subjects.subject_name as 'subject',students_scores.id_student as id, students_scores.score FROM students_scores
INNER JOIN subjects on students_scores.id_subject = subjects.id
INNER JOIN college_students on students_scores.id_student = college_students.id
where students_scores.id_student = ? order by id_subject asc `

        connection.query(sql, [id], (err, db) => {
            if (err) {
                return rej(err)
            }

            res(db)
        })
    })
}

const getStudentDeatails = (id) => {
    return new Promise((res, rej) => {
        const sql = `SELECT id, concat(first_name, " " ,last_name)as full_name FROM students.college_students where id = ?`
        connection.query(sql, [id], (err, db) => {
            if (err) {
                return rej(err)
            }
            res(db)
        })
    })
}


const getStudentsScores = () => {
    return new Promise((res, rej) => {
        const sql = `SELECT concat(college_students.first_name, " " , college_students.last_name) as full_name, subjects.subject_name as 'subject', students_scores.score FROM students_scores
INNER JOIN subjects on students_scores.id_subject = subjects.id
INNER JOIN college_students on students_scores.id_student = college_students.id
order by id_student asc `

        connection.query(sql, (err, db) => {
            if (err) {
                return rej(err)
            }

            res(db)
        })
    })
}
const getSubject = () => {
    return new Promise((res, rej) => {
        const sql = `select * from students.subjects order by subject_name`
        connection.query(sql, (err, db) => {
            if (err) {
                return rej(err)
            }
            res(db)
        })
    })
}

const insertScores = (id, sub, score) => {
    return new Promise((res, rej) => {
        const sql = `insert into students_scores (id_student, id_subject, score ) values (? , ? , ?)`
        connection.query(sql, [id, sub, score], (err, db) => {
            if (err) {
                return rej(err)
            }
            res('success')
        })
    })
}

const avgS = (id) => {
    return new Promise((res, rej) => {
        const sql = `SELECT concat(college_students.first_name, " " , college_students.last_name) as full_name, avg(score) as 'avg' FROM students_scores
INNER JOIN subjects on students_scores.id_subject = subjects.id
INNER JOIN college_students on students_scores.id_student = college_students.id
where students_scores.id_student = ?`
        connection.query(sql, [id], (err, db) => {
            if (err) {
                return rej(err)
            }
            res(db)
        })
    })
}

const avgSubject = (id) => {
    return new Promise((res, rej) => {
        const sql = `SELECT subjects.subject_name, avg(score) as avg FROM students.students_scores
        inner join subjects on students_scores.id_subject = subjects.id
        where id_subject = ?`

        connection.query(sql,[id],(err,db)=>{
            if(err){
                return rej(err)
            }
            res(db)
        })

    })
}


module.exports = {
    getAllStudents,
    addStud,
    deleteStudent,
    updateStudent,
    getStudent,
    getStudentsScores,
    getSubject,
    insertScores,
    avgS,
    getStudentDeatails,
    avgSubject
}