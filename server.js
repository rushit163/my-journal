const express = require('express')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))
var data = []
app.get('/',(req,res)=>{
    res.render("index",{array : data})
})
app.post('/create',(req,res)=>{
    const {topic,date,message} = req.body;
    const reqData = {
        id : uuidv4(),
        topic : topic,
        date : date,
        message : message
    }
    data.push(reqData);
    res.redirect('/')
    console.log(data)
})
app.get('/create',(req,res)=>{
    res.render("post",{array : data})
})


app.get('/update/:id',(req,res)=>{
    const {id} = req.params;
    const updatePost = data.find((item)=>{
        return item.id === id;
    })
    res.render('update',{editpost:updatePost})
})

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    const {topic,date,message} = req.body;
    var updatedPost = data.find((item)=>{
        return item.id === id;
    })
    data = data.filter((item)=>{
        return item.id !== id;
    })
    updatedPost = {id : uuidv4(),topic : topic,date: date,message : message}
    data.push(updatedPost)
    res.redirect('/')
})


app.listen('3000',()=>{
    console.log("hello");
})