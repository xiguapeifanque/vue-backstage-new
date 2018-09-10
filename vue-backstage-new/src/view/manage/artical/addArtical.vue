<template>
        <div class="bot_body">
            <div class="title">添加文章</div>
            <div class="add_content">
                <div class="name clearfix">
                    <label for="" class="fl">文章标题</label>
                    <div class="fl">
                        <input type="text" placeholder="请输入文章标题" class="active" v-model="newmsg.articalTitle">
                    </div>
                </div>
                <div class="attribute clearfix">
                    <div class="fl">
                        <label for="" class="fl">自定义属性</label>
                        <div class="fl normal" 
                            @click="changeStore"
                            :class="{'normal':!newmsg.isstore,'visited':newmsg.isstore,'active':active.store}"
                            @mouseover="active.store=true"
                            @mouseout="active.store=false"
                        >
                            <span class="fl">收藏</span>
                            <i class="fl fa fa-check"></i>
                        </div>
                        <div class="fl normal" 
                        @click="changeRight"
                        :class="{'normal':!newmsg.right,'visited':newmsg.right,'active':active.right}"
                        @mouseover="active.right=true"
                        @mouseout="active.right=false"
                        >
                            <span class="fl">审核</span>
                            <i class="fl fa fa-check"></i>
                        </div>
                        <div class="fl normal" 
                        @click="changeShow"
                        :class="{'normal':!newmsg.isshow,'visited':newmsg.isshow,'active':active.show}"
                        @mouseover="active.show=true"
                        @mouseout="active.show=false"
                        >
                            <span class="fl">展示</span>
                            <i class="fl fa fa-check"></i>
                        </div>   
                    </div>
                </div>
                <div class="summary clearfix">
                    <label for="" class="fl">浏览权限</label>
                    <div class="select fl" @click="open = !open">
                        <span>{{newmsg.browser_right}}</span>
                        <i class="fa fa-sort-desc"></i>
                        <ul :class="{'disapear':!open}">
                            <li @click="browser_right='开放浏览'">开放浏览</li>
                            <li @click="browser_right='会员浏览'">会员浏览</li>
                        </ul>
                    </div>
                </div>
                <div style="height:38px">
                    <div class="name fl">
                        <label for="" class="fl">作者</label>
                        <div class="fl">
                            <input type="text" placeholder="请输入作者名字" v-model="newmsg.author">
                        </div>
                    </div>
                    <div class="key fl">
                        <label for="" class="fl">关键字</label>
                        <div class="fl">
                            <input type="text" placeholder="请输入关键字" v-model="newmsg.keyWord">
                        </div>
                    </div>
                </div>
                
                <div class="summary clearfix">
                    <label for="" class="fl">内容摘要</label>
                    <div class="fl">
                        <textarea name="" id="" placeholder="请输入内容摘要" v-model="newmsg.summary"></textarea>
                    </div>
                </div>
                <div class="submit">
                    <router-link to="/artical" @click.native="setMsg">立即提交</router-link>
                    <a href="javascript:;" @click="newmsg={}">重置</a>
                </div>
            </div>
        </div>  
</template>
<script>
import getData from"../../../getData/data"
export default {
    data(){
        return{
            newmsg:{
                id:1,
                articalTitle:'',
                author:"",
                state:"审核通过",
                browser_right:"开放浏览",
                isshow:true,
                time:"",
                checked:false,
                isstore:false,
                right:false
            },
            open:false,
            getData:getData,
            active:{
                store:false,
                right:false,
                show:false
            }
        }
    },
    created(){
        window.localStorage.setItem("data",JSON.stringify(this.getData)); 
    },
    watch:{
        getData:{
            handler:function(){
               window.localStorage.setItem("data",JSON.stringify(this.getData)); 
            },
            deep:true
        }
    },
    methods:{
        changeRight(){
            this.newmsg.right =!this.newmsg.right
            if(this.right){
                this.state="审核通过";
            }else{
                this.state="待审核";
            }
        },
        changeStore(){
            this.newmsg.isstore =!this.newmsg.isstore
        },
        changeShow(){
            this.newmsg.isshow =!this.newmsg.isshow
        },
        setMsg(){
            this.newmsg.id= this.getData.articalData.length+1;
            console.log(this.newmsg);
            //console.log(this.newmsg);
            this.newmsg.time = new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()
            //console.log(this.newmsg.time)
            this.getData.articalData.push(this.newmsg);
            // console.log(m);
            
        }
    }
}
</script>
<style>
    @import "../../../assets/css/addArtical.css";
</style>


