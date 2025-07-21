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
            const autorResultado = await autor.findById(id);
            res.status(200).send(autorResultado);

        } catch (erro) {
            res.status(400).json({ message: `${erro.message} - Falha na requisição de buscar o autor ` })
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            let autor = new autores(req.body);

            const autorResultado = await autor.save();

            res.status(201).send(autorResultado.toJSON());
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição em cadastrar o autor` })
        }
    }
    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;

            await autores.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).send({ message: "Autor atualizado com sucesso" });
        } catch (erro) {
            res.status(500).send({ message: erro.message });
        }
    };

    static async deletarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json("Autor deletado com sucesso");
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição em deletar o autor` })
        }
    }
};

export default AutorController;