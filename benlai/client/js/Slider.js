class Slider {
    constructor(data) {
        this.data = data;
        this.slider = null;
        this.sliderBox = null;
        this.sliderControl = null;
        this.sliderNav = null;
        this.timer = null;
        this.index = 0;
        this.len = this.data.length;
        this.sliderBoxItemWidth = 1920;
    }
    init() {
        this.createUI(); //1、创建标签
        //    this.setSliderItemBackgroundColor(); //2、设置背景颜色
        this.autoPlayer(); //3、自动播放
        this.addEventHandlerWithSlider();
        this.addEventHandlerWithControl();
        this.addEventHandlerWithSliderNavItem();
    }
    autoPlayer() {
        /* 核心：开启定时器，计算位移并设置标签的left */
        /* 注意：考虑临界情况 */
        this.timer = setInterval(() => {
            this.next();
            this.selectSliderNavItem(this.index);
        }, 2000);
    }
    addEventHandlerWithSlider() {
        this.slider.mouseenter(() => {
            clearInterval(this.timer);
            this.sliderControl.css("display","block");
            this.sliderNav.css("display","block");
        });
        this.slider.mouseleave(() => {
            this.autoPlayer()
            this.sliderControl.css("display","none");
            this.sliderNav.css("display","none");
        });
    }
    addEventHandlerWithControl() {

        let self = this;
        /* 事件委托 */
        this.sliderControl.on("click", "span", function () {
            if (this.className == "prev") {
                self.prev();
            }
            if (this.className == "next") {
                self.next();
            }
            self.selectSliderNavItem(self.index);
        })
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        this.sliderBox.css("left", -(this.index * this.sliderBoxItemWidth) + "px");
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        this.sliderBox.css("left", -(this.index * this.sliderBoxItemWidth) + "px");
    }
    addEventHandlerWithSliderNavItem() {
        let self = this;
        //    let navItems = Array.from(this.sliderNav.children);
        //    navItems = this.sliderNav.children()
        this.sliderNav.children().each((idx, item) => {
            console.log("item", item, "idx", idx)
            item.onclick = function () {
                // console.log(this, idx);
                /* 当点击焦点的时候：(1) 设置当前标签的选中状态 (2) 切换显示对应的图片 */
                // navItems.forEach(item => item.classList.remove("active"));
                // this.classList.add("active");
                console.log("+++");
                self.selectSliderNavItem(idx);
                self.index = idx;
                //    self.sliderBox.style.left = -(self.index * self.sliderBoxItemWidth) + "px";
                self.sliderBox.css("left", -(self.index * self.sliderBoxItemWidth) + "px");
            }
        })
    }
    selectSliderNavItem(idx) {
        //    let navItems = Array.from(this.sliderNav.children);
        //    navItems.forEach(item => item.classList.remove("active"));
        //    navItems[idx].classList.add("active");
        this.sliderNav.children().eq(idx).addClass("active").siblings().removeClass("active");
    }
    createUI() {
        this.createSliderNav();
        this.createSliderBox();
        this.createSliderControl();

        this.slider = $("<div class='slider'></div>");
        // this.slider = $(".slider");
        this.slider.append(this.sliderBox);
        this.slider.append(this.sliderControl);
        this.slider.append(this.sliderNav);
        $("body").append(this.slider);
    }
    createSliderBox() {
        this.sliderBox = $("<ul class='slider-box'></ul>");
        this.sliderBox.html(this.data.map(item => `<li class="slider-box-item"><img src=${item}></li>`).join(""));
    }
    createSliderControl() {
        this.sliderControl = $("<div class='slider-control'></div>");
        this.sliderControl.html('<span class="prev">&lt;</span> <span class="next">&gt;</span>');
    }
    createSliderNav() {
        this.sliderNav = $("<ol class='slider-nav'></ol>");
        this.sliderNav.html(this.data.map((item, idx) => `<li class="slider-nav-item ${idx == 0 ? "active" : ""}">${idx + 1}</li>
                `).join(""));
    }
    setSliderItemBackgroundColor() {
        Array.from(this.sliderBox.children).forEach(item => item.style.background = this.getRandomColor())
    }
    getRandomColor() {
        let r = parseInt(Math.random() * 256);
        let g = parseInt(Math.random() * 256)
        let b = parseInt(Math.random() * 256)
        return `rgb(${r},${g},${b})`;
    }
}