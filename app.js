const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter");
const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.engine('handlebars',engine());
app.set('view engine', 'handlebars')
app.use(mainRouter)



const PORT = 3000;

app.listen(PORT, console.log(`http://localhost:${PORT}`))