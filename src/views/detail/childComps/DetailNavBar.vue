<template>
    <div>
        <nav-bar>
            <img  slot="left" class="back" src="@/assets/img/common/back.svg" @click="backClick" alt="">
            <div slot="center" class="title">
                <div v-for="(item,index) in titles"
                     :key="item"
                     class="title-item"
                     :class="{active: index === currentIndex}" @click="titleClick(index)">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components:{
            NavBar
        },
        data(){
            return{
                titles: ['商品','参数','评论','推荐'],
                currentIndex: 0
            }
        },
        methods:{
            titleClick(index){
                this.currentIndex = index
                this.$emit('titleClick' , index)
            },
            backClick(){
                this.$router.back()
            }
        }

    }
</script>

<style scoped>
    .back {
        margin-top: 12px;
    }

    .title {
        display: flex;
        padding: 0 20px;
    }

    .title-item {
        flex: 1;
        font-size: 14px;
    }

    .title-item.active {
        color: var(--color-high-text)
    }

</style>