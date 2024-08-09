
//获取用户列表接口
function RoleList(){
    return {
      "code": 200,
      'message': 'success',
      'result': [
          {
              id: '1',
              userName: '超级管理员',
              permission: 'admin',
              dataPermission: '全部数据权限',
              shunxu: '1',
              status:true, //状态 1正常 0禁用
              chuangjianRiqi: '2024-06-06 10:06:17',
            },
            {
              id: '2',
              userName: '普通角色',
              permission: 'common',
              dataPermission: '自定义数据权限',
              shunxu: '2',
              status:false, //状态 1正常 0禁用
              chuangjianRiqi: '2024-06-06 10:06:17',
            },
      
      ]
    }
  }
  
  export default [
      //权限管理-用户管理接口
      {
          url:'/api/roleList',
          method:'post',
          response:()=>{
              const list = RoleList().result
              return {
                  code:200,
                  data:list
              }
          }
      }
  ]