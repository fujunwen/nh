$(() => {
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