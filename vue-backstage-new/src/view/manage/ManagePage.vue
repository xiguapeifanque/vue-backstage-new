<template>
  <div class="box">
    <header class="header">
        <div class="toggle_navigation"></div>
        <a class="logo" href="javascript:;">FLAT<span>LAB</span></a>

        <div class="weather fl">
            <span>北京</span>
            <span>日间</span>
            <img v-bind:src="WeatherInfo.iconurl1" alt="">
            <span>晚间</span>
            <img v-bind:src="WeatherInfo.iconurl2" alt="">
            <span>{{WeatherInfo.temp}}</span>
        </div>

        <div class="top_right">
            <div class="user">
                <img src="../../assets/img/user.jpg" alt="">
                <!-- <span>Echo</span> -->
                <b></b>
            </div>
        </div>
    </header>
    
    <main>
        <aside class="fl">
            <div class="user_photo">
                <a href="">
                    <img src="../../assets/img/user.jpg" alt="">
                </a>
                <p>你好,欢迎登陆</p>
            </div>
            <ul>
                <router-link  v-for="(item,index) in getListData" 
                                :to="item.address" 
                                tag="li" 
                                :key="index" 
                                @click.native="addNav(item)">
                    <a href="javascript:;">
                        <i :class="item.iconUrl"></i>
                        <span class="word">{{item.name}}</span>
                        <span class="fold">＋</span>
                    </a>
                </router-link>
            </ul>
        </aside>
        <div class="content fr">
            <div class="top">
                <ul class="title" v-if="arr">
                    <router-link class="fl" 
                                v-for="(item,index) in arr"  
                                :to="item.address" 
                                :key="index" 
                                tag="li"
                                @click.native="nowPage=item"
                                >
                        <i class="fl" :class="item.iconUrl"></i>
                        <span class="word fl">{{item.name}}</span>
                        <router-link :to="arr[index-1].address" 
                                        tag="i" 
                                        v-if='(item.id==nowPage.id)&&(index-1>=0)' 
                                        class="fa fa-close m" 
                                        @click.native="closeNav(index,item)">
                        </router-link>
                    </router-link>
                </ul>
                <div class="handle fr">
                    <i class="fa fa-hand-pointer-o fl"></i>
                    <span to="/vip" class="fl">页面操作</span>
                    <i class="fa fa-sort-desc fl"></i>
                    <ul>
                        <li>
                            <i class="fa fa-refresh"></i>
                            <span to="/artical">刷新当前</span>
                        </li>
                        <li>
                            <i class="fa fa-ban"></i>
                            <span>关闭其他</span>
                        </li>
                        <li>
                            <i class="fa fa-times-circle"></i>
                            <span>关闭全部</span>
                        </li>  
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <router-view @tranEdit="editMsg" :editMessage="edit"></router-view>
            </div>
            
        </div>
    </main>
  </div>
</template>

<script>
import Data from '@/getData/data'
export default{
    data(){
        return{
            WeatherInfo:{},
            num:1,
            getData:Data,
            showNav:{},
            arr:[
                 {
                    id:1,
                    name:'系统首页',
                    iconUrl:'fa fa-television',
                    address:"/"
                }
            ],
            nowPage:'',
            edit:{}
        }
    },
    computed:{
        getLocalStr(){
            return 1
        },
        getListData(){
            return this.getData.system;
        }
    },
    watch:{
        getData:{
            handler:function(){
               window.localStorage.setItem("data",JSON.stringify(this.getData)); 
            },
            deep:true
        },
         nowPage:{
             handler:function(){
                 console.log(this.nowPage);
             },
             deep:true
         }
    },
    created(){
        //天气预报
      this.$jsonp('http://api.asilu.com/weather/', 
        {
        　　"city":"北京"
        } 
        ).then(json => {
        　　this.WeatherInfo = {
            weather:json.weather[0].weather,
            temp:json.weather[0].wind
        }
        let wInfo1 = json.weather[0].icon1.substr(4);
        let wInfo2 = json.weather[0].icon2.substr(6);
        
            this.WeatherInfo.iconurl1='http://api.map.baidu.com/images/weather/day/'+wInfo1+'.png';
            this.WeatherInfo.iconurl2='http://api.map.baidu.com/images/weather/day/'+wInfo2+'.png';
        
        }).catch(err => {
        　　console.log(err)
        
        })
        
        },
        methods:{
            addNav(item){
                this.nowPage =item;
                if(item.id ==0){
                    return;
                }
                for(var i=0;i<this.arr.length;i++){
                    if(JSON.stringify(this.arr[i]) == JSON.stringify(item)){
                        //console.log(111111);
                        return false;
                    }
                }
                this.arr.push(item);
         
        // console.log(1);
               // console.log(this.editMsg);
            },
            closeNav(num,a){
                this.arr.splice(num,1);
                if(a){
                    this.nowPage = this.arr[num-1];
                }
            },
             editMsg(item){
                this.edit = item;
            }
            
        },
       
    }


</script>

<style>

@import "../../assets/css/index.css";
aside .router-link-exact-active.router-link-active{
    background-color:#009688;
}
.title .router-link-exact-active.router-link-active{
    background-color:#1AA094;
    color:#fff;
}
.title .router-link-exact-active.router-link-active i{
    background-color:#1AA094;
    color:#fff;
}

</style>


