import express from 'express'; 
import conectaNaDatabase from './config/dbConnect.js';
import routes from "./routes/index.js"
import mongoose from 'mongoose';


const conexao = await conectaNaDatabase();
conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})


const app = express(); //importando e executando o framework
routes(app); //o app que definimos como parametro em index.js é agora nossa instância do express 

//middleware de erro, interceptando qualquer erro que foi identificado pela nessa aplicação 
app.use((erro, req, res, next) => { 
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"})
    } else {
        res.status(500).send({message: "Erro interno do servidor"});
    }
});

export default app; 
