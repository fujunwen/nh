class Give {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    init() {
        this.renderUI();
        this.addEventHandler();
    }
    renderUI() {
        let typeHtml = this.data.types.map((item, idx) => `<dd class=${idx === 0 ? "active" :" "}><a href="#">${item}</a> </dd>`).join("");
        let ulHtml = "";

        this.data.data.forEach((item, index) => {
            let liHtml = item.map(ele => {
                return `<li>
                            <div class="box">
                            <p class="pic"><img src=${ele.src} alt=""></p>
                            <p class="name"><a href="#">${ele.name}</a></p>
                            <p class="price">${ele.price}</p>
                            <p class="btn"><a href="#" class="inc"></a></p>
                            </div>
                        </li>`;

            }).join("");

            ulHtml += `<dd class="${index === 0 ? "current":""}" >
                            <ul>
                                ${liHtml}
                            </ul>
                        </dd>`;
        });



        let html = `<div class="high-box">
                        <div class="high-t">
                            <dl>
                            ${typeHtml}
                            </dl>
                        </div>
                        <div class="high-b">
                                ${ulHtml}
                        </div>
                    </div>`;


        this.root = $(html);
        this.root.appendTo(".give");
    }
    addEventHandler() {
        $(".high-t").children("dl").children("dd").mouseenter(function () {
            // console.log($(".high-t").children("dl").children("dd"));
            $(this).addClass("active").siblings().removeClass("active");
            let idx =$(this).index();
            // console.log(idx);
            $(".high-b").children("dd").eq(idx).addClass("current").siblings().removeClass("current");
        })
    }
}