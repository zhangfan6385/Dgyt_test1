import request from '@/frame_src/utils/request'


export function GetTitle() { //查询登录标题
  return request({
    url: 'Conf/loginConfig?CONF_CODE=%27PTR_IDENT%27,%27LOCAL_IDENT%27,%27SYS_NAME%27',
    method: 'get'
  })
}