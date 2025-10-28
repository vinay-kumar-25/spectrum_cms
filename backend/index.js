    import express from "express";
    import cors from "cors";
  
    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    const router = express.Router();
  
import facultyRoutes from "./routes/faculty.js"; 
import adminRoutes from "./routes/admin.js"
app.use("",(req,res,next)=>{
  console.log("koi to req aayi hai ");
  next();
})

app.use("/faculty", facultyRoutes);
app.use("/admin",adminRoutes);



    let port = 4000
    app.listen(port,()=>{
        console.log("Server Running on the Port ",port); 
    })
  

