<template>
  <el-card>
      <!-- 面包屑导航 -->
      <BaredNav :navone="'权限管理'" :navtwo="'权限列表'" />
    <!-- 表格 -->
    <el-table :data="rightList" class="mytable" border style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="350">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="350">
      </el-table-column>
      <el-table-column label="层次">
          <template slot-scope="scope">
              {{ scope.row.level === '0' ? '一级' : (scope.row.level === '1' ? '二级' : '三级') }}
              <!-- <span v-if="scope.row.id == '0'">一级 </span>
              <span v-else-if="scope.row.id == '1'">二级</span>
              <span v-else>三级</span> -->
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// 引入面包屑导航的组件
import BaredNav from '../layout/breadnav/breadnav.vue'
export default {
    data (){
        return {
            rightList: []
        }
    },
    methods: {
        // 得到所有的权限数据
        async getAllRight(){
            let res = await this.$http.get(`rights/list`)
            //解构
            let { meta, data } = res.data
            // 判断
            if(meta.status === 200){
                this.rightList = data
                // console.log(this.rightList)
                
            }else {
                this.$message.error(meta.msg)
            }
        }
    },
    mounted(){
        this.getAllRight()
    },components: {
        BaredNav
    }
};
</script>

<style scoped>
    .mytable{
        margin-top: 20px;
    }
</style>
