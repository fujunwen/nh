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
    $("#rember").click(function () {
        let rember = $("#rember").is(":checked");
        if (rember) {
            $(".warn").css("display","block");
        } else {
            $(".warn").css("display","none");
        }

    })
    /* 获取登录按钮，添加事件 */
    $("#btn").click(function () {
        let phone = $.trim($("#phone-ID").val());
        console.log(phone);
        let pass = $.trim($("#password-ID").val());
        // `phone=${phone}&password=${md5(pass).slice(0, 15)};
        let password = md5(pass).slice(0,15);
        console.log(password);

        /* 先检查用户名和密码和是否勾选，都满足则发请求 */
        if (phone.length == 0) {
            alert("用户名不能为空");
            return
        }

        if (password.length == 0) {
            alert("密码不能为空");
            return;
        }

        /*if (!$("#protocol").is(":checked")) {
            alert("请阅读并同意用户协议");
            return;
        }*/
        $.ajax({
            url: "../../server/login.php",
            type: "post",
            data: { phone,password},
            dataType: "json",
        }).done(data => {
            // alert(data.msg);
            /* 如果 */
            console.log("++++");
            if (data.status == "success") {
                alert(data.data.msg);
                /* 跳转 */
                localStorage.setItem("user_id", data.data.userId);
                localStorage.setItem("user_name", data.data.username);
                location.href = "list.html";
            } else {
                alert(data.data.msg);
            }
        })

    })

})