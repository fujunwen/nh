let lis = document.querySelector(".list15_sku").querySelectorAll("dl");
let arr = [];
lis.forEach(li => {
    let obj = {};
    obj.src = li.querySelector(".box").querySelector(".pic").querySelector("a").querySelector("img").src;
    obj.name = li.querySelector(".box").querySelector(".name").querySelector("a").innerHTML;
    obj.price = li.querySelector(".box").querySelector(".price").innerHTML;
    // obj.goodId = li.querySelector(".box").querySelector(".btn").getAttributeNames(".product");
    arr.push(obj);
})
JSON.stringify(arr);