import express from 'express'; 
import conectaNaDatabase from './config/dbConnect.js';
import routes from "./routes/index.js"
import mongoose from 'mongoose';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';


const conexao = await conectaNaDatabase();
conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})


const app = express(); //importando e executando o framework
app.use(express.json()); 
routes(app); //o app que definimos como parametro em index.js é agora nossa instância do express
app.use(manipulador404);  
//middleware de erro, interceptando qualquer erro que foi identificado pela nessa aplicação 
app.use(manipuladorDeErros);

export default app; 
