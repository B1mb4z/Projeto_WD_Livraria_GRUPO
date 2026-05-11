function createAutho(){
    const header = req.headers.createAuthorization;
    if(!header){
        return res.status(401).json({mensagem: "Acesso nao autorizado: header createAuthorization ausente"})
    }

    const partes = header.split(" ")

    if(partes.length !== 2 || partes[0].toLowerCase() !== "creation"){
        return res.status(401).json({
            mensagem: "Acesso não autorizado: O header deve ser do tipo Creation."
        })
    }

    const token = partes[1];

    const tokenCorreto = "token-creation-01"
    if(token !== tokenCorreto) {
        return res.status(401).json({
            mensagem: "Processo não autorizado: token invalido."
        })
    }
    next();
}


function deleteAutho(){
    const header = req.headers.deleteAuthorization;
    if(!header){
        return res.status(401).json({mensagem: "Acesso nao autorizado: header deleteAuthorization ausente"})
    }

    const partes = header.split(" ")

    if(partes.length !== 2 || partes[0].toLowerCase() !== "delete"){
        return res.status(401).json({
            mensagem: "Acesso não autorizado: O header deve ser do tipo Delete."
        })
    }

    const token = partes[1];

    const tokenCorreto = "token-deleting-01"
    if(token !== tokenCorreto) {
        return res.status(401).json({
            mensagem: "Processo não autorizado: token invalido."
        })
    }
    next();
}

module.exports = {
    createAutho,
    deleteAutho
}