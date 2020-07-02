class Praise {
    constructor(data) {
        this.data = data;
        this.root = null;

    }
    init() {
        this.renderUI();
        this.addEventHandler();

    }
    renderUI() {
        // let move = this.data.data.map((item ,idx) =>`<dd class="${idx === 0 ? "move" : ""}">`).join("");
        let typeHtml = "";
        let liHtml = "";
        this.data.type.map((itema, idx) => {
            this.data.data.forEach((item) => {
                liHtml = item.map(ele => {
                    return `<li>
                                <div class="rec_l_box">
                                    <p class="pic">
                                        <img src=${ele.src} alt="">
                                    </p>
                                    <p class="name">
                                        <a href="#">
                                        ${ele.name}
                                        </a>
                                    </p>
                                    <p class="price">
                                        ${ele.price}
                                    </p>
                                    <p class="btn">
                                        <a href="#" class="inc"></a>
                                    </p>
                                </div>
                            </li>`;
                }).join("");
                typeHtml += ` <dl class="fa">
                            <dt><a href="#">${itema}</a></dt>
                            <dd class="${idx === 0 ? "move" : ""}">
                                <div class="rec_prc">
                                    <ul>
                                        ${liHtml}
                                    </ul>
                                </div>
                            </dd>
                        </dl>`;

            });
        });

        let html = `<div class="rec_box">
                        <div class="rec">
                            <div class="rec_l">
                            ${typeHtml}
                        </div>
                    </div>
                </div>`;
        this.root = $(html);
        this.root.appendTo(".praise");
    }
    addEventHandler() {
        $(".fa >dt").mouseenter(function () {
            // console.log(this);
            $(this).next().addClass("move");
            // console.log($(this).next());
            $(this).parent(".fa").siblings().children("dd").removeClass("move")
        })
        // $(".fa >dt >a").eq(1).html("好评如潮");
        $(".fa ").eq(1).css("display","none");
        $(".fa ").eq(2).css("display","none");

        // $(".fa >dt >a").eq(2).html("快乐生活");
        // $(".fa >dt >a").eq(3).html("牛奶水果");

    }
}
