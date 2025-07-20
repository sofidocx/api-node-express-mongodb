import { autor } from "../models/Autor.js"

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listarAutores = await autor.find();
            res.status(200).json(listarAutores);
        } catch (erro) {
            res.status(500).json({ messagae: `${erro.message} - Falha na requisição dos autores ` })
        }
    }

    static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            await autor.findById(id);
            res.status(200).json(id)

        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição de buscar o autor ` })
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: `Autor cadastrado com sucesso`,
                autor: novoAutor
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição em cadastrar o autor` })
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json("Autor atualizado com sucesso");
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição em atualizar o autor` })
        }
    }

    static async deletarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id, req.body);
            res.status(200).json("Autor deletado com sucesso");
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição em deletar o autor` })
        }
    }
};

export default AutorController;