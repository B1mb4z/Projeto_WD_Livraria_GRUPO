function userAuthen(req,res,next){
    const token = req.headers.userAuthentication;

    const fakeUserToken = "user-authen-token-01"

    if(!token){
        return res.status(401).json({erro: " Token de autenticação não enviado"})
    }
    if(token !== fakeToken){
        return res.status(401).json({erro: " Token invalido"})
    }

    next()

}
module.exports = {
    userAuthen
}