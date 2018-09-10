import Vue from "vue";
import VueRouter from "vue-router";
import ManagePage from '@/view/manage/managePage.vue'
import index from '@/view/manage/index/index.vue'
import artical from '@/view/manage/artical/artical.vue'
import addArtical from '@/view/manage/artical/addArtical.vue'
import member from '@/view/manage/member/member.vue'
import edit from '@/view/manage/artical/edit.vue'
import login from '@/view/manage/login/login.vue'
Vue.use(VueRouter);

var routes = [
    {
        path:"/manage",
        component:ManagePage,
        meta:{
            login:true
        },
        children:[
            {
                path:"/",
                name:'index',
                component: index
            },
            {
                path: "/artical/:articalState?",
                component: artical
            },
            {
                path: "/addArtical",
                component: addArtical 
            },
            {
                path: "/member",
                component: member 
            },
            {
                path: "/edit",
                component: edit 
            }
        ]
    },
    {
        path: "/login",
        component: login 
    },
    {
        path:'',
        redirect:'/login'
    }
 
]

var router =  new VueRouter({
    mode:'history',
    routes
})

router.beforeEach(
    
   (to,from,next)=>{
    
        if(to.meta.login){
            alert(4444);
            if(document.getCookie()){
                next();
            }else{
                next('/login');
            }
        }else{
            next();
        }
   }
);
export default router;
