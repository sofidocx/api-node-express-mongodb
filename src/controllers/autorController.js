import mongoose from "mongoose";
import { autor } from "../models/Autor.js"
import NaoEncontrado from "../erros/naoEncontrado.js";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listarAutores = await autor.find();
            res.status(200).json(listarAutores);
        } catch (erro) {
            res.status(500).json({ messagae: `${erro.message} - Falha na requisição dos autores ` });
        }
    };

    static async listarAutorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findById(id);
            if (autorResultado !== null) {
                res.status(200).send(autorResultado);
            } else {
                next(new NaoEncontrado("Falha na requisição de buscar o autor"));
            }

        } catch (erro) {
            next(erro);
        }
    };

    static async cadastrarAutor(req, res, next) {
        try {
            let autor = new autores(req.body);

            const autorResultado = await autor.save();

            res.status(201).send(autorResultado.toJSON());
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorResultado = await autor.findByIdAndUpdate(id, { $set: req.body });

            if (autorResultado !== null) {
                res.status(200).send({ message: "Autor atualizado com sucesso" });
            } else {

                next(new NaoEncontrado("Falha na requisição de buscar o autor"));
            }

        } catch (erro) {
            next(erro);
        }
    };

    static async deletarAutor(req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findByIdAndDelete(id);

            if (autorResultado !== null) {
                res.status(200).json("Autor deletado com sucesso");
            } else {
                next(new NaoEncontrado("Falha na requisição de buscar o autor"));
            }

        } catch (erro) {
            next(erro);
        }
    };
};

export default AutorController;