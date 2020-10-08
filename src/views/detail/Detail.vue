<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content"
            style="overflow:scroll;"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <div>{{$store.state.cartList.length}}</div>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
     import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
     import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
     import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
     import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
     import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
     import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
     import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
     import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

     import Scroll from "@/components/common/scroll/Scroll";
    // import Toast from "@/components/common/toast/Toast";
     import GoodsList from "@/components/content/goods/GoodsList";


     import {getDetail , Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
     import {debounce} from "@/common/utils";

     export default {
       name: "Detail",
       components:{
         DetailNavBar,
         DetailSwiper,
         DetailBaseInfo,
         DetailShopInfo,
         DetailGoodsInfo,
         DetailParamInfo,
         DetailCommentInfo,
         DetailBottomBar,

         Scroll,
         //Toast,
         GoodsList,
       },
       data() {
         return {
           iid: null,
           topImages: [],
           goods: {},
           shop: {},
           detailInfo: {},
           paramInfo: {},
           commentInfo:{},
           recommends: [],
           themeTopYs: [],
           getThemeTopY: null,
           currentIndex: 0,

         }
       },
       created() {
         //1.保存传入的iid
         this.iid = this.$route.params.iid;

         //2. 根据iid请求详情数据
         getDetail(this.iid).then(res => {
           //console.log(res);
           //1获取顶部的图片轮播
           const data = res.result
           this.topImages = data.itemInfo.topImages

           //2 .获取商品信息
           this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

           //3.创建店铺信息
           this.shop = new Shop(data.shopInfo)
           // 4 图片信息
           this.detailInfo = data.detailInfo;
           //5获取参数信息
           this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
           //6 取出评论信息
           if(data.rate.cRate !== 0) {
             this.commentInfo = data.rate.list[0]
           }
         });
         getRecommend().then(res => {
           this.recommends = res.data.list
         });
         this.getThemeTopY = debounce(() =>{
           this.themeTopYs = [];
           this.themeTopYs.push(0);
           this.themeTopYs.push(this.$refs.params.$el.offsetTop);
           this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
           this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
           this.themeTopYs.push(Number.MIN_VALUE);

         })
       },
       methods: {
         imageLoad(){
           this.$refs.scroll.refresh();
           this.getThemeTopY()
         },
         titleClick(index){
           //console.log(index);
           this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);

         },
         contentScroll(position) {
           this.showBackTop = position.y <= -1000
           const positionY = -position.y
           let length = this.themeTopYs.length
           for(let i = 0; i < length-1; i++) {
             // if (this.currentIndex !== i
             //         &&
             //         ((i < length -1 && positionY >= this.themeTopYs[i]  && positionY < this.themeTopYs[i +1])
             //                 || (i === length -1 && positionY>= this.themeTopYs[i])))

             if (this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
             {
               this.currentIndex = i;
               this.$refs.nav.currentIndex = this.currentIndex
             }
           }
         },
         addToCart() {
           const product = {}
           product.imge = this.topImages[0];
           product.title = this.goods.title;
           product.desc = this.goods.desc;
           product.realPrice = this.goods.realPrice;
           product.iid = this.iid
           this.$store.dispatch('addToCart', product)
           // .then(res => {
           //   debugger
           //   // this.$toast.show(res,2000)
           //   console.log(res);
           // })
         }
       }
     }

</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>