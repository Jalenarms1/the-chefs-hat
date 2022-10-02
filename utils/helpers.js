// Place script code for helper functions here

module.exports = {
    loginCheck: (req, res, next) =>{
        if(!req.session.isLoggedIn){
            res.render("login", {
                isLoggedIn: req.session.isLoggedIn,
                
            })
        }else{
            next();
        }
    }

}