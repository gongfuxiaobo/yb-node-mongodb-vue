<template>
  <div id="app">
    <el-row :gutter="15">
      <el-col :span="4">
        <div>left menu</div>
      </el-col>
      <el-col :span="20">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  background-color: #eceef2;
  /* width: 100%; */
  height: 100%;
  padding: 15px;
}
</style>
