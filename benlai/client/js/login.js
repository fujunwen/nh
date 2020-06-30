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
        let password = $.trim($("#password-ID").val());

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
            type: "post",
            url: "../../server/login.php",
            dataType: "json",
            data: `phone=${phone}&password=${md5(password).slice(0, 15)}`
        }).done(data => {
            // alert(data.msg);
            /* 如果 */
            if (data.status == "success") {
                alert(data.msg);
                /* 跳转 */
                location.href = "../html/index.html";
            } else {
                alert(data.msg);
            }
        })

    })

})