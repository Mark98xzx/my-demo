// 定义一个 mymoment 插件

// 引入 moment
import moment from 'moment'
// 创建一个对象
var mymoment = {}
// 添加一个 install 方法
mymoment.install = function (Vue){
    // 定义一个全局过滤器
    Vue.filter('myfilter', function(value, sptStr){
        return moment(value).format(sptStr)
    })
}

export default mymoment