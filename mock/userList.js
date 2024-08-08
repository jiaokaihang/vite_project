
//获取用户列表接口
function UserList(){
  return {
    "code": 200,
    'message': 'success',
    'result': [
        {
            id: '01',
            loginName: 'admin',
            userName: '段鸿运',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '02',
            loginName: 'children',
            userName: '张三',
            bumen: '研发部门',
            phone: '15633908169',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '03',
            loginName: 'admin',
            userName: '李四',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '04',
            loginName: 'admin',
            userName: 'jack',
            bumen: '设计部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '05',
            loginName: 'admin',
            userName: 'jerry',
            bumen: '产品部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '06',
            loginName: 'admin',
            userName: '王五',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '07',
            loginName: 'admin',
            userName: '李四',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '08',
            loginName: 'admin',
            userName: '李四',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '09',
            loginName: 'admin',
            userName: '李四',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '10',
            loginName: 'admin',
            userName: '李四',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '11',
            loginName: 'admin',
            userName: '李四',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
          {
            id: '12',
            loginName: 'admin',
            userName: '李四',
            bumen: '研发部门',
            phone: '1588888888',
            chuangjianRiqi: '2024-01-18',
          },
    ]
  }
}

export default [
    //权限管理-用户管理接口
    {
        url:'/api/userList',
        method:'post',
        response:()=>{
            const list = UserList().result
            return {
                code:200,
                data:list
            }
        }
    }
]