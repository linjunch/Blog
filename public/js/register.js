$("#exampleInputEmail1").blur(function () {
    if($(this).val()===""){
        $(".tip-user").html("不能为空，请输入用户名");
        $(".tip-user").css({
            color:"red"
        })
    } else{
        $(".tip-user").html("下一步！");
        $(".tip-user").css({
            color:"lime"
        })
    }
});
$("#exampleInputEmail1").focus(function () {
    $(".tip-user").html("");
});

//==================================================
$("#exampleInputPassword1").blur(function () {
    if($(this).val()===""){
        $(".tip-psw").html("不能为空，请输入密码");
        $(".tip-psw").css({
            color:"red"
        })
    } else if($(this).val().length<8){
        $(".tip-psw").html("为了您的安全，请至少输入8位数");
        $(".tip-psw").css({
            color:"skyblue"
        })
    }else{
        $(".tip-psw").html("下一步！");
        $(".tip-psw").css({
            color:"lime"
        })
    }
});
$("#exampleInputPassword1").focus(function () {
    $(".tip-psw").html("");
});
//==================================================
$("#exampleInputPassword2").blur(function () {
    if($(this).val()===""){
        $(".tip-psw2").html("不能为空，请再次输入密码");
        $(".tip-psw2").css({
            color:"red"
        })
    } else if($(this).val()!==$("#exampleInputPassword1").val()){
        $(".tip-psw2").html("前后输入不一致，请重新输入");
        $(".tip-psw2").css({
            color:"red"
        })
    }else{
        $(".tip-psw2").html("下一步！");
        $(".tip-psw2").css({
            color:"lime"
        })
    }
});
$("#exampleInputPassword2").focus(function () {
    $(".tip-psw2").html("");
});
//==================================================
$("#personal").blur(function () {
    if($(this).val()===""){
        $(".tip-per").html("不能为空，请输入您的简介");
        $(".tip-per").css({
            color:"red"
        })
    }else{
        $(".tip-per").html("下一步！");
        $(".tip-per").css({
            color:"lime"
        })
    }
});
$("#personal").focus(function () {
    $(".tip-per").html("");
});
//==================================================
$(".myinfo").submit(function (e) {
    var flag = true;
    if($("#exampleInputEmail1").val()===""){
        $(".tip-user").html("不能为空，请输入用户名");
        $(".tip-user").css({
            color:"red"
        });
        flag = false;
    } else{
        $(".tip-user").html("下一步！");
        $(".tip-user").css({
            color:"lime"
        })
    }
    //================================================
    if($("#exampleInputPassword1").val()===""){
        $(".tip-psw").html("不能为空，请输入密码");
        $(".tip-psw").css({
            color:"red"
        });
        flag = false;
    } else if($("#exampleInputPassword1").val().length<8){
        $(".tip-psw").html("为了您的安全，请至少输入8位数");
        $(".tip-psw").css({
            color:"skyblue"
        });
        flag = false;
    }else{
        $(".tip-psw").html("下一步！");
        $(".tip-psw").css({
            color:"lime"
        })
    }
    //================================================
    if($("#exampleInputPassword2").val()===""){
        $(".tip-psw2").html("不能为空，请再次输入密码");
        $(".tip-psw2").css({
            color:"red"
        });
        flag = false;
    } else if($("#exampleInputPassword2").val()!==$("#exampleInputPassword1").val()){
        $(".tip-psw2").html("前后输入不一致，请重新输入");
        $(".tip-psw2").css({
            color:"red"
        });
        flag = false;
    }else{
        $(".tip-psw2").html("下一步！");
        $(".tip-psw2").css({
            color:"lime"
        })
    }
    //================================================
    if($("#personal").val()===""){
        $(".tip-per").html("不能为空，请输入您的简介");
        $(".tip-per").css({
            color:"red"
        });
        flag = false;
    }else{
        $(".tip-per").html("下一步！");
        $(".tip-per").css({
            color:"lime"
        })
    }
    if(flag){
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:8989/saveInfo',
            type: 'post',
            dataType: 'json',
            data: {
                user:$("#exampleInputEmail1").val(),
                psw:$("#exampleInputPassword1").val(),
                per:$("#personal").val()
            },
            success:function(res){
                if(res.ok===1){
                    alert("注册成功！");
                    location.href = "http://localhost:8989/login"
                }else if(res.ok===0){
                    $(".tip-user").html("用户名已存在！");
                    $(".tip-user").css({
                        color:"red"
                    })
                }
            }
        })
    }else{
        e.preventDefault();
    }
});
//==================================================
//==================================================

