
import mongoose from "mongoose";
import erroBase from "../erros/erroBase.js";
import erroValidacao from "../erros/erroValidacao.js"
import requisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

//manipulando erros da aplicação 
function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        new requisicaoIncorreta().enviarResposta(res);
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new erroValidacao(erro).enviarResposta(res);
    }
    else if (erro instanceof NaoEncontrado) {
        erro.enviarResposta(res);
    }
    else {
        new erroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros; 