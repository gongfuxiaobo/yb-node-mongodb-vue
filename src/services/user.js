import axios from './api'

const YCU = 'yb-user-provider'

/**
 * 获取用户列表
 * @param {*} params
 */
export const getUser = (params) => axios.get(`${YCU}/getUser`, params)

/**
 * 添加用户
 * @param {*} params
 */
export const addUser = (params) => axios.post(`${YCU}/addUser`, params)

/**
 * 编辑用户
 * @param {*} params
 */
export const updateUser = (params) => axios.put(`${YCU}/updateUser`, params)

/**
 * 删除用户
 * @param {*} params
 */
export const removeUser = (params) => axios.delete(`${YCU}/removeUser`, params, true)
