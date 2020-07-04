$(() => {
    // $(".all_check").on("click",".shop", function () {
    //     console.log("-------111");

    $(document).on("click","label",function(){
        $(this).toggleClass("mark");
    } )
    // // });
    $(document).on("click", ".shop", function () {
        // console.log($(this).parent().parent().next().find(".mark").length);
        let mknum = $(this).parent().parent().next().find(".mark").length;
        // console.log($(this).parent().parent().next().children().children().children("label").length);
        let biptnum = $(this).parent().parent().next().children().children().children("label").length;
        // console.log(biptnum);
        if(mknum != biptnum){
            $(this).addClass("mark");
            $(this).parent().parent().next().find("input[type=checkbox]").next().addClass("mark");
        }else{
            $(this).removeClass("mark");
            $(this).parent().parent().next().find("input[type=checkbox]").next().removeClass("mark");
        }
    });

    $("#all").click(function () {
        $(this).toggleClass("mark");
        // console.log(document.querySelector(".cartMain").querySelectorAll("label").length);
        let iptnum = document.querySelector(".cartMain").querySelectorAll("label").length;

        if ($(".mark").length == iptnum) {
            $(this).next().removeClass("mark");
            $(".cartBox").find("input[type=checkbox]").next().removeClass("mark");
        }else{
            $(this).next().addClass("mark");
            $(".cartBox").find("input[type=checkbox]").next().addClass("mark");
        }

        // if (!$(this).next().css) {
        //     $(".cartBox").find("input[type=checkbox]").next().addClass("mark");
        // }
        computedTotal();
    });

    /* 封装方法计算商品的总数和总价 */
    function computedTotal() {
        // let flag = $(".order_item").find(".son_check").next().hasClass("mark");
        let ele = $(".order_item").filter(function () {
            return $(".son_check", this).next().hasClass("mark") == true;
        })

        /* 计算数量 */
        let total = 0;
        let totalPrice = 0;
        ele.each(function (index, item) {
            // console.log(index, item, $(item).find(".sum").val(), $(item).find(".sum_price").text().slice(1));
            total += $(item).find(".sum").val() * 1;
            totalPrice += $(item).find(".sum_price").text().slice(1) * 1;
        })

        $(".piece_num").text(total);
        $(".total_text").text("￥" + totalPrice.toFixed(2));
    }

})