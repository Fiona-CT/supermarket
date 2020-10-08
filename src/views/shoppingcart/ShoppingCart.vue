<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <cart-list :cart-list="cartList"/>
        <cart-bottom-bar/>
    </div>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    import CartList from "@/views/shoppingcart/childComps/CartList";
    import CartBottomBar from "@/views/shoppingcart/childComps/CartBottomBar";

    import {mapGetters} from 'vuex'
    export default {
        name: "ShoppingCart",
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            ...mapGetters([
                'cartLength',
                'cartList'
            ])
        }
    }
</script>

<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
</style>
