import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {

      let { limite = 5, pagina = 1 } = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);

      if (limite > 0 && pagina > 0) {

        const livrosResultado = await livros.find()
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor")
          .exec();

        res.status(200).json(livrosResultado);
      } else {
        next(new RequisicaoIncorreta);
      }

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

      console.log(livroResultado);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      console.log(livroResultado);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  //para que tenhamos resultados de busca por "filtro", atendendo esses campos 
  //regex - expressões regulares 

  static listarLivroPorFiltro = async (req, res, next) => {
    try {

      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = await livros
          .find(busca)
          .populate("autor");

        res.status(200).send(livrosResultado);

      } else {
        res.status(200).send([]);
      }

    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas; //gte - greater than or equal (maior ou igual que)
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas; //lte - less than or equal (menor ou igual que)

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;

}

export default LivroController;