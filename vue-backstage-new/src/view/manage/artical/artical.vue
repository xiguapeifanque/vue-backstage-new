<template>
        <div class="bot_body">
            <div class="func">
                <router-link to="addArtical" class="fl add">添加文章</router-link>
                <a href="javascript:;" 
                    class="fl" 
                    @click="deleteSelected">批量删除</a>
            </div>
            <div class="table">
                <table border="1" bordercolor="#c8c8c8a1">
                        <tr>
                            <th><input type="checkbox" 
                                    v-model="checkAll" 
                                    @click="allCheck"
                                ></th>
                            <th>文章标题</th>
                            <th>发布人</th>
                            <th>审核状态</th>
                            <th>浏览权限</th>
                            <th>是否展示</th>
                            <th>发布时间</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(item,index) in articalData"  :key="index">
                            <td><input type="checkbox" 
                                        v-model="item.checked" 
                                        @change="singleCheck"
                            ></td>  
                            <td>{{item.articalTitle}}</td>
                            <td>{{item.author}}</td>
                            <td>{{item.state}}</td>
                            <td>{{item.browser_right}}</td>
                            <td class="isshow" :class="{on:item.isshow,off:!item.isshow}">
                                <div  @click="changeShow(index)">
                                    <i></i>
                                    <em v-if="item.isshow">是</em>
                                    <em v-else>否</em>
                                </div>
                            </td>
                            <td class="time">{{item.time}}</td>
                            <td class="do" >
                                <router-link to="edit" @click.native="editing(item)">
                                    <i class="fa fa-edit"></i>
                                    <span class="word">编辑</span>
                                </router-link>
                                <a href="javascript:;" 
                                    @click="changeStore(index)" 
                                    ref="mybox">
                                    <i class="fa" 
                                        :class="{'fa-star':item.isstore,'fa-star-o':!item.isstore}" 
                                        ></i>
                                    <span class="word">收藏</span>
                                </a>
                                <a href="javascript:;" @click="singleDelete(index)">
                                    <i class="fa fa-trash"></i>
                                    <span class="word">删除</span>
                                </a>
                            </td>
                        </tr>
                        
                </table>
                
            </div>
            <transition name="fade">
                <div class="alarm" v-show="alarmShow">{{alarmWord}}</div>
            </transition> 
            
        </div>
</template>
<script>
// import "../../../assets/js/artical.js"
import getData from"../../../getData/data"
import addArtical from "./addArtical"
import edit from "./edit"
export default {
    data(){
        return{
            checkAll:false,
            abc:1,
            getData:getData,
            alarmWord:"收藏成功",
            alarmShow:false
        }
    },
    computed:{
        articalData(){
            return this.getData.articalData
        }
    },
    watch:{
        getData:{
            handler:function(){
               window.localStorage.setItem("data",JSON.stringify(this.getData)); 
            },
            deep:true
        }
    },
    created(){
        if(JSON.parse(window.localStorage.getItem("data")) ){
            this.getData =JSON.parse(window.localStorage.getItem("data"));
        }
    },
    methods:{
        singleCheck(){
            let arr = this.articalData.filter(function(item){
                return item.checked == true;
            });
            if(arr.length == this.articalData.length){
                this.checkAll = true;
            }else{
                this.checkAll = false;
            }
        },
        allCheck(){//全选
            console.log(this.checkAll);
                for(var i=0;i<this.articalData.length;i++){
                    this.articalData[i].checked = !this.checkAll;
                }
          
        },
        changeShow(index){//受否展示
            this.articalData[index].isshow = !this.articalData[index].isshow;
            

        },
        changeStore(index){//收藏
        console.log(this.$refs.mybox);
            this.$refs.mybox[0].style.color = 'red'; 
            clearTimeout(timer);
            this.articalData[index].isstore = !this.articalData[index].isstore;
            if(this.articalData[index].isstore){
                this.alarmWord = "收藏成功"
            }else{
                this.alarmWord = "取消收藏"
            }
            this.alarmShow = true;
            var _this = this;
            var timer = 0;
            timer = setTimeout(
                function(){
                    _this.alarmShow = false;
                },2500);
        },
        singleDelete(index){//删除
            this.articalData.splice(index,1);
        },
        deleteSelected(){//批量删除
            var r = this.articalData.filter(
                function(item){
                    return item.checked == false;
                }
            );
            this.getData.articalData = r;
        },
        editing(item){
            //点击的时候改变状态 提交一个mutation的值
           this.$store.commit('editMsg',item);
           console.log(this.$store.state.itemMsg);
        }
    }
}

</script>

<style lang="css" scoped>
@import "../../../assets/css/artical.css";
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  opacity: 0;
}
</style>
