import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try {

        //let { limite = 5, pagina = 1, campoOrdenacao = "_id", ordem = -1 } = req.query;
        //opção de mercado 

        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":"); //desestruturação de ordenação, array de duas posições

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado; 

        if (limite > 0 && pagina > 0) {

            const resultadoPaginado = await resultado.find()
                //.sort({ titulo: 1}) // - para ordenar em ordem alfabética 
                //.sort({ _id: -1 }) //1 ou -1 para ordenar, de forma crescente (1) ou descrescente (-1)
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite)
                .exec();

            res.status(200).json(resultadoPaginado);
        } else {
            next(new RequisicaoIncorreta);
        }

    } catch (erro) {

        next(erro);

    }
}

export default paginar; 