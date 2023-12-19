import express from 'express'
import dotenv from 'dotenv'
import { Server } from "socket.io";
import http from 'http'
import cors from "cors"
import productRoute from "./routes/product.js"
import adminRoute from "./routes/adminAuth.js"
import categoryRoute from "./routes/category.js"
import subcategoryRoute from "./routes/subcategory.js"
import deepcategoryRoute from "./routes/deepcategory.js"
import paymentRoute from "./routes/payment.js"
import userRoute from "./routes/user.js"
import shipRoute from "./routes/shipping.js"
import ordersubmittedRoute from "./routes/ordersubmitted.js"
import transactiionRoute from "./routes/transaction.js"
import webRoute from "./routes/webhook.js"
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import multer from 'multer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import fs from 'fs'






//middleware
const __dirname = dirname(fileURLToPath (import.meta.url));
const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()
app.use(fileUpload())


//creatingg sockect io
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"*",
    },
})

export { io }
//users login and out, and typing and real time texting///////////////////////////////////////////////////////////
let users = []
//function to check if userID && socket_id is already there
const addusers = (userid,socketid) => {
    !users.some((user)=> user.userid === userid) &&
    users.push({userid,socketid}) 
    
}
export const givemeusers = () => {
  return users
}
//function to remove users from users array
const remove = (socketId) => {
    users = users.filter((user) => user.socketid !== socketId)
}
//get users
export const getUser = (senderId) => {
    return users.find((user) => user.userid === senderId)
}


//socket connectiomn
io.on("connection", (socket)=>{
    io.on('error', console.error);
    console.log("User Connected.")
    // io.emit("welcome MF")
    //get userid and socket_id
    socket.on("addUser", (userId)=>{
        addusers(userId,socket.id)
        io.emit("getusers", users)

    })

    socket.on("addChart", (chart)=>{
        io.emit("getChart", chart)

    })

    //send and get message
    socket.on("sendMessage",({conversation_id,sender_id,message_text,receiverid,photo,type,sent_at})=>{
            const user = getUser(receiverid)
            // console.log(text)
            // console.log(senderId)
            // console.log(receiverid)
            console.log(user?.socketid)
            io.to(user?.socketid).emit("getMessage", {
                conversation_id,
                sender_id,
                message_text,
                photo,
                type,
                receiverid,
                sent_at
            })
    })
    //disconnected
    socket.on("disconnect", ()=>{
      io.on('error', console.error);
      console.log("a client has disconnected")
      remove(socket.id)
      io.emit("getusers", users)

   })
})
//users//

//allow chrome to bypass corscors
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//cors end here


//connect to mongoose
const connect =  async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to Mongo")
      } catch (error) {
        console.log(error);
      }
}
//this ends here


//rauting requests
app.use("/api/product", productRoute)
app.use("/api/admin", adminRoute)
app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/subcategory", subcategoryRoute)
app.use("/api/deepcategory", deepcategoryRoute)
app.use("/api/payment", paymentRoute)
app.use("/api/ordersubmitted", ordersubmittedRoute)
app.use("/api/transaction", transactiionRoute)
app.use("/api/webhook", webRoute)
app.use("/api/shipping", shipRoute)

//uploading photos for prodcucts
// Set up multer storage and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileSize = file.size;
    const originalname = file.originalname;

    const filename = `${fileSize}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Set up a simple route to handle file uploads
app.post('/upload', upload.single('zola'), (req, res) => {
  res.send('File uploaded successfully!');
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(import.meta.url, 'uploads')));



//uploaad using 
//get product pic
app.get('/api/photos/:name', (req, res) => {
    const imagePath = 'productphotos/'+req.params.name;
    const imageData = fs.readFileSync(imagePath);
  
    // res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageData);
  });
//upload image for product starts here
app.use("/uploadd", (req,res)=>{
    const filename = req.files?.zola.size + req.files?.zola.name
    const file = req.files?.zola
    // console.log(file)
    const uploadPath = __dirname+"/productphotos/"+filename
    file?.mv(uploadPath, (error)=>{
        if(error){
           return res.send(error)
        }
    })
    res.status(200).json("worked")
})
//upload image for product ends here

//connect to backend
const port = process.env.PORT || 8800;

server.listen(port, '0.0.0.0', () => {
    connect()
    console.log("Welcome... : [Kondwani P Chirwa]")
    console.log("Author.... : [Kondwani P Chirwa]")
    console.log("Connected : [server]")
})


