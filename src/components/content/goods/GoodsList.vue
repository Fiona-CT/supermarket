<template>
    <div class="goods-list">
        <goods-list-item class="item" v-for="item in goods" :goods-item="item" :key="item.index"></goods-list-item>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        props: {
            goods:{
                type: Array,
                default(){
                    return []
                }
            }

        },
        components: {
            GoodsListItem
        }
    }
</script>

<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-around;
    }

    .goods-list .item {
        width: 48%;
    }

</style>