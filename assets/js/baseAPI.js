//每次调用  $.get()  $.post() 或者  $.ajax() 的时候
// 都会先调用  ajaxPrefilter 这个函数
// 在这个函数中，可以拿到给 Ajax提供的配置对象
$.ajaxPrefilter(function(options){
  // 发起ajax请求之前同意拼接请求的根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})