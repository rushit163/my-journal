const express = require('express')
const path = require('path');
const app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))

const data = []
const name = data.map(item=>{
    return item.name
})
app.get('/',(req,res)=>{
    res.render("index",{array : data})
})
app.get('/create',(req,res)=>{
    res.render("post",{array : data})
})

app.listen('3000',()=>{
    console.log("hello");
})