<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props: ['lunbotuList', 'isfull']
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 160px;

        .mint-swipe-item {

            text-align: center;

            img {
                height: 100%;
            }
        }
    }

    .full {
        width: 100%;
    }

</style>