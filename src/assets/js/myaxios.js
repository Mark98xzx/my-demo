// 定义一个 myaxios 插件
//引入 axios
import axios from 'axios'
//创建一个 myaxios 对象
var myaxios = {}
// 添加 install 方法
myaxios.install = function(Vue){
    //统一设置请求 API
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

    // 设置一个拦截器
    axios.interceptors.request.use(config => {
        // 这里是一个回调函数, 这个函数会在请求发送之前执行, 这时,这个 axiso 已经将所有的参数放到了 config
        if(config.url !== 'login'){
            // 统一设置 token
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            // 应该将 token 添加到 config 中
            config.headers.common['Authorization'] = localStorage.getItem('token')
        }
        return config
    })
    //给 vue 实例对象添加方法
    Vue.prototype.$http = axios
}

export default myaxios