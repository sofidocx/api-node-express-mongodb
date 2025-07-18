import express from 'express'; 
import conectaNaDatabase from './config/dbConnect.js';
import livro from "./models/Livro.js";

const conexao = await conectaNaDatabase();
conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})


const app = express(); //importando e executando o framework]
app.use(express.json()); //middleware --> executar em todas as requisições (body com json -> convertido para json)


app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js"); 
}); //gerenciando as rotas 

app.get("/livros", async (req, res) => {
  const listaLivros = await livro.find();
  res.status(200).json(listaLivros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body); //de onde nossos dados irão sair, onde o req (requisição) está sendo recebido 
    res.status(201).send("O livro foi cadastrado com sucesso!");
});

app.get("/livros/:id", (req, res) => {// avisando o express por meio do :, que é um valor variável 
    const index = buscaLivro(req.params.id); //propriedade params 
    res.status(200).json(livros[index]); 
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo; //colocando o livro de indice correspondente e substituindo o valor pelo body que recebemos na requisicao 
    res.status(200).json(livros); 
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1); //o index que queremos encontrar e a quantidade que iremos deletar
    res.status(200).send("Livro deletado com sucesso");
});


export default app; 
