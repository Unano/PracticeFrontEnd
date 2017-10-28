/**
 * Created by LuoJing on 2017/8/29.
 */
window.onload = main;
function main(){
    var submit_btn = document.getElementById("submit");
    submit_btn.onclick = loading;
};
function loading(){
    var img_div = document.createElement("div");
    img_div.className = "loading-img";
    img_div.innerHTML = "<img src='../../../img/loading.gif'/>";
    document.body.appendChild(img_div);

}