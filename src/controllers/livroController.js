import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
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
    
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      console.log(livroResultado);
    
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
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
        res.status(200).send({message: "Livro removido com sucesso"});
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
        
      const busca = processaBusca(req.query); 
      
      const livrosResultado = await livros.find(busca);

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };
}

function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas } = parametros; 

    const busca = {}; 

    if (editora) busca.editora = editora; 
    if(titulo) busca.titulo = { $regex: titulo, $options: "i"}; 

    if (minPaginas || maxPaginas ) busca.numeroPaginas = {};

    if(minPaginas) busca.numeroPaginas.$gte = minPaginas; //gte - greater than or equal (maior ou igual que)
    if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas; //lte - less than or equal (menor ou igual que)

    return busca; 

}

export default LivroController;