//organizando a parte de rotas dos livros 

import express from "express"; 
import LivroController from "../controllers/livroController.js"; 

const routes = express.Router(); 

//CRUD
routes.get("/livros", LivroController.listarLivros); 
routes.get("/livros/:id", LivroController.listarLivrosPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes; 