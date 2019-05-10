<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <textarea placeholder="请输入要评论的内容(120字以内)" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i + 1 }}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ (item.content === 'undefined') || (item.content.length === 0) ? '此用户很懒，没有评论' : item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">发表评论</mt-button>
    </div>
</template>

<script>

    import { Toast } from 'mint-ui'

    export default {
        name: "comment",
        data() {
            return {
                pageIndex: 1,
                comments: [],
                msg: []
            }
        },
        created() {
            this.getComments()
        },
        methods: {
            getComments() {
                  this.$http.get('http://www.liulongbin.top:3005/api/getcomments/ ' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                      if (result.body.status === 0) {
                          this.comments = this.comments.concat(result.body.message);
                      } else {
                          Toast('获取评论失败')
                      }
                  })
              },
            getMore() {
              this.pageIndex ++;
              this.getComments();
            },
            postComments() {

                this.msg = this.msg.replace(/^\s*|\s*$/g,"");

                console.log(this.msg.length);

                if (this.msg.length === 0) {
                    return Toast('评论内容不能为空');
                }
                
                this.$http
                    .post('http://www.liulongbin.top:3005/api/postcomment/' + this.$route.params.id, { content:this.msg.trim() })
                    .then(result => {
                    if (result.body.status === 0) {
                        var cmt = {
                            user_name: "匿名用户",
                            add_time: Date.now(),
                            content: this.msg
                        };

                        this.comments.unshift(cmt);
                        this.msg = "";
                    } else {

                    }
                })
            }
        },
        props: ["id"]
    }
</script>

<style scoped lang="scss">

    .cmt-container {

        margin: 50px 0;

        h3 {
          font-size: 18px;
        }

        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list {

            margin: 5px 2px;

            .cmt-item {

                font-size: 13px;

                .cmt-title {
                    background-color: #cccccc;
                    line-height: 30px;
                    border-radius: 10px;
                    text-indent: 1em;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>