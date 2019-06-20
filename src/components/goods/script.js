// 导入面包屑导航 组件
import MyBread from '../layout/breadnav/breadnav.vue'

export default {
    data(){
        return {
            tableData: [],
            currentPage: 1, // 当前页
            pageSize: 10, // 页容量
            pageSizes: [5, 10, 15],  // 页容量选项
            total: 0, // 数据总条数
            search: '',  // 搜索数据
        }
    },
    methods:{
        // 得到所有的商品列表
        async getPageGoods(){
            let res = await this.$http.get(`/goods?pagenum=${this.currentPage}&pagesize=${this.pageSize}&query=${this.search}`)
            // 解构
            let { meta, data } = res.data
            // 判断
            if(meta.status === 200){
                // 获取数据的总条数
                this.total = data.total
                // 获取数据源
                this.tableData = data.goods
            }else{
                this.$message.error(meta.msg)
            }
        },
        // 点击当前页面需要重新请求数据
        handleCurrentChange(val){
            // 更新当前页
            this.currentPage = val
            // 重新获取数据
            this.getPageGoods()
        },
        // 页容量改变时， 也需要重新请求数据
        handleSizeChange(val){
            this.pageSize = val
            // 重新请求数据
            this.getPageGoods()
        },
        // 搜索数据
        mysearch(){
            this.getPageGoods()
        },
        // 跳转到添加商品的路由中
        toAdd(){
            this.$router.push('/goods/add')
        }
    },
    mounted(){
        this.getPageGoods()
    },
    components: {
        MyBread
    }
}