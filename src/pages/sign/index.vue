<template>
    <div class="wrap">
        <map name="map" show-location=true :longitude="longitude" :latitude="latitude"></map>
        <button class="add-btn" @click="jump">
            添加面试
        </button>
    </div>
</template>
<script>

export default {
    data(){
        return{
            longitude:116.29845,
            latitude:39.95933
        }
    },
    methods:{
        jump(){
            wx.navigateTo({url:"../addInterview/index"})
        }
    },
    async created(){
        //判断是否需要指纹解锁 从本地存储中获取
        let fingerInfo = wx.getStorageSync('finger')
        if(!fingerInfo || !fingerInfo.finger || +new Date()- fingerInfo.timestamp> 24*60*60*1000){
            wx.navigateTo({url:'/pages/finger/index'});
            return;
        }

        
    }
}
</script>
<style lang="scss" scoped>
.wrap{
    height: 100%;
}
map{
    width: 100%;
    height: 100%;
}
.add-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
    
</style>