var protocol = location.protocol + '//'
var hostname = typeof CURRENT_IP === 'string' ? CURRENT_IP : location.hostname
var port = location.port ? ':' + location.port : ''

//var url = protocol + hostname + port + location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '/dist/index.weex.js')
var pathname = location.pathname
pathname = pathname.replace(/\/(.*)\.html$/, '$1')
var url = protocol + hostname + port + location.pathname.replace(/\/.*\.html$/, '/').replace(/\/$/, '/dist/'+pathname+'.weex.js')+'?wh_weex=true'
