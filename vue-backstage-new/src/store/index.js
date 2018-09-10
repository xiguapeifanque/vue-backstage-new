import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//定义一个容器  一个页面中只有一个容器store，状态存储时候响应的，不能直接地改变state中的状态  唯一的方法是提交一个mutation
let store = new Vuex.Store({
    //包含所有应用级别的状态
    state:{
        itemMsg:{}
    },
    mutations:{
        editMsg(state,item){
            state.itemMsg = item;
        }
    }
});

export default store;
