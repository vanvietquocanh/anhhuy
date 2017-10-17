const initialState = {
    users:[],
}
function Login(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };
}
 
export default Login;