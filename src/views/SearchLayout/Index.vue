<template>
  <div>
    <back-header></back-header>

    <router-view></router-view>
  </div>
</template>

<script>
  import BackHeader from '@/components/BackHeader'

  export default {
      components: {BackHeader}
    }
</script>

<style scoped>

</style>
