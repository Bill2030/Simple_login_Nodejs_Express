import express from "express"
import bodyparser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import exp from "constants";

const  __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000;
var isAuthorized = false;

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

function passwordCheck(req, res, next){
    const username = req.body["username"]
    const password = req.body["password"]
    if(username === "admin" && password === "admin"){
        isAuthorized = true;
        console.log("username, password", username, password);
    }
    next();
}
app.use(passwordCheck);

app.get('/', (req, res)=>{
    res.send(__dirname + 'public/index.html');
})

app.post("/submit", (req, res)=>{
    if(isAuthorized){
        res.sendFile(__dirname + "/public/home.html")
    }
    else{
        res.sendFile(__dirname + "public/index.html")
    }
});
app.listen(port, ()=>{
    console.log(`The App is up and runnning on port ${port}`)
})


