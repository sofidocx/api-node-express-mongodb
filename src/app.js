import express from 'express'; 
import conectaNaDatabase from './config/dbConnect.js';
import routes from "./routes/index.js"


const conexao = await conectaNaDatabase();
conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})


const app = express(); //importando e executando o framework
routes(app); //o app que definimos como parametro em index.js é agora nossa instância do express 


app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1); //o index que queremos encontrar e a quantidade que iremos deletar
    res.status(200).send("Livro deletado com sucesso");
});


export default app; 
