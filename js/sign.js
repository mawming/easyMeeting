$(function() {
  var el_signup = document.querySelector("a.signup");
  var el_signin = document.querySelector("a.signin");
  var form_signup = document.getElementsByClassName("signup-form")[0];
  var form_signin = document.getElementsByClassName("signin-form")[0];
  var input_rember_me = document.querySelector("input[name=rember-me]");
  var lb_rember_me = document.querySelector("label[for=rember-me]");

  // 判断某个dom元素是否包含某个类名
  function hasClass(element, name) {
    var class_lists = element.classList;
    for (var i in class_lists) {
      if (name === class_lists[i]) {
        return true;
      }
    }
    return false;
  }

  // 点击注册选项处理
  el_signup.addEventListener("click", function() {
    if (hasClass(form_signup, "hide")) {
      // 增加signup相关的元素的显示及样式
      form_signup.className = form_signup.className.replace(/ hide/g, "");
      this.className += " active";


      // 取消signin相关的元素的显示及样式
      form_signin.className += " hide";
      el_signin.className = el_signin.className.replace(/ active/g, "");
    }
  });

  // 点击登录选项处理
  $("a.signin").on("click", function() {
    if (hasClass(form_signin, "hide")) {
      // 增加signin相关的元素的显示及样式
      form_signin.className = form_signin.className.replace(/ hide/g, "");
      this.className += " active";


      // 取消signup相关的元素的显示及样式
      form_signup.className += " hide";
      el_signup.className = el_signup.className.replace(/ active/g, "");
    }
  });

  // 登录选项，点击label-"记住我"也设置为checkbox切换选中功能
  lb_rember_me.addEventListener("click", function() {
    input_rember_me.checked = !input_rember_me.checked;
  });

  /*
   * 点击注册按钮处理：ajax请求发往server端进行注册，server端返回json数据传达注册是否成功的信息
   */
  $(".btn-signup").on("click", function() {
    var signup_info = {};
    signup_info.name = $(".signup-input input").eq(0).val();
    signup_info.password = $(".signup-input input").eq(1).val();
    signup_info.verify = $(".signup-input input").eq(2).val();
    $.ajax({
      method: "POST",
      url: "/signup",
      contentType: "application/json;charset='utf-8'",
      data: JSON.stringify(signup_info)
    }).done(function(response_body) {
      // 注册成功则切换至登录页面并自动补全用户名和密码
      if (response_body !== "null") {
	console.log(response_body);
	$("a.signin").trigger("click");
      }
    });
  });
});
