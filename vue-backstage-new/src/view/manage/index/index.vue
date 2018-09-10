<template>
        <ul class="index">
            <li class="fl">
                <div class="fl"><i class="fa fa-comments"></i></div>
                <div class="fr">
                    <span>5</span>
                    <span>新消息</span>
                </div>
            </li>
            <li class="fl">
                <div class="fl"><i class="fa fa-user-plus"></i></div>
                <div class="fr">
                    <span>5</span>
                    <span>新增人数</span>
                </div>
            </li>
            <li class="fl">
                <div class="fl"><i class="fa fa-users"></i></div>
                <div class="fr">
                    <span>{{getData.memberData.length}}</span>
                    <span>用户总数</span>
                </div>
            </li>
            <li class="fl">
                <div class="fl"><i class="fa fa-file-picture-o"></i></div>
                <div class="fr">
                    <span>5</span>
                    <span>图片总数</span>
                </div>
            </li>
            <li class="fl">
                <div class="fl"><i class="fa fa-file-text-o"></i></div>
                <div class="fr">
                    <span>5</span>
                    <span>待审核文章</span>
                </div>
            </li>
            <li class="fl">
                <div class="fl"><i class="fa fa-files-o"></i></div>
                <div class="fr">
                    <span>{{getData.articalData.length}}</span>
                    <span>文章总数</span>
                </div>
            </li>
        </ul>

</template>
<script>
import getData from"../../../getData/data"
export default {
  data(){
      return{
          getData:getData
      }
  },
  created(){
      if(window.localStorage.getItem("data")){
          this.getData = JSON.parse(window.localStorage.getItem("data"));
      }
  },
  computed:{
      
  }
}
</script>
<style>
@import "../../../assets/css/home.css";
</style>

