<!--  -->
<template>
<div class='index'>
    <router-view></router-view>
    <footer>
        <dl v-for="(item,index) in titleS" :key="index" @click="changeInd(index,item.path)">
            <dt>
                <img :src="curInd===index?require('@/assets/images/'+item.picActive):require('@/assets/images/'+item.pic)" alt="">
            </dt>
            <dd :class="{'active':curInd===index}">{{item.title}}</dd>
        </dl>
    </footer>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    titleS:[
        {title:"首页",path:"/",pic:"首页.png",picActive:"首页1.png"},
        {title:"分类",path:"/index/classify",pic:"分类.png",picActive:"分类1.png"},
        {title:"购物车",path:"/shopping",pic:"购物车.png",picActive:"购物车1.png"},
        {title:"我的",path:"/index/my",pic:"我的.png",picActive:"我的1.png"},
    ],
    curInd:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    changeInd(index,path){
        this.curInd=index;
        this.$router.push(path).catch(()=>{})
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
.index{
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
footer{
    width: 100%;
    height: 50px;
    display: flex;
    dl{
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        dd.active{
            color: red;
        }
        img{
            width: 30px;
            height: 30px;
        }
    }
}
.index>div{
    flex: 1;

}
</style>