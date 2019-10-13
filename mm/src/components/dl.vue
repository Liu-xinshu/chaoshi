<!-- 图文公用组件 -->
<template>
<div class='dl'
@click="detail(item.detail)"
>
   <dt>
       <img :src="item.cover" alt="">
   </dt>
   <dd>
       {{item.name}}
    <p @click.stop="addShopping(item.id)"><slot name="shopping"></slot></p> 
   </dd>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getUserInfo,addShopping}from '@/http.js';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    item:{
        type:Object,
        required:true
    }
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    detail(obj){
        this.$router.push({
            path:'/detail',
            query:{
                html:obj
            }
        })
    },
   async addShopping(id){
       try{
           let user=await getUserInfo();
           let userid=user.data.data.uid;
           let res=await addShopping({user_id:userid,shop_id:id});
           console.log(res)
       }catch(e){
           console.log(e)
       }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
console.log(this.item)
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
.dl{
    width: 100%;
    height: 150px;
    display: flex;
    overflow: hidden;
    dt{
        width: 150px;
        height: 150px;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    dd{
        flex: 1;
        line-height: 35px;
        position: relative;
    }
}
</style>