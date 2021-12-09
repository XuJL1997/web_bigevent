$(function () {
  // 点击去注册链接
  $('#link_reg').on('click', function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })
  // 点击去登录链接
  $("#link_login").on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layui中获取form对象
  var form = layui.form

  var layer = layui.layer

  // 通过form.verify()函数自定义效验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, '密码需要6-12位，且不能包含空格'],
    repwd: function (value) {
      var pwd = $('#repw').val()
      // console.log(pwd);
      if (pwd !== value) {
        return '两次输入密码不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post(
      '/api/reguser',
      data,
      function (res) {
        if (res.status !== 0) {
          // console.log(22);
          // return console.log(res.message);
          return layer.msg(res.message)
        }
        layer.msg('账号注册成功，请登录！')
        setTimeout(function () {
          $('#link_login').click()
        }, 1000)
      }
    )
  })


  //监听提交表单事件
  $('#form_login').submit(function (e) {
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          console.log(res.message);
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')

        // 将登录成功的token字符串，保存到localStorage中
        localStorage.setItem('token', res.token)
        setTimeout(function () {
          location.href = "./index.html"
        }, 1000)
      }
    })
  })






})
