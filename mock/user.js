function getUserList(){
    return {
        'code': 200,
        'message':'登陆成功',
        'result':{
            'user':{
                'id':1,
                'username':'admin',
                'password':'123456',
                'token':'6DE582FD152C78HJ98989KKL',
            }
        }
    }
}

export default [
    //用户登录假接口
    {
        url:'/api/user/login',
        method:'post',
        response:({body})=>{
            const {username, password} = body;
            const user = getUserList().result.user; // 直接访问用户信息

            if(username === user.username && password === user.password){
                return {code:"200", data:{user}}; // 返回用户信息
            } else {
                return {code:"201", data:{message:'用户名或密码错误'}}; // 返回错误信息
            }
        }
    }
]