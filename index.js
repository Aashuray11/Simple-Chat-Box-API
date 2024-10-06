const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const chat=require("./models/chat.js")

app.set("views",path.join(__dirname,"views"));
app.set("views engine","ejs");

app.use(express.static(path.join(__dirname,"public")))

//post
app.use(express.urlencoded({extended:true}));


const methodOverride = require('method-override')
app.use(methodOverride('_method'));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatapp")
}
main().then((res)=>{
    console.log("connection successfully")
})
.catch((err)=>{
    console.log("failed");
})



/*
const chat1=new chat({
    from:"Aashu",
    to:"sweta",
    msg:"send your USN and Dataofbrith",
    created_at:new Date(),
});
chat1.save().then((res)=>{
    console.log(res);
})
    */



/*chat indexs */
app.get("/chats", async(req,res)=>{
  let chats=await chat.find();
    res.render("index.ejs",{chats})
})

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

//post
app.post("/chats",(req,res)=>{
   let {from,to,msg}=req.body;
   let newchat=new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
   })
   
   newchat.save().then((res)=>{
    console.log("sucessfully save one data")
   })
   res.redirect("/chats")
})

app.delete("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let deletes=await chat.deleteOne({_id:id})
    res.redirect("/chats")
})
/*edit the form */
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
  let chats= await chat.findById(id);
  console.log(chats)
res.render("edit.ejs",{chats})
})

/*patch method */
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedmsg=await chat.findByIdAndUpdate(
        id,
        {msg:newmsg},
    {runValidators:true,new:true}
)
console.log(updatedmsg);
res.redirect("/chats");
})


app.listen(3000,()=>{
    console.log("app is listening")
})