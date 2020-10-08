<template>
<div id="home" class="wrapper">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="topTab" v-show="isTabFixed" class="tab-control" @tabClick="tabClick"></tab-control>
   <scroll class="content"
           style="overflow:scroll;"
           ref="scroll"
           :pull-up-load="true"
           @scroll="contentScroll"
           @pullingUp="loadMore"
            :probe-type="3">
     <home-swiper :banners="banners"
                  @swiperLoaded="swiperLoaded"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control class="tab-control"
                  @tabClick="tabClick"
                  ref="contentTab">

     </tab-control>
     <goods-list :goods="showGoods"></goods-list>
   </scroll>
    <back-top ></back-top>
</div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import Scroll from "@/components/common/scroll/Scroll";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import BackTop from "@/components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultiData, getHomeGoods} from "@/network/home";
  export default {
        name: "Home",
      components:{
        NavBar,
        Scroll,
        TabControl,
        GoodsList,
          BackTop,
        HomeSwiper,
        RecommendView,
        FeatureView,
      },
    data(){
      return{
        // 结果回收
        //result: null
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:1 ,list:[]},
          'new':{page:1 ,list:[]},
          'sell':{page:1 ,list:[]},
        },
        currentType:'pop',
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY: 0
      }
    },
    created() {
      this.getHomeMultiData();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
      activated() {
          this.$refs.scroll.scrollTo(0, this.saveY, 0)
          this.$refs.scroll.refresh()
      },
      deactivated() {
          this.saveY = this.$refs.scroll.scrollY
      },
      mounted(){

      },
    computed: {
          showGoods() {
            return this.goods[this.currentType].list;
          }
    },

    methods: {
          //事件监听
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType ='pop';
            break;
          case  1:
            this.currentType ='new';
            break;
          case  2:
            this.currentType ='sell';
            break;
        }
        if (this.$refs.contentTab !== undefined) {
            this.$refs.contentTab.currentIndex = index
            this.$refs.topTab.currentIndex = index
        }


      },
        BackTop(){
          this.$refs.scroll.scrollTo(0,0);

        },
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
        contentScroll(position) {
            this.showBackTop = (-position.y)> 100
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        //图片加载完成监听
        swiperLoaded(){
          this.tabOffsetTop = this.$refs.tabControl.$el.OffsetTop
        },


      // 网络请求封装
          getHomeMultiData(){
            getHomeMultiData().then(res => {
              //console.log(res);
              // 结果回收
              //this.result = res;
              this.banners = res.data.banner.list
              this.recommends = res.data.recommend.list

            })
          },
          getHomeGoods(type){
            const page = this.goods[type].page
            getHomeGoods(type,page).then (res => {
              //console.log(this.goods[type]);
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page += 1
                this.$refs.scroll.finishedPullUp()
            })
          }

    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
