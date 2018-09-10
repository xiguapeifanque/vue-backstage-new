<template>

<div id="app">
  <!-- <ManagePage></ManagePage> -->
<router-view/>
</div>
    

</template>

<script>
import ManagePage from './view/manage/managePage.vue'
export default {
  name: 'app',
  components: {
    'ManagePage':ManagePage
  }
}
</script>

<style>
#app{
  height:100%;
}
</style>
