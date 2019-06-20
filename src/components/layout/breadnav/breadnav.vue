<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ navone }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ navtwo }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    // 将来在父组件中要传入两个参数： navone ， navtwo
    props: ['navone', 'navtwo']
}
</script>

<style>

</style>
