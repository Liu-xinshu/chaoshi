<!--  -->
<template>
<div class='classify'>
    <div>
        <input type="text" placeholder="搜索校园超市商品">
    </div>
    <div class="content">
        <ul>
            <li v-for="(item,index) in newData" :key="item.id"
            @click="changeOneind(index)"
            >
                {{item.title}}
            </li>
           
        </ul>
        <div>
            <div class="screen" v-if="towClassify.length>0">
                <span v-for="(item,index) in towClassify" :key="item.id"
                :class="{'active':index===towind}"
                @click="changeTowClassify(index)"
                
                >{{
                    item.name
                    }}</span>
            </div>
            <div v-else>
                暂无数据
            </div>
            <div class="list">
                <div class="scroll">
                    <DL v-for="item in (rightData)" :key="item.id" :item="item"></DL>
                </div>
            </div>
            
        </div>
    </div>



</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {classify,classifyData}from '@/http.js';
import DL from '@/components/dl.vue';
import BScroll from 'better-scroll';
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    DL
},
data() {
//这里存放数据
return {
    newData:[],
    oneind:0,//一级默认显示页码
    towind:0,//二级默认显示页码
    rightData:[],//右侧数据
    towClassify:[],//二级分类title
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
async getRightData(){
    try{
        let towID=this.newData[this.oneind].children.length>0&&this.newData[this.oneind].children[this.towind].id;
        let res=await classifyData({type_id:this.newData[this.oneind].id,category_id:towID});
       if(res.data.code===1){
           this.rightData=res.data.data;
       }
    }catch(e){
        console.log(e)
    }
},
changeOneind(index){
    this.oneind=index;
    this.getRightData();
    this.towClassify=this.newData[this.oneind].children
    this.towind=0;
},
changeTowClassify(index){
    this.towind=index;
    this.getRightData();
}
},
//生命周期 - 创建完成（可以访问当前this实例）
async created() {
            try{
                let res=await classify();
                if(res.data.code===1){
                    console.log('请求成功');
                    this.newData=res.data.data;
                    this.getRightData();
                    this.towClassify=this.newData[this.oneind].children
                    this.$nextTick(()=>{
                        this.myScroll=new BScroll('.list',{
                            click:true
                        })
                    })
                }
                }catch(e){
                    console.log(e)
                }
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
   
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.classify{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: #999;
   >div:nth-child(1){
        height: 40px;
        padding: 10px;
        display: flex;
        input{
            flex: 1;
            border-radius: 20px;
            border: none;
            text-indent: 2em;
            background: #f5f5f5;
            outline: none;
        }
    }
}
 .content{
        flex: 1;
        overflow: hidden;
        display: flex;
        ul{
            width: 100px;
            background: yellow;
            display: flex;
            flex-direction: column;
            align-items: center;
              background: #f5f5f5;
            li{
                flex: 1;
                display: flex;
                align-items: center;
            }
        }
        >div{
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
    }
    .screen{
        height: 40px !important;
        width: 100%;
        &>span.active{
            color: black;
        }
    }
    .list{
        flex: 1;
        overflow: hidden;
    }
    .scroll{
        flex: 1;
        overflow: hidden;
    }
</style>