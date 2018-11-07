$(".btn-primary").click(function () {
    $.ajax({
        url:"http://localhost:8989/check",
        type:"post",
        dataType: 'json',
        data: {
            user:$("#exampleInputEmail1").val(),
            psw:$("#exampleInputPassword1").val()
        },
        success:function (res) {
            if(res.check===0){
                $(".tip-user").html("用户名不存在或密码错误！");
                $(".tip-user").css({
                    color:"red"
                })
            }else if(res.check===1){
                alert("验证通过，正在跳转！");
                location.href = "http://localhost:8989/create";
            }
        }
    });
});