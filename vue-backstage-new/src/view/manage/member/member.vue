<template>
    <div class="member">
        <div class="func">
            <a href="javascript:;" 
                class="fl" 
                @click="deleteSelected">批量删除</a>
           
        </div>
        <div class="table">
            <table border="1" bordercolor="#c8c8c8a1">
                <tr>
                    <th><input type="checkbox" v-model="checkAll" @click="allCheck"></th>
                    <th>id</th>
                    <th>用户名</th>
                    <th>账户类型</th>
                    <th>登陆次数</th>
                    <th>最近登陆ip</th>
                    <th>注册时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item,index) in memberData" 
                        :class="{disable:!item.enable}" 
                        :key="index">
                    <td><input type="checkbox" 
                                @change="singleCheck" 
                                v-model="item.checked"> 
                    </td>  
                    <td>{{item.id}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.loadingTimes}}</td>
                    <td>{{item.latelyLoadingIP}}</td>
                    <td>{{item.registerTime}}</td>
                    <td class="do">
                        <a href="javascript:;">
                            <i class="fa fa-edit"></i>
                            <span class="word">编辑</span>
                        </a>
                        <a href="javascript:;" @click="changeAble(item)">
                            <i class="fa" :class="{'fa-minus-square-o'
                                                :item.enable,'fa-minus-square'
                                                :!item.enable}"></i>
                            <span class="word">禁止</span>
                        </a>
                        <a href="javascript:;" @click="singleDelete(index)">
                            <i class="fa fa-trash"></i>
                            <span class="word">删除</span>
                        </a>
                    </td>
                </tr>
               
            </table>
            <div class="alarm" v-show="alarmShow">{{alarmWord}}</div>
        </div>
    </div>

</template>
<script>
import getData from"../../../getData/data";
export default {
    data(){
        return{
            checkAll:false,
            getData:getData,
            alarmWord:"已禁止",
            alarmShow:false,
            visibility:'all'

        }
    },
    computed:{
        memberData(){
            return this.getData.memberData
        }
    },
    watch:{
        getData:{
            handler:function(){
                console.log('触发watch');
                this.memberData.forEach(
                    function(item,index){
                        item.id=index+1;
                    }
                );
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
      
        filter(){
            
        },
        singleCheck(){
            let arr = this.memberData.filter(function(item){
                return item.checked == true;
            });
            console.log(arr.length);
            if(arr.length == this.memberData.length){
                this.checkAll = true;
            }else{
                this.checkAll = false;
            }
        },
        allCheck(){//全选
            console.log(this.checkAll);
                for(var i=0;i<this.memberData.length;i++){
                    this.memberData[i].checked = !this.checkAll;
                }
          
        },
       singleDelete(index){//删除
            this.memberData.splice(index,1);
        },
        deleteSelected(){//批量删除
            var r = this.memberData.filter(
                function(item){
                    return item.checked == false;
                   // console.log(this);
                }
            );
            this.getData.memberData = r;//要修改引入的数据 不可以修改计算后的结果
        },
        changeAble(item){
            clearTimeout(timer);
            item.enable = !item.enable;
            if(item.enable){
                this.alarmWord ="解除禁止"
            }else{
                this.alarmWord ="已禁止"
            }
            this.alarmShow = true;
            var _this = this;
            var timer = 0;
            timer = setTimeout(
                function(){
                    _this.alarmShow = false;
                  //  console.log(this);
                },2500);
        }
       
   }
}

</script>

<style lang="css" scoped>
@import "../../../assets/css/member.css";
</style>



 