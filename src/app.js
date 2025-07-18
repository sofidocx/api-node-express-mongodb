import express from 'express'; 

const app = express(); //importando e executando o framework]
app.use(express.json()); //middleware --> executar em todas as requisições (body com json -> convertido para json)

const livros = [
    {
        id: 1, 
        titulo: "Hipotese do amor"
    },
    {
        id: 2, 
        titulo: "Xeque Mate"
    }
]

function buscaLivro (id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js"); 
}); //gerenciando as rotas 

app.get ("/livros", (req,res) => {
    res.status(200).json(livros); 
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
