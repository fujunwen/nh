$(() => {
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