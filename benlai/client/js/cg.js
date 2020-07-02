class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    init() {
        this.renderUI();
        this.addEventHandler();
    }
    renderUI() {
        let typeHtml = this.data.types.map((item, idx) => `<li class=${idx === 0 ? "active" : ""}>${item}</li>`).join("");
        let ulHtml = "";

        this.data.data.forEach((item, index) => {
            let liHtml = item.map(ele => {
                return `<li class="list-item">
                            <img src=${ele.src}>
                            <h3 class="title">${ele.title}</h3>
                            <p class="desc">精品商品</p>
                            <p class="price">
                                <span>${ele.price}</span>
                            </p>
                        </li>`;

            }).join("");

            ulHtml += `<ul class="list ${index == 0 ? "current" : ""}">${liHtml}</ul>`;
        });

        let html = `<div class="box">
                    <div class="box-header">
                        <h2 class="title">${this.data.title}</h2>
                        <ul class="box-header-list">${typeHtml}</ul>
                    </div>
                    <div class="box-content">
                        <div class="left">
                            <li><img src=${this.data.srcA} alt=""></li>
                            <li><img src=${this.data.srcB} alt=""></li>
                        </div>
                        <div class="right">${ulHtml}</div>
                    </div>
                </div>`;


        this.root = $(html);
        this.root.appendTo("body");
    }
    addEventHandler() {
        let self = this;
        this.root.find(".box-header-list").children("li").mouseenter(function () {
            /* 1、设置当前标签的选中状态(排它) */
            $(this).addClass("active").siblings().removeClass("active");
            let index = $(this).index();
            /* 2、设置让列表进行切换 */
            // console.log($(".list", self.root));
            $(".list", self.root).eq(index).addClass("current").siblings().removeClass("current");
        })
    }
}