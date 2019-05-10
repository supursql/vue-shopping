<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

<!--        缩略图区域-->
        <vue-preview class="preview" :slides="list"></vue-preview>

<!--        图片内容区-->
        <div class="content" v-html="photoinfo.content"></div>

        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>

    import comment from '../subcomponents/comment.vue'

    export default {
        name: "PhotoInfo",
        data() {
            return {
                id: this.$route.params.id,
                photoinfo: {},
                list: []
            }
        },
        created() {
          this.getPhotoInfo();
          this.getThumbs();
        },
        methods: {
            getPhotoInfo() {
                this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.photoinfo = result.body.message[0]
                    }
                })
            },
            getThumbs() {
                this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {

                        result.body.message.forEach(item => {
                            item.msrc = item.src;
                            item.w = 600;
                            item.h = 400;
                        });

                        this.list = result.body.message;
                    }
                })
            }
        },
        components: {
            'cmt-box': comment
        }
    }
</script>

<style scoped lang="scss">
    .photoinfo-container {
        padding: 3px;

        h3 {
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content {
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>