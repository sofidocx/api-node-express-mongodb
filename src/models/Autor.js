//criando o autor para os livros 
import mongoose from "mongoose";

const autorSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId }, 
    nome: { 
        type: String, 
        required: [true, "O nome do(a) autor(a) é obrigatório "]
     }, 
    nacionalidade: { type: String }
}, {versionkey: false});

const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema }; //precisamos referenciar o autor no livro, então precisamos exportar seu schema 