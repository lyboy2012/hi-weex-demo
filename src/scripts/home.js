var modal = weex.requireModule("modal");
import Common from "./common/common";
import Home from "./api/home/index";
import Contants from "./common/Contants";
import loading from "../components/loading/index.vue";
import sliderPage from "../components/slider/index.vue";
var domModule = weex.requireModule("dom");
export default {
  components: {
    //加载自定义组件
    loading: loading,
    sliderPage:sliderPage
  },
  data() {
    return {
      refresh_display: "hide",
      loading_display: "hide",
      pageNo: 1,
      totalPages: 0,
      hasMore: false,
      isLoading: true,
      loading_more_tips: "",
      appearMin: 1,
      appearMax: 1,
      appearIds: [],
      showTop: false,
      orderId:-1,
      list:[],
      banners:[
        {
        img: "https://gw.alicdn.com/tps/TB1p9CCMVXXXXa_XFXXXXXXXXXX-450-340.png",
        title: "运维/DevOps在线技术峰会",
        link: "https://yq.aliyun.com/activity/188",
        bgcolor: "",
        id: 541
      },
      {
        img: "https://gw.alicdn.com/tps/TB1zpSiMVXXXXchXFXXXXXXXXXX-448-338.png",
        title: "运维/DevOps在线技术峰会",
        link: "https://yq.aliyun.com/activity/188",
        id: 541
        }
      ]
    };
  },
  created(){
    let _this = this;
    domModule.addRule("fontFace", {
      fontFamily: "yq-iconfont",
      src: "url('https://yqfile.alicdn.com/f/yq-icons.ttf')"
    });

    if (weex.config.env.platform === "Web") {
      if (!window.global) {
        window.global = window;
      }
    }
    let url = weex.config.bundleUrl;
    _this.orderId = Common.httpurl(url).id;
    _this.pageInit();
    
  },
  methods: {
    pageInit(){
       let _this = this;
      _this.isLoading = true;
      Home.getList(1,res => {
        if (res.ok) {
          if (res.data.errcode == 0) {
            _this.initData(res.data.data);
             _this.totalPages = res.data.data.totalPages;
             this.checkMoreState();
            _this.isLoading = false;
          }
        }
      });
    },
    initData(data,isMore){
      
       let _this = this;
       let list = data.list;
      if (isMore) {
        _this.list = _this.list.concat(list);
      } else {
        _this.list = list;
      }
    },
    onrefresh(e) {
      var _this = this;
      _this.refresh_display = "hide";
      setTimeout(
        function() {
          _this.refresh_display = "show";
        },
        0
      );
     _this.pageNo = 1;
      Home.getList(_this.pageNo,res => {
        if (res.ok) {
          if (res.data.errcode == 0) {
            _this.initData(res.data.data);
            _this.totalPages = res.data.data.totalPages;
            _this.checkMoreState();
          }
        }

        _this.refresh_display = "show";
        setTimeout(
          function() {
            _this.refresh_display = "hide";
          },
          0
        );
      });
    },
    onloading(e) {
      var _this = this;
      if (!_this.hasMore) {
        _this.loading_display = "show";
        setTimeout(
          function() {
            _this.loading_display = "hide";
          },
          0
        );
        //self.loading_display = 'hide';
        _this.loading_more_tips = "到底啦!";
        return;
      }
      _this.pageNo++;

      _this.loading_display == "hide";
      setTimeout(
        function() {
          _this.loading_display = "show";
        },
        0
      );
      Home.getList(_this.pageNo, res => {
        if (res.ok) {
          if (res.data.errcode == 0) {
            _this.initData(res.data.data, true);
            _this.totalPages = res.data.data.totalPages;
            _this.checkMoreState();
          }
        }
        _this.loading_display == "show";
        setTimeout(
          function() {
            _this.loading_display = "hide";
          },
          0
        );
      });
    },
  
    checkMoreState() {
      let _this = this;
      _this.hasMore = _this.pageNo < _this.totalPages;
      if (!_this.hasMore) {
        _this.loading_more_tips = "到底啦";
      } else {
        _this.loading_more_tips = "";
      }
    },
    update(e) {
      this.target = "home-Weex~";
      console.log("target:", this.target);
      modal.toast({ message: "home-hello" });
    },
    goToTop() {
      domModule.scrollToElement(this.$refs.topItem, {
        offset: 0
      });
    },
    onappear(e) {
      let _this = this;
      //var appearId = this.list[e.target.attr.index].article_id;
      // console.log('+++++appearId',appearId)
      //console.log('+++++index',e.target.attr.index)
      var currentIndex = e.target.attr.index;
      var appearIds = this.appearIds;

      appearIds.push(currentIndex);
      _this.getMinAndMaxIds(appearIds);
    },
    ondisappear(e) {
      let _this = this;
      var currentIndex = e.target.attr.index;
      // var disAppearId = this.list[].article_id;
      //console.log('-----disAppearId',disAppearId)
      //console.log('-----index',e.target.attr.index)
      var appearIds = _this.appearIds;
      var index = appearIds.indexOf(currentIndex);

      if (index > -1) {
        appearIds.splice(index, 1);
      }
      _this.getMinAndMaxIds(appearIds);
    },
    getMinAndMaxIds(appearIds) {
      let _this = this;
      appearIds.sort(function(a, b) {
        return a - b;
      });
      _this.appearIds = appearIds;
      _this.appearMax = appearIds[appearIds.length - 1];
      _this.appearMin = appearIds[0];

      _this.showTop = _this.appearMax > 20;
    }
  }
};
