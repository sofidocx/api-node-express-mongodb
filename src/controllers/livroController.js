//concentrar todas as ações que podem ser feitas em um livro 

import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    // função para listar todos os livros da livraria
    static async listarLivros(req, res, next) {
        try {
            const listaLivros = await livro.find()
                .populate("autor")
                .exec();

            res.status(200).json(listaLivros);
        } catch (erro) {
            next(erro);
        }
    }; //vai se conectar no banco -- operação assincrona

    // função para listar um livro apenas que será procurado por id 
    static async listarLivrosPorId(req, res, next) {
        try {
            const id = req.params.id;

            const livroEncontrado = await livro.findById(id)
                .populate("autor", "nome")
                .exec();

            res.status(200).json(livroEncontrado);
        } catch (erro) {
           next(erro);
        }
    }; //vai se conectar no banco -- operação assincrona

    // função para cadastrar um livro no banco de dados 
    static cadastrarLivro = async (req, res, next) => {
        try {
            let livro = new livros(req.body);

            const livroResultado = await livro.save();

            res.status(201).send(livroResultado.toJSON());
        } catch (erro) {
            next(erro);
        }
    };
    //função para atualizar um livro na livraria 
    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;

            await livro.findByIdAndUpdate(id, {$set: req.body}); //precisamos do identificador único e precisamos da informação que precisamos atualizar 
            res.status(200).json({ message: "Livro Atualizado" });
        } catch (erro) {
            next(erro);
        }
    }; //vai se conectar no banco -- operação assincrona

    //função para deletar um livro 

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;

            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso" })
        } catch (erro) {
            next(erro);
        }
    };

    static async listarLivrosPorEditora(req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ "editora": editora }) // propriedade : variavel que esta guardando a informação  que chega via rota 
            res.status(200).json(livrosPorEditora)
        } catch (erro) {
            next(erro);
        }
    };

};

export default LivroController;