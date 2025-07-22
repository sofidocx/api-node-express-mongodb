import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";
//criando um schema e um modelo para livro
//embeding/referecing

const livroSchema = new mongoose.Schema({
    id : { type: mongoose.Schema.Types.ObjectId },
    titulo : {
         type: String, 
         required: [true, "O título do livro é necessário"]
        }, //nao consigo passar um livro sem ter titulo 
    editora : { 
        type: String, 
        required: [true, "A editora é obrigatória"]
    }, 
    preco : { type: Number }, 
    paginas: {
         type: Number, 
         min: 10, 
         max: 5000
         },
    autor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "autores", 
        required: [true, "O(a) autor(a) é obrigatório" ]
    }
}, {versionKey: false}); //nao iremos versionar o schema

const livro = mongoose.model("livros", livroSchema)// coleção, o schema de livros(suas propriedades)

export default livro; 