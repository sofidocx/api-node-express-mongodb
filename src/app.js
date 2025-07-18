import express from 'express'; 

const app = express(); //importando e executando o framework

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js"); 
}); //gerenciando as rotas 

export default app; 
