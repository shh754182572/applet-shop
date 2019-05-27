let request = (path,methods='GET',data={}) => {
  let url = 'https://www.zhengzhicheng.cn/api/public/v1/' + path
  return new Promise(function(resolve, reject) {
    mpvue.request({
      url: url,
      methods:methods,
      data:data,
      success: function(res) {
        resolve(res)
      }
    })
  })
}

export default request;