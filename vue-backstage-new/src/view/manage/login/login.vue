<template>
    <div class="box">
        <video src="@/assets/video/login.mp4" autoplay loop width="1900px"></video>
        <div class="mask"></div>
        <div class="login">
            <h1>
                <a href="javascript:;" class="fl"  @click="state='login'">登录</a>	
                <a href="javascript:;" class="fl"  @click="state='register'">注册</a>
            </h1> 
            <form action="" class="form form1"
                v-if="state=='login'"
            >
                <div class="userName">
                    <input type="text" 
                            placeholder="请输入用户名  例Yolanda" 
                            class="UserName" 
                            v-model="loginData.userName"
                            @blur="judgeUN"
                            @keydown.enter="judgeUN"
                            />
                    <i class="fa" :class="{'fa-check-circle':error.login.userName=='true',
                                            'fa-times-circle':error.login.userName=='false'}"
                    ></i>
					<span>{{tips.login.un}}</span>
                </div>
                <div class="password">
                    <input type="password" 
                            placeholder="请输入密码  例zyy1221" 
                            class="PassWord" 
                            v-model="loginData.password"
                            @blur="judgePW"
                            @keydown.enter="pwtip"
                            />
                    <i class="fa" :class="{'fa-check-circle':error.login.password=='true',
                                            'fa-times-circle':error.login.password=='false'}"
                    ></i>
					<span>{{tips.login.pw}}</span>
                </div>
                <div class="code">
                    <input type="text" 
                            placeholder="验证码" 
                            class="check" 
                            v-model="loginData.code"
                            @blur="judgeCD"
                            @keydown.enter="judgeCD"
                            />
                    <i class="fa" :class="{'fa-check-circle':error.login.code=='true',
                                            'fa-times-circle':error.login.code=='false'}"
                    ></i>
                    <img src="@/assets/img/code.jpg" alt=""/>
                </div>
                <div class="login_btn">
                    <a href="#" class="log">
                    <router-link v-if="success" 
                                tag="input" 
                                to="/manage" 
                                value="登录" 
                                @click.native="loginBtn"
                    ></router-link>
                    <input v-else type="button" 
                                value="登录" 
                                />
                    </a>
                </div>
            </form>

            <form action="" class="form form2"
                v-else-if="state=='register'"
            >
                <div class="userName">
                    <input type="text" 
                    placeholder="用户名(4~10个字符)" 
                    class="UserName"
                    @blur="registerUN"
                    v-model="registerData.userName"
                    />
                    <i class="fa" :class="{'fa-check-circle':error.register.userName=='true',
                                            'fa-times-circle':error.register.userName=='false'}"
                    ></i>
                    <span>{{tips.register.userName}}</span>
                </div>
                <div class="userName">
                    <input type="text" 
                    placeholder="邮箱" 
                    class="UserName"
                    @blur="registerEmail"
                    v-model="registerData.email"
                    />
                    <i class="fa" :class="{'fa-check-circle':error.register.email=='true',
                        'fa-times-circle':error.register.email=='false'}">
                    </i>
                    <span>{{tips.register.email}}</span>
                </div>
                <div class="password">
                    <input type="password" 
                    placeholder="密码(6~20)" 
                    class="PassWord"
                    @blur="registerPW"
                    v-model="registerData.password"
                    />
                    <i class="fa" :class="{'fa-check-circle':error.register.password=='true',
                        'fa-times-circle':error.register.password=='false'}">
                    </i>
                    <span>{{tips.register.password}}</span>
                </div>
                <div class="password">
                    <input type="password" 
                    placeholder="请再次输入密码" 
                    class="PassWord"
                    @blur="registerPWAgain"
                    v-model="registerData.repassWord"
                    />
                    <i class="fa"  :class="{'fa-check-circle':error.register.repw=='true',
                        'fa-times-circle':error.register.repw=='false'}">
                    </i>
                    <span>{{tips.register.repw}}</span>
                </div>
                <div class="login_btn">
                    <a href="#" 
                    class="log"
                    ><input type="button" 
                    value="注册"
                    @click="register"
                    /></a>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import getData from"../../../getData/data"
export default {
  data(){
      return{
          getData:getData,
          loginData:{
              userName:'',
              password:'',
              code:''
          },
          success:false
          ,
          error:{
              login:{
                  userName:'',
                  password:'',
                  code:''
              },
              register:{
                  userName:'',
                  password:'',
                  repw:'',
                  email:''
              }
          },
          state:'login',
          registerData:{
            userName:'',
            password:'',
            repassWord:'',
            email:'',
            // type:"普通用户",
            // state:'normal',
            // loadingTimes:105,
            // latelyLoadingIP:'107.120.117',
            // registerTime:'2017-11-10',
            // enable:true,
            // checked:false
          },
          tips:{
              login:{
                  un:'',
                  pw:''
              },
              register:{
                  userName:'',
                  password:'',
                  repassword:'',
                  email:''
              }
          },
          start:{}
      }
  },
  watch:{
      error:{
          handler:function(){
              this.success = true;
              var obj = this.error.login;
              for(var key in obj){
                  if(obj[key] !== 'true'){
                      this.success = false;
                  }
              }

              
          },
          deep:true
      }
      ,
      getData:{
            handler:function(){
               window.localStorage.setItem("data",JSON.stringify(this.getData)); 
            },
            deep:true
        },
      state:{
          handler:function(){
              
          }
      }
  },
  created(){
        if(JSON.parse(window.localStorage.getItem("data")) ){
            this.getData =JSON.parse(window.localStorage.getItem("data"));
        }
    this.start = this.tips;
  },
  methods:{
      //判断用户名是否正确
      judgeUN(){
          //为空则返回
          if(this.loginData.userName == ''){
                  this.tips.login.un = "请输入用户名";
                  return;
              }
          var _this = this;
          var un = this.getData.memberData.filter(
              function(item){
                  return item.userName == _this.loginData.userName;
              }
          );
          //检测数据里是否有输入的名字 改变i的className
          if(un.length ==1){
              this.error.login.userName = 'true';
              this.tips.login.un  = ""
          }else{
              this.error.login.userName = 'false';
              this.tips.login.un = "此用户名尚未注册"
            
          }
      },
      judgePW(){
          if(this.loginData.password == ''){
                this.tips.login.pw = "请输入密码";
                return;
            }
           var _this = this;
           let pw;
           this.getData.memberData.forEach(
               function(item,index){
                   if(item.userName == _this.loginData.userName){
                       pw = item.password;
                   }
               }
           );
           if(pw ==this.loginData.password){
               this.error.login.password = 'true';
               this.tips.login.pw = ""
           }else{
               this.error.login.password = 'false';
               this.tips.login.pw = "密码错误"
           }
      },
      judgeCD(){
          if(this.loginData.code == 'jgmxj'){
              this.error.login.code = 'true';
          }else{
              this.error.login.code = 'false';
          }
      },
      registerUN(){
          var un = this.registerData.userName;
          var len = un.length;
          console.log(len);
          var _this = this;
          var name = this.getData.memberData.filter(
              function(item){
                  return item.userName == _this.registerData.userName;
              }
          );
          
          if(len>=4&&len<=10){
              if(name.length ==0){
                  this.error.register.userName ='true';
                  this.tips.register.userName =""
              }else{
                    this.error.register.userName ='false';
                    this.tips.register.userName ="该用户名已经注册，请直接登陆"  
              }
          }else{
              this.error.register.userName ='false';
              this.tips.register.userName ="长度错误"
          }
      },
      registerEmail(){
          var str = this.registerData.email;
          if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)|/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)){
              this.error.register.email ='true'
              this.tips.register.email =""
          }else{
              this.error.register.email ='false'
              this.tips.register.email ="邮箱格式错误"
          }
      },
      registerPW(){
          var str = this.registerData.password;
          console.log(str.length);
          if(str.length>=6&&str.length<=20){
              if(/\w/.test(str)){
                this.error.register.password ='true';
                this.tips.register.password =""
              }else{
                   this.error.register.password ='false'
                 this.tips.register.password ="密码只可含有数字、字母、下划线"
              }
              
          }else{
              this.error.register.password ='false'
              this.tips.register.password ="密码长度错误"
          }
      },
      registerPWAgain(){
          if(this.registerData.password == this.registerData.repassWord){
              this.error.register.repw ='true'
              this.tips.register.repw =""
          }else{
              this.error.register.repw ='false'
              this.tips.register.repw ="密码不一致"
          }

      },
      register(){
          this.state = 'login';
         // alert(this.state);
          var time=new Date();
          var now = time.getFullYear() + '-'+time.getMonth() +'-' + time.getDate();
          var data = this.registerData;
          var err = this.error.register;
          for(var key in err){
                if(err[key] == 'false'){
                    this.state = 'register';
                   return;
                }  
          }
          
          for(var key in data){
             // console.log(data[key]);
              if(data[key] == ''){
                  alert(key);
                  this.state = 'register';
                  alert(33333);
                 return;
              }
          }
          console.log(data);
          data.registerTime = now;
          this.getData.memberData.push(data);
          
      },
      loginBtn(){
          setCookie('data',this.loginData);
          function setCookie(name,value){
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
            }
      }
  }
}
</script>
<style>
@import "../../../assets/css/login.css";
</style>


