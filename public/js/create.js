//判断发布信息是否为空==================================================
$("#exampleInputEmail1").blur(function () {
    if($(this).val()===""){
        $(".tip-title").html("标题不能为空！");
        $(".tip-title").css({
            color:"red"
        });
    }
});
$("#exampleInputEmail1").focus(function () {
    if($(this).val()===""){
        $(".tip-title").html("");
    }
});
$("#personal").blur(function () {
    if($(this).val()===""){
        $(".tip-text").html("内容不能为空！");
        $(".tip-text").css({
            color:"red"
        });
    }
});
$("#personal").focus(function () {
    if($(this).val()===""){
        $(".tip-text").html("");
    }
});
$(".quit").click(function (e) {
    if(!confirm("确定退出登录？")){
        e.preventDefault();
    }
});

//获取当前网址结尾k:v信息===========================================
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
var n = parseInt(getQueryString("n"))>1?parseInt(getQueryString("n")):1;
//发布博客===========================================================
$(".tweet").click(function (e) {
    e.preventDefault();
    var flag = true;
    if($("#exampleInputEmail1").val()===""){
        $(".tip-title").html("标题不能为空！");
        $(".tip-title").css({
            color:"red"
        });
        flag = false;
    }

    if($("#personal").val()===""){
        $(".tip-text").html("内容不能为空！");
        $(".tip-text").css({
            color:"red"
        });
        flag = false;
    }


    if(flag){
        var date = new Date();
        if((date.getMonth()+1)<10){
            var month = '0'+(date.getMonth()+1)
        }
        else{
            var month = (date.getMonth()+1)
        }
        if(date.getDay()<10){
            var day = '0'+date.getDate();
        }
        else{
            var day = date.getDate()
        }
        if(date.getHours()<10){
            var hour = '0'+date.getHours();
        }
        else{
            var hour = date.getHours()
        }
        if(date.getMinutes()<10){
            var minute = '0'+date.getMinutes();
        }
        else{
            var minute = date.getMinutes()
        }
        if(date.getSeconds()<10){
            var second = '0'+date.getSeconds();
        }
        else{
            var second = date.getSeconds();
        }
        var str = date.getFullYear() + '/' + month + '/' + day + '-' + hour + ':' + minute +':'+second;
        var tag=`<li class="tt">
		<p class="tt-id">0</p>
		<p class="tt-uesr">${$(".user").html()}</p>
		<p class="tt-time">${str} form 见面不爽就锤死对面的 锤子手机</p>
		<h3 class="tt-title">${$("#exampleInputEmail1").val()}</h3>
		<p class="tt-blog">${$("#personal").val()}</p>
		<p class="tt-color"></p>
		<div class="operate clearfix">
			<span onclick="up(this)" class="a fl">
				<span class="glyphicon glyphicon-thumbs-up"></span>
				(<span class="tt-up">0</span>)
			</span>
			<span onclick="comment(this)" class="b fr">
				<span class="glyphicon glyphicon-comment
"></span>(<span class="tt-cmt">0</span>)</span></div>
		<div class="cmt">
			<input type="text" class="form-control w80 cmt-ipt"  placeholder="评论">
			<button type="submit" class="btn btn-primary w20 fr cmt-btn">评论</button>
			<ul class="cmt-list list-unstyled">
			</ul>
		</div>
	</li>`;
        var title = $("#exampleInputEmail1").val();
        $("#exampleInputEmail1").val("");
        var blog = $("#personal").val();
        $("#personal").val("");
        $("ul.myinfo").prepend(tag);
        if($(".tt").length>n*5){
            $(".tt").eq(length-1).remove();
        }
        $.ajax({
            url: 'http://localhost:8989/tweet',
            type: 'post',
            dataType: 'json',
            data: {
                user:$(".user").html(),
                title:title,
                blog:blog,
                time:str
            },
            success:function(res){
                $("ul.myinfo .tt-id").eq(0).html(res.id);
                console.log("发布成功！")
            }
        })
    }
});
//加载更多=========================================================
$(".more").click(function () {
    n++;
    $(".more").hide(0);
    $(".loading").show(0);
    $.ajax({
        url:"http://localhost:8989/more",
        type: 'post',
        dataType: 'json',
        data: {
            n:n,
        },
        success(res){
            for (var i = 0;i<res.tweet.length;i++){
                var tag2 = "";
                for (var j = 0; j < res.tweet[res.tweet.length - i - 1].comment.length;j++){
                    tag2 += `<li class="clearfix">
					<b class="cmt-user">${res.tweet[res.tweet.length-i-1].comment[res.tweet[res.tweet.length - i - 1].comment.length-j-1].cmter }:</b>
					<span class="cmt-txt">${res.tweet[res.tweet.length-i-1].comment[res.tweet[res.tweet.length - i - 1].comment.length-j-1].cmt }</span>
					<span class="cmt-time fr">${res.tweet[res.tweet.length-i-1].comment[res.tweet[res.tweet.length - i - 1].comment.length-j-1].time }</span>
				</li>`
                }
                var tag = `<li class="tt">
<p class="tt-id">${res.tweet[res.tweet.length-i-1]._id}</p>
            <p class="tt-uesr">${res.tweet[res.tweet.length-i-1].user}</p>   
            <p class="tt-time">${res.tweet[res.tweet.length-i-1].time} form 见面不爽就锤死对面的 锤子手机</p> 
            <h3 class="tt-title">${res.tweet[res.tweet.length-i-1].title}</h3>
            <p class="tt-blog">${res.tweet[res.tweet.length-i-1].blog}</p>
            <p class="tt-color">${res.tweet[res.tweet.length-i-1].color}</p>
            <div class="operate clearfix">
            <span onclick="up(this)" class="a fl"><span class="glyphicon glyphicon-thumbs-up"></span> (<span class="tt-up">${res.tweet[res.tweet.length-i-1].praise.length }</span>)</span>
            <span onclick="comment(this)" class="b fr">
            <span class="glyphicon glyphicon-comment"></span> (<span class="tt-cmt">${res.tweet[res.tweet.length-i-1].comment.length}</span>)</span>    
</div>
<div class="cmt">
			<input type="text" class="form-control w80 cmt-ipt"  placeholder="评论">
			<button type="submit" class="btn btn-primary w20 fr cmt-btn">评论</button>
			<ul class="cmt-list list-unstyled">
			${tag2}
</ul>
		</div>
		</li>`;
                $("ul.myinfo").append(tag);
            }
            crt();
            $(".loading").hide(0);
            $(".more").show(0);
            if(!res.more){
                $(".more").css("display","none");
                $(".newAll").css("display","block");
            }
        }
    })
});
//点赞事件=========================================================
function up(a) {
    var hasPraise = 0;
    var praiseNum = parseInt($(a).children(".tt-up").html());
    if($(a).hasClass("current")){
        $(a).children(".tt-up").html(praiseNum-1);
        hasPraise = 1;
    }else{
        $(a).children(".tt-up").html(praiseNum+1);
        hasPraise = 0;
    }
    $(a).toggleClass("current");
    $.ajax({
        url:"http://localhost:8989/up",
        type: 'post',
        dataType: 'json',
        data: {
            id:$(a).parent().siblings(".tt-id").html(),
            user:$(".user").html(),
            hasPraise:hasPraise
        },
        success:function (res) {
            console.log(res.ok)
        }
    })
}
//打开或隐藏评论窗口================================================
function comment(b) {
    if($(b).hasClass("current")){
        $(b).parent().siblings(".cmt").hide(0);
    }else{
        $(b).parent().siblings(".cmt").show(0);
    }
    $(b).toggleClass("current");
}


//判断当前用户是否评论过哪些微博=====================================
function crt() {
    for(var i = 0;i<$(".tt").length;i++){
        if($(".tt").eq(i).children(".tt-color").html()==="org"){
            $(".tt").eq(i).children(".operate").children(".a").addClass("current");
        }
    }
}
//评论区发布评论事件================================================
$("ul.myinfo").delegate(".cmt-btn","click",function (e) {
    e.preventDefault();
    var point = $(this);
    if($(this).siblings(".cmt-ipt").val()===""){
        alert("请输入评论内容！")
    }else{
        var date = new Date();
        if((date.getMonth()+1)<10){
            var month = '0'+(date.getMonth()+1)
        }
        else{
            var month = (date.getMonth()+1)
        }
        //日格式
        if(date.getDay()<10){
            var day = '0'+date.getDate();
        }
        else{
            var day = date.getDate()
        }
        //时格式
        if(date.getHours()<10){
            var hour = '0'+date.getHours();
        }
        else{
            var hour = date.getHours()
        }
        //分钟格式
        if(date.getMinutes()<10){
            var minute = '0'+date.getMinutes();
        }
        else{
            var minute = date.getMinutes()
        }
        //秒钟格式
        if(date.getSeconds()<10){
            var second = '0'+date.getSeconds();
        }
        else{
            var second = date.getSeconds();
        }
        var str = date.getFullYear() + '/' + month + '/' + day + '-' + hour + ':' + minute +':'+second;
        var tag = `<li class="clearfix">
					<b class="cmt-user">${$(".user").html()}:</b><span class="cmt-txt">${$(this).siblings(".cmt-ipt").val()}</span><span class="cmt-time fr">${str}</span>
				</li>`;
        $(this).siblings(".cmt-list").prepend(tag);
        var cmtNum = parseInt($(this).parent().siblings(".operate").children(".b").children(".tt-cmt").html());
        $.ajax({
            url:"http://localhost:8989/cmt",
            type: 'post',
            dataType: 'json',
            data: {
                id:$(this).parent().siblings(".tt-id").html(),
                user:$(".user").html(),
                cmt:$(this).siblings(".cmt-ipt").val(),
                time:str
            },
            success:function (res) {
                point.siblings(".cmt-ipt").val("");
                point.parent().siblings(".operate").children(".b").children(".tt-cmt").html(++cmtNum);
                console.log(res.ok)
            }
        });
    }
});
crt();