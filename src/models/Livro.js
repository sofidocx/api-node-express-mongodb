import mongoose from "mongoose";
//criando um schema e um modelo para livro
//embeding/referecing

const livroSchema = new mongoose.Schema({
    id : { type: mongoose.Schema.Types.ObjectId },
    titulo : { type: String, required: true}, //nao consigo passar um livro sem ter titulo 
    editora : { type: String }, 
    preco : { type: Number }, 
    paginas: { type: Number }
}, {versionKey: false}); //nao iremos versionar o schema

const livro = mongoose.model("livros", livroSchema)// coleção, o schema de livros(suas propriedades)

export default livro; 