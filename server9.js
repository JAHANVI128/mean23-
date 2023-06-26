const express = require("express")
const app = express()
const productRoute = require("./routes/product.routes")
const mongoose = require("mongoose")
const categoryController = require("./controller/categoryController")
const categoryControllerDb = require("./controller/categoryControllerDb")

//middle 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//product

app.use("/admin",productRoute)

//category routes

app.post("/addcategory",categoryController.addCategory)
app.post("/getallcategory",categoryControllerDb.getAllCategory)

//http://localhost:9999/admin/

//login 


//db

mongoose.connect("mongodb://localhost:27017/mean23").then(() => {
    console.log("Dbconnected....")
})

app.listen(9999)