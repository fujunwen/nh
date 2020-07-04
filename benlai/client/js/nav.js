$(() => {
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $(".userInfo").text(`${user_name}:欢迎您`);
        $(".status").children("a").text("注销");
    } else {
        $(".userInfo").text(`匿名用户:欢迎您请先 `);
        $(".status").children("a").text("登录");
    }

    $(".status").click(function() {
        if ($(this).children("a").text() == "登录") {
            location.href = "./login.html";
        } else {
            localStorage.removeItem("user_id")
            localStorage.removeItem("user_name");
            /* 重新加载 */
            window.location.reload();
        }
    })
    $(".tit_sort >dl >dt").mouseenter(function(){
        // console.log($(".tit_sort >dl >dt"))
        console.log($(this))
        $(this).next().css("display","block");
        $(this).parent("dl").siblings().children("dd").css("display","none");
    })
    $(".tit_sort").mouseleave(function(){
        $(this).children("dl").children("dd").css("display","none");
    })
})