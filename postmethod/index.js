const express=require('express')
const app=express()
app.use(express.json())

const{open}=require('sqlite')
const sqlite3=require('sqlite3')

const path=require('path')
const dbpath=path.join(__dirname,"data.db")

let db=null 

const initializeDbAndSever=async()=>{
    try{
         db=await open({
            filename:dbpath,
            driver:sqlite3.Database
        })
        app.listen(3000,()=>{
            console.log('server running at http://localhost:3000')

        })
    }
    catch(e){
        console.log(`DB Error: ${e.message}`)
    }
}

initializeDbAndSever()

app.post("/",async(request,response)=>{
    const {empid,empname,salary}=request.body
    const getQuery=`
    INSERT INTO emp(empid,empname,salary) VALUES(
        ${empid},'${empname}',${salary}
    )
    `
    const queryResponse=await db.run(getQuery)
    response.send("employee added")
})

