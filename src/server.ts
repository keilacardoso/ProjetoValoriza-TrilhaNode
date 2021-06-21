import express from "express";

const app = express();

app.listen(3000, () => console.log("Server is running..."));

app.get("/test", (request, response)=>{
    return response.send("Olá Mundo");
})

app.post("/test-post", (request, response)=> {
    return response.send("Olá Mundo metodo Post");
})