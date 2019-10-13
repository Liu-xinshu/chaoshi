import axios from './intercepotor'
//登录
export const login = (params) => axios.post('/api/user/login', params);

//获取用户ID

export const getUserInfo = () => axios.get('/api/user/getUserInfo');

//banner

export const banner = () => axios.get('/api/home/banner');

//分类

export const classify = () => axios.get('/api/shop/shopType');

//分类页数据

export const classifyData = (params) => axios.get('/api/shop/selectType', { params });

//首页列表

export const getList = (params) => axios.get('/api/home/shop', { params });

//添加购物车

export const addShopping = (params) => axios.post('/api/car/addCar', params);