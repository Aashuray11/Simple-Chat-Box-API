const mongoose=require("mongoose");
const chat=require("./models/chat.js");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatapp")
}
main().then((res)=>{
    console.log("connection successfully")
})
.catch((err)=>{
    console.log("failed");
})

let allchats=[
    {
    from:"babita",
    to:"neha",
    msg:"neha please study and focus onn ypu goal",
    created_at:new Date(),
},

{
    from:"pooja",
    to:"neetu",
    msg:"where are you",
    created_at:new Date(),
},


{
    from:"pooja",
    to:"neetu",
    msg:"where are you",
    created_at:new Date(),
},

{
    from:"hari",
    to:"gocchi",
    msg:"trap the innocent people",
    created_at:new Date(),
},
];

chat.insertMany(allchats);





