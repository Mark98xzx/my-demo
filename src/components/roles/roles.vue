<template>
  <el-card>
    <!-- 面包屑导航 -->
    <BreadNav :navone="'权限管理'" :navtwo="'角色列表'"/>
    <!-- 添加角色 -->
    <el-row class="myrow">
      <el-col :span="8">
        <el-button plain @click="showAdd">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="rolesList" class="mytable" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 外层行 -->
          <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag @close="mycolse(scope.row.id, item1.id, scope)" closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, index2) in item1.children" :key="index2">
                <el-col :span="5">
                  <el-tag
                    @close="mycolse(scope.row.id, item2.id, scope)"
                    type="success"
                    closable
                  >{{ item2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag
                    @close="mycolse(scope.row.id, item3.id, scope)"
                    class="mytag"
                    closable
                    type="warning"
                    v-for="(item3, index3) in item2.children"
                    :key="index3"
                  >{{ item3.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="350"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="350"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- slot-scope: 可以用来获取当前行的数据 -->
          <!-- 三个按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="getEdit(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="myDelete(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="openroleDialog(scope)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialog">
      <el-form :rules="rules" ref="addForm" :model="formObj">
        <el-form-item prop="roleName" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="postAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editDialog">
      <el-form :rules="rules" ref="addForm" :model="formObj">
        <el-form-item prop="roleName" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置权限的对话框 -->
    <el-dialog title="权限分配" :visible.sync="roleDialog">
      <!-- 
            props: 用来指定数据源中显示的文本属性&子选项的属性
            show-checkbox: 显示多选框
            data: 绑定数据源
            default-expand-all: 展开所有项
            default-checked-keys：设置默认选中
            node-key：设置当前节点的唯一标识
      -->
      <el-tree
        :data="rightsList"
        :props="props"
        ref="tree"
        node-key="id"
        :default-checked-keys="defaultcheck"
        show-checkbox
        default-expand-all
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRight">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 引入面包屑导航组件
import BreadNav from "../layout/breadnav/breadnav.vue";

export default {
  data() {
    return {
      rolesList: [],
      formObj: {
        roleName: "",
        roleDesc: ""
      },
      formLabelWidth: "100px", //文本的宽高
      addDialog: false, // 控制添加角色面板的显示与隐藏
      editDialog: false, // 控制编辑角色面板的显示与隐藏
      roleDialog: false, // 控制权限分配的面板的显示与隐藏
      rightsList: [], // 所有的权限管理
      defaultcheck: [], // 默认选中的数组
      props: {
        // 用来指定数据源中显示的文本属性&子选项的属性
        label: "authName",
        children: "children"
      },
      rid: "", // 保存分配权限的角色 id
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roletell: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取所有角色数据
    async getRolesList() {
      let res = await this.$http.get("roles");
      let { meta, data } = res.data;
      // console.log(meta, data)
      // 判断
      if (meta.status === 200) {
        this.rolesList = data;
        // console.log(this.rolesList);
      } else {
        this.$message.error(meta.msg);
      }
    },
    showAdd() {
      this.addDialog = true;
    },
    // 提交添加角色
    postAdd() {
      this.$http.post("roles", this.formObj).then(res => {
        console.log(res);
        let { meta, data } = res.data;
        if (meta.status === 201) {
          this.$message({
            type: "success",
            message: meta.msg
          });
          // 重新渲染
          this.getRolesList();
          // 关闭面板
          this.addDialog = false;
          // 清空数据
          this.formObj.roleName = "";
          this.formObj.roleDesc = "";
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 编辑角色
    getEdit(id) {
      this.editDialog = true;
      // 根据 id 去获取数据
      this.$http.get(`roles/${id}`).then(res => {
        // console.log(res)
        let { meta, data } = res.data;
        if (meta.status === 200) {
          this.formObj = data;
        }
      });
    },
    // 提交要修改的数据
    editAdd() {
      this.$http
        .put(`roles/${this.formObj.roleId}`, {
          roleName: this.formObj.roleName,
          roleDesc: this.formObj.roleDesc
        })
        .then(res => {
          // console.log(res)
          //   console.log(res.data);
          let { meta } = res.data;
          if (meta.status === 200) {
            this.editDialog = false;
            // 提示修改成功
            this.$message({
              type: "success",
              message: meta.msg
            });
            // 更新数据
            this.getRolesList();
          } else {
            this.$message.error(meat.msg);
          }
        });
    },
    // 删除角色列表数据
    myDelete() {},
    // 删除角色权限
    async mycolse(roleId, rightId, scope) {
      // 发送请求到服务器去删除角色对应的权限
      let res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`);
      // 解构
      let { meta, data } = res.data;
      // 判断
      if (meta.status === 200) {
        // 更新权限（更新当前行的数据源）
        scope.row.children = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 打开权限 对话框
    // scope: 当前行对应的数据源
    async openroleDialog(scope) {
      // 打开对话框时， 要将角色 id 保存起来
      this.rid = scope.row.id;
      // 每次打开分配权限对话框都要清空默认选中
      this.defaultcheck = [];
      this.roleDialog = true;
      // 以树形结构来获取权限数据
      let res = await this.$http.get("rights/tree");
      // 解构
      let { meta, data } = res.data;
      // 判断
      if (meta.status === 200) {
        this.rightsList = data;
        // 设置默认选中的权限
        // 得到所有的三级权限
        // 第一级权限
        scope.row.children.forEach(item1 => {
          // 第二级权限
          item1.children.forEach(item2 => {
            // 第三级权限
            item2.children.forEach(item3 => {
              // 得到第三级权限的 id
              this.defaultcheck.push(item3.id);
            });
          });
        });
        console.log(this.defaultcheck);
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 设置权限，点击确定提交设置权限
    async setRight(){
        // 获取当前树形结构中已经被选中的 一级权限&二级权限&三级权限
        // getCheckedKeys： 得到全选节点的 key
        // getHalfCheckedKeys： 得到半选节点的 key
        let allcheck = this.$refs.tree.getCheckedKeys()
        let half = this.$refs.tree.getHalfCheckedKeys()
        // 合并
        let arr = [...allcheck, ...half]
        // 转为字符串
        let rids = arr.join(',')
        console.log(rids)
        // 发送请求到服务器
        let res = await this.$http.post(`roles/${this.rid}/rights`, {
            rids: rids
        })
        // 解构
        let {meta} = res.data
        if(meta.status === 200){
            this.$message({
                type: 'success',
                message: meta.msg
            })
            // 重新获取数据
            this.getRolesList()
        }else {
            this.$message.error(meta.msg)
        }
        // 关闭面板
        this.roleDialog = false

    }
  },
  mounted() {
    this.getRolesList();
  },
  components: {
    BreadNav
  }
};
</script> 
   
<style scoped>
.myrow {
  margin-top: 20px;
}
.mytable {
  margin-top: 20px;
}
.mytag {
  margin-right: 12px;
  margin-bottom: 8px;
}
</style>
