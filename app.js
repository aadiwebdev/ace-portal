const express =require('express');
const app =express();
const path =require('path');
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public'),{extended:false}));
app.use('/',(req,res,next)=>{
    res.render('index');
})
app.listen(process.env.PORT||3000,()=>{
   // console.log("HI welcome to express Js\n");
});
