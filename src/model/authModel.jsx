const AuthModel = {
    isAuthenticated : false,
    signIn(cb){
        AuthModel.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signOut(cb){
        AuthModel.isAuthenticated = false
        setTimeout(cb,100)
    },
    signUp(cb){
        setTimeout(cb,100)
    }
}

export default AuthModel