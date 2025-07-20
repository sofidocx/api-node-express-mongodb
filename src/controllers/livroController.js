//concentrar todas as ações que podem ser feitas em um livro 

import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

// função para listar todos os livros da livraria
    static async listarLivros (req,res) {
        try {
            const listaLivros = await livro.find();
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição`})
        }
    }; //vai se conectar no banco -- operação assincrona

// função para listar um livro apenas que será procurado por id 
     static async listarLivrosPorId (req,res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do livro`})
        }
    }; //vai se conectar no banco -- operação assincrona

// função para cadastrar um livro no banco de dados 
    static async cadastrarLivro (req, res) {
        const novoLivro = req.body; //passar por meio do body para o mongoose 
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({
                message : "Criado com sucesso", 
                livro: livroCriado
            });
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - Falha ao cadastrar o livro`})//erros internos do servidor 
        }
       
    }

//função para atualizar um livro na livraria 
     static async atualizarLivro (req,res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body); //precisamos do identificador único e precisamos da informação que precisamos atualizar 
            res.status(200).json({message: "Livro Atualizado"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização do livro`})
        }
    }; //vai se conectar no banco -- operação assincrona

//função para deletar um livro 

    static async deletarLivro (req, res) {
        try{
            const id = req.params.id; 
            await livro.findByIdAndDelete(id); 
            res.status(200).json({message: "Livro deletado com sucesso"})
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - erro ao tentar deletar livro`})
        }
    };

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({editora : editora}) // propriedade : variavel que esta guardando a informação  que chega via rota 
            res.status(200).json(livrosPorEditora)
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - Falha na busca`})
        }
    };

};

export default LivroController;