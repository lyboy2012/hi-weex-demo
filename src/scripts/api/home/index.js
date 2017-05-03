import Contants from "../../common/Contants";
let stream = weex.requireModule("stream");
import common from "../../common/common";
const mockData1 = {
  data:{//服务器返回数据结构
      errcode: 0,
      errmsg: "",
      data: {
        pageSize: 10,
        list: [
          {
            id:1,
            name:"1"
          },
          {
            id:2,
            name:"2"
          },
          {
            id:3,
            name:"3"
          },
          {
            id:4,
            name:"4"
          },
          {
            id:5,
            name:"5"
          },
          {
            id:6,
            name:"6"
          },
          {
            id:7,
            name:"7"
          },
          {
            id:8,
            name:"8"
          },
          {
            id:9,
            name:"9"
          },
          {
            id:10,
            name:"10"
          }
        ],
        totalPages: 3
      }
    },
    ok:true,//stream 包装
    status:200,//stream 包装
    statusText:"ok"//stream 包装
}
const mockData2 = {
  data:{//服务器返回数据结构
      errcode: 0,
      errmsg: "",
      data: {
        pageSize: 10,
        list: [
          {
            id:11,
            name:"11"
          },
          {
            id:12,
            name:"12"
          },
          {
            id:13,
            name:"13"
          },
          {
            id:14,
            name:"14"
          },
          {
            id:15,
            name:"15"
          },
          {
            id:16,
            name:"16"
          },
          {
            id:17,
            name:"17"
          },
          {
            id:18,
            name:"18"
          },
          {
            id:19,
            name:"19"
          },
          {
            id:20,
            name:"20"
          }
        ],
        totalPages: 3
      }
    },
    ok:true,//stream 包装
    status:200,//stream 包装
    statusText:"ok"//stream 包装
}
const mockData3 = {
  data:{//服务器返回数据结构
      errcode: 0,
      errmsg: "",
      data: {
        pageSize: 10,
        list: [
          {
            id:21,
            name:"21"
          },
          {
            id:22,
            name:"22"
          },
          {
            id:23,
            name:"23"
          },
          {
            id:24,
            name:"24"
          },
          {
            id:25,
            name:"25"
          },
          {
            id:26,
            name:"26"
          },
          {
            id:27,
            name:"27"
          },
          {
            id:28,
            name:"28"
          },
          {
            id:29,
            name:"29"
          },
          {
            id:30,
            name:"30"
          }
        ],
        totalPages: 3
      }
    },
    ok:true,//stream 包装
    status:200,//stream 包装
    statusText:"ok"//stream 包装
}
class Home {
  static getList(pageNo, cb) {
    //if(!window.global){
    // window.global = window;
    //}
    return pageNo==1 ?cb(mockData1): pageNo==2 ? cb(mockData2) : cb(mockData3);
    //return cb(mockData);

    common.fetch(
      {
        method: "GET",
        url: Contants.DOMAIN +
          "home/list?type=dataflow&size=10&page=" +
          pageNo +
          "&callback=homeList",
        type: "jsonp"
      },
      function(response) {
        if (cb) cb(response);
      }
    );
  }
}
export default Home;
