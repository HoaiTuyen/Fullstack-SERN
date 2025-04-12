import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import viewEngine from "./config/viewEngine";
import initWebRouters from "./router/web";
import connectDB from "./config/connectDB";
import cors from "cors";
const app = express();
//congif app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const allowedOrigins = ["http://localhost:3000", "http://localhost:3003"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Trả về origin được phép
      } else {
        callback(new Error("CORS policy does not allow this origin!"));
      }
    },
    credentials: true, // Cho phép gửi cookies hoặc token
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
viewEngine(app);
initWebRouters(app);
connectDB();
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port : " + port);
});
