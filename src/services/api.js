// 设置axios,process.env值是根据用户是测试还是生产来读取config中的dev.env和pro.env中的配置
// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

let baseURL = '/api'

axios.defaults.baseURL = baseURL
// axios.defaults.headers.common['Authorization'] = 'q-sign-algorithm=sha1&q-ak=AKIDxobFiz14uY4Paa42TkqxvjMo9LMDMOis&q-sign-time=1531115043;1531115223&q-key-time=1531115043;1531115223&q-header-list=host&q-url-param-list=&q-signature=04e5f6ff7af424b120f889a05cd3cb13b5dcb8a1' //process.env.API_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.get['X-AUTH-USERID'] = 9
axios.defaults.withCredentials = true
// 测试

axios.interceptors.request.use(
  function (request) {
    return request
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 下载excel
const downloadUrl = url => {
  // const iframe = document.createElement('iframe')
  // iframe.style.display = 'none'
  // iframe.src = url
  // iframe.onload = function() {
  //   document.body.removeChild(iframe)
  // }
  // document.body.appendChild(iframe)
  const aNode = document.querySelector('#excelDownload')
  let a = ''

  if (aNode) {
    a = aNode
  } else {
    a = document.createElement('a')
  }

  a.style.display = 'none'
  a.href = url
  a.id = 'excelDownload'

  if (!aNode) {
    document.body.appendChild(a)
  }

  document.querySelector('#excelDownload').click()
}

// 添加一个响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 处理excel文件下载
    if (
      response.headers['content-type'] ===
      'application/octet-stream;charset=UTF-8'
    ) {
      downloadUrl(response.request.responseURL)
      response.data = '下载成功'
      response.headers['content-type'] = 'text/json'
      return response
    }
    return response
  },
  function (error) {
    const response = error.response

    if (response.status === 401) {
      // 处理401错误
    } else if (response.status === 403) {
      // 处理403错误
    } else if (response.status === 412) {
      // 处理412错误
    } else if (response.status === 413) {
      // 处理413权限不足
    } else if (response.status === 500) {
      // 处理500服务器错误
      Message({
        message: 'System Error',
        type: 'error'
      })
    }
    return Promise.reject(response)
  }
)

// 自定义判断元素类型JS
function toType (obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// isFormdata判断是否为Formdata
function apiAxios (method, url, params, isFormdata, headers, timeout) {
  if (params) {
    params = filterNull(params)
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url:
        method === 'GET'
          ? url.indexOf('?') > -1
            ? url + '&time=' + new Date().getTime()
            : url + '?time=' + new Date().getTime()
          : url,
      data:
        method === 'POST' ||
          method === 'PUT' ||
          method === 'DELETE' ||
          method === 'PATCH'
          ? isFormdata
            ? qs.stringify(params)
            : params
          : null,
      params:
        method === 'DELETE' || method === 'PUT'
          ? isFormdata
            ? params
            : null
          : method === 'GET'
            ? params
            : null,
      baseURL: baseURL,
      timeout: timeout && timeout.timeout ? timeout.timeout : 6000,
      headers: headers
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        if (err) {
          reject(err.data)
        }
      })
  })
}

/**
 * get post put delete请求方法
 * @param url
 * @param params
 * @param data
 * @returns {Promise}
 */
// 注释解释
export default {
  get: function (url, params = {}, isFormdata, headers, timeout) {
    return apiAxios('GET', url, params, isFormdata, headers, timeout)
  },
  post: function (url, data = {}, isFormdata, headers = {}, timeout) {
    return apiAxios('POST', url, data, isFormdata, headers, timeout)
  },
  put: function (url, params = {}, isFormdata, headers, timeout) {
    return apiAxios('PUT', url, params, isFormdata, headers, timeout)
  },
  delete: function (url, data = {}, isFormdata, headers = {}, timeout) {
    return apiAxios('DELETE', url, data, isFormdata, headers, timeout)
  },
  patch: function (url, data = {}, isFormdata, headers = {}, timeout) {
    return apiAxios('PATCH', url, data, isFormdata, headers, timeout)
  }
}
