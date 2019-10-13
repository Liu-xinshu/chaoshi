<!-- 主页 -->
<template>
<div class='home'>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div v-for="(item,index) in banners" :key="index" class="swiper-slide">
                <img :src="item.image" alt="">
            </div>
        </div>
    </div>
    <div class="scroll">
        <div>
            <DL v-for="(item,index) in list" :key="index"
           :item="item"
            >
                <template v-slot:shopping>
                    <span class="shopping">加入购物车</span>
                </template>
            </DL>
        </div>
    </div>
    <!--  -->
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {banner,getList}from '@/http.js'
import BScroll from 'better-scroll'
import DL from '@/components/dl.vue'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    DL
},
data() {
//这里存放数据
return {
    banners:[],
    pageid:0,
    limit:10,
    show:false,
    list:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    initCsrollFn(){
        this.myScroll= new BScroll('.scroll',{
             pullDownRefresh:{
                 threshold:50
             },
             pullUpLoad:{
                 threshold:50
             },
             click:true,
         });

        this.myScroll.on('pullingUp',()=>{
            console.log('上拉加载');
            this.pageid++;
            if(!this.show){
                this.getListFn();
            }
        })

        this.myScroll.on('pullingDown',()=>{
            console.log('下拉刷新')
             this.pageid = 0; //初始化页码
            this.show = false; //初始化是否加载数据
            this.list = [];
            this.getListFn();
        })
    },
    async getListFn(){
        try{
             let res=await getList({pageid:this.pageid,limit:this.limit});
             this.list=this.list.concat(res.data.data);
               console.log(this.list)
               if(res.data.data.length>10){
                   console.log('没有数据了');
                   this.show=true;
               }
               this.myScroll.refresh();
               this.myScroll.finishPullUp();
                this.myScroll.finishPullDown();
        }catch(e){
            console.log(e)
        }
      
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
async created() {
   
},
//生命周期 - 挂载完成（可以访问DOM元素）
async mounted() {
    try{
         let res=await banner();
         this.banners=res.data.data
        this.$nextTick(()=>{
                new this.Swiper(".swiper-container",{
                    autoplay:true,
                    loop:true
                })

            this.initCsrollFn()

           this.getListFn();
          
       })
    }catch(error){
        console.log(error)
        
    }
    
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
.home{
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.swiper-container{
    img{
        display: block;
        width: 100%;
        height: 200px;
    }
}
.scroll{
    flex: 1;
    overflow: hidden;
}
.swiper-container{
    width: 100%;
}
.shopping{
    position: absolute;
    right: 5px;
    bottom: 5px;
    cursor: pointer;
}
</style>