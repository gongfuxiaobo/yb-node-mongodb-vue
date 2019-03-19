<template>
  <div id="ca_pagination_box">
    <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizes" :total="total" :layout="layout" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
    total: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 每页条数改变回调
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    // 当前页改变回调
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style scoped>
#ca_pagination_box {
  text-align: right;
}
</style>
<style>
#ca_pagination_box .btn-next,
#ca_pagination_box .btn-prev,
#ca_pagination_box .number {
  border: 1px solid #dcdfe6;
  padding: 0 7px;
  min-width: 28px;
  margin-left: 10px;
}
</style>
