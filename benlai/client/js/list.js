$(() => {
    /* 1、发送网络请求获取服务器端的数据 */
    getDataAndRenderUI("default");

    /* 获取总页码的数量 */
    getPageCount();

    function getPageCount() {
        $.ajax({
            type: "get",
            url: "../../server/getPageCount.php",
            success: function (response) {
                // console.log("页码", response);
                let pageStr = "";
                for (let i = 0; i < response; i++) {
                    pageStr += `<li class='p-class ${i == 0 ? "active" : ""}'><a href="javascript:void(0)">${i + 1}</a></li>`;
                }
                $(pageStr).insertBefore("#nextPage");
            }
        });
    }

    function getDataAndRenderUI(sort, page = 0) {
        $.ajax({
            url: "../../server/getList.php",
            data: {
                sort,
                page: page
            },
            dataType: "json",
        }).done(data => {
            let html = data.map(item => {
                return `
                <li class="item" data-id=${item.goods_id}>
                            <div class="item-box">
                                <img src=${item.src}>
                                <div class="price ">￥${item.price}</div>
                                <div class="title ">${item.name.slice(0, 12)}</div>
                                <div class="storeName ">${item.shopName}</div>
                            </div>
                            <div class="addCart"></div>
                        </li>
                `
            }).join("");
            $(".box-list").html(html);
        })

    }

    /* 2、加入购物车的点击事件 */
    $(".box-list").on("click", ".addCart", function () {
        // console.log("++")
        /* user_id user_name */
        let user_id = localStorage.getItem("user_id") || "";
        let user_name = localStorage.getItem("user_name") || "";
        let good_id = $(this).parent().attr("data-id");

        // console.log(user_id, user_name,good_id);
        if (user_id && user_name) {
            /* 发请求，执行添加到购物车 */
            $.ajax({
                url: "../../server/addCart.php",
                data: { user_id, good_id }
            }).done(data => {
                console.log("返回值:", data);
            })

        } else {
            /* 跳转去登录 */
            location.href = "./login.html"
        }
    })

    /* 3、点击按钮的时候加入购物车 */
    $("#cart").click(function () {
        location.href = "../html/cart.html";
    })


    /* 4、排序功能 */
    $(".sort >li").click(function () {

        /* 设置选中状态 */
        $(this).addClass("cur").siblings().removeClass("cur");
        // let sortType = $(this).attr("data-sort");
        let sortType = $(this).data().sort;
        // console.log("sortType", sortType);

        getDataAndRenderUI(sortType);

    })

    /* 5、分页功能 */
    $(".pagination").on("click", ".p-class", function (e) {

        /* 排除上一页和下一页的页面点击事件 */
        // if ($(this).parent()[0].id == "prevPage" || $(this).parent()[0].id == "nextPage") return;

        /* 设置选中状态的切换 */
        $(this).addClass("active").siblings().removeClass("active");
        let page = $(this).text() * 1 - 1;
        // console.log(page);
        getDataAndRenderUI($(".cur").data().sort, page)
    })


    /* 上一页和下一页的功能 */
    $("#prevPage,#nextPage").click(function () {

        /* 设置选中状态 */
        let page = $(".active").text() * 1 - 1;
        if (this.id == "prevPage") {
            page--;
        } else if (this.id == "nextPage") {
            page++;
        }

        $(".p-class").eq(page).addClass("active").siblings().removeClass("active")
        getDataAndRenderUI($(".cur").data().sort, page)
    })
})