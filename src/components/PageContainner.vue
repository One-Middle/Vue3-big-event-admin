<script setup>
defineProps({
  title: {
    require: true,
    type: String
  }
})
</script>
<template>
  <el-card class="page-containner">
    <template #header>
      <div class="header">
        <div class="card-header">{{ title }}</div>
        <slot name="extra"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-containner {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
