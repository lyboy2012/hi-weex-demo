let stream = weex.requireModule("stream");
let navigator = weex.requireModule("navigator");
import Contants from "./Contants";
function openWin(url) {
  navigator.push(
    {
      url: url,
      animated: "true"
    },
    function() {}
  );
}
export default {
  fetch(params, succ, fail) {
    return stream.fetch(params, succ, fail || function() {});
  },
  openWindow(url) {
    openWin(url);
  },
  getWeexBasePath(urlObj){
    return urlObj.origin+':'+urlObj.port;
  },
  httpurl(url) {
    var params = {};
    var matchArr;
    var search;
      if (
        (matchArr = url.toString().match(
          new RegExp(
            "^([a-z0-9-]+\:)?" + //protocol
              "[/]{2}" + //slash x 2
              "(?:([^@/:\?]+)(?::([^@/:]+))?@)?" + //username:password@
              "([^:/?#]+)" + //hostname
              "(?:[:]([0-9]+))?" + //port
              "([/][^?#;]*)?" + //pathname
              "(?:[?]([^?#]*))?" + //search
              "(#[^#]*)?$", //hash
            "i"
          )
        ))
      ) {
        search  = matchArr[7] || "";
        return getParams(search);
        
    
      } else {
        throw new Error("Wrong uri scheme.");
      }
      function getParams(v){
        if (typeof v === "string") {
          if (v.indexOf("?") === 0) {
            v = v.substr(1);
          }
          var search = v.split("&");
          for (var p in params) {
            delete params[p];
          }
          for (var i = 0; i < search.length; i++) {
            var pair = search[i].split("=");
            if (pair[0]) {
              try {
                params[decodeURIComponent(pair[0])] = decodeURIComponent(
                  pair[1] || ""
                );
              } catch (e) {
                params[pair[0]] = pair[1] || "";
              }
            }
          }
        }
        return params;
      }
  }
};
