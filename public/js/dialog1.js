/**
* width, height表示弹窗的宽高
* title表示弹窗的标题
* html为一个字符串时表示一个html的路径，为一个数组时表示纯文本
* btns为一个对象，格式为{btn1: func1; brn2: func2}，表示按钮以及按钮对应的方程
* mask为一个布尔值，为true时表示创建一个遮罩层， 为false时表示不创建遮罩层
* move 为一个布尔值，为true时表示窗口可移动，为false表示窗口不可移动
*/
window.onload = main;
function main(){
    var w = 200,
        h = 200,
        title = "测试标题测试标题",
        // s = "内容部分：你已经支付成功！试试很多字的情况试试很多字的情况试试很多字的情况试试很多字的情况"
        //        +"内容部分：你已经支付成功！试试很多字的情况试试很多字的情况试试很多字的情况试试很多字的情况",
        // html = [s];
        html = "../../login/login.html",
        // btns = {
        //     "按钮1": function(){ console.log("这是按钮1"); },
        //     "按钮2": function(){ console.log("这是按钮2");}
        // },
        btns = {},
        mask = "true";

    popover(w, h, title, html, btns, mask );
}
function popover(width, height, title, html, btns, mask, move){
//设置的宽高过大时默认为视口的宽高
    var ws = getViewPortSize();
    var ww = ws.w, wh = ws.h;
    if(width > ww){
        width = ww;
    }
    if(height > wh){
        height = wh;
    }
//弹窗
    var pop_win = createEle("div");
    pop_win.style.cssText = "position: absolute; z-index: 1001;" +
                            "width: " + width + "px;" +
                            "height: " + height + "px;" +
                            "top: "+ (wh - height)/2 + "px;" +
                            "left: "+ (ww - width)/2 + "px;" +
                            "background-color: gray;" +
                            "border-radius: 10px;" ;
    apdChild(pop_win);
    //标题
    var tle = createEle("div");
    tle.className = "popw-title";
    tle.innerHTML = "<span>" + title + "</span><span style='position: absolute; right: 10px; cursor: pointer;' id='close'>X</span>";
    pop_win.appendChild(tle);
    var cls = document.getElementById("close");
    cls.onclick = function(){
        rmvChild(pop_win);
        rmvChild(msk);
    };
    //移动
    tle.onmousedown = function(){ //获取鼠标按下时的鼠标焦点坐标及窗口左上角的坐标
        var moveable = true;
        var mus_x = event.clientX,
            mus_y = event.clientY,
            win_x = parseInt(pop_win.style.left),
            win_y = parseInt(pop_win.style.top);
        console.log(mus_x, mus_y);
        tle.onmouseover = function(){ //根据鼠标移动时的鼠标来重新设置窗口左上角坐标
            if(moveable == true){
                var new_x = win_x + event.clientX - mus_x,
                    new_y = win_y + event.clientY - mus_y;
                var jug = new_x > 0 && new_y > 0 && (new_x + width < ww )&& (new_y + height < wh);
                if(jug){
                    pop_win.style.left = new_x + "px";
                    pop_win.style.top = new_y + "px";
                }
            }
        };
        tle.onmouseup = function(){ //鼠标移出标题部分时就不能移动了
            moveable = false;
        };
    };

    //内容部分
    var cnt = createEle("div"),
        cntw = width - 4,
        cnth = height - 70;

    if(isArray(html)) {
        var cntp = createEle("p");
        cntp.innerHTML = html[0];
        //将元素的行高设置为包含它的块级元素的高度，只有单行文本时有用
        // cntp.style.cssText = "display: inline-block;line-height:" +(height - 70) +"px; margin: 0;";
        //文本很多时，将包含它的块级元素的display设置为table,模仿表单元素来设置
        cntp.style.cssText = "display: table-cell;vertical-align:middle;padding: 5px;overflow: auto;";
        cnt.appendChild(cntp);
    }
    if(typeof html == "string"){
        var cnti = createEle("iframe");
        cnti.src = html;
        //直接使用cnti.style.cssText来设置iframe的样式失败了
        //cnti.style.cssText = "width: " + cntw + "px" +
        //                     "height: " + cnth + "px;";
        cnti.setAttribute("scrolling", "no");
        cnti.setAttribute("frameborder", 0);
        cnti.style.width = cntw + "px";
        cnti.style.height = cnth + "px";
        cnti.style.overflow = "auto";

        cnt.appendChild(cnti);
    }
    cnt.className = "popw-cnt";
    cnt.style.cssText = "width: " + cntw +"px;"+
                        "height: " + cnth + "px;";
    pop_win.appendChild(cnt);
    //按钮部分
    var btons = createEle("div");
    btons.style.cssText = "height:40px; margin-left: " + width/2.7 + "px;display: table;";
    pop_win.appendChild(btons);
    //按钮的个数是不定的，如果要居中首先得知道所有按钮加起来占的宽度。这里只以两个按钮为标准实现居中
    var buttons = [], i = 0;
    for(var name in btns){
        buttons[i] = createEle("div");
        buttons[i].className = "popw-btn";
        buttons[i].innerHTML = "<span class='btn_cnt'>" + name + "</span>";
        (function(i){
            buttons[i].onclick = btns[name]; //这里只能用“[]”的方式来访问属性的值，因为使用了属性名来作为按钮的内容，属性名所包含的的字符的格式不确定
        })(i); //使用立即调用函数的写法来保护变量i
        i++;
    }
    var btn_len = buttons.length;
    for(var n = 0; n < btn_len; n++){
        btons.appendChild(buttons[n]);
    }

//遮罩层
    if(mask === "true"){
        var msk = document.createElement("div");
        msk.style.cssText = "width: 100%; height: 100%;" +
                             "position: absolute; z-index: 1000;" +
                             "top: 0; right: 0;" +
                             "background-color: rgba(128, 128, 128, 0.1);";
        apdChild(msk);
    }


}
//查询窗口的视口尺寸
function getViewPortSize(w){
    var win = w || window;

    //除了IE8及更早的版本以外，其他浏览器都能用
    if(win.innerHTML != null){
        return {
          w: win.innerWidth,
          h: win.innerHeight
        };
    }
    //对标准模式下的IE（或任何浏览器）
    var d = win.document;
    if(document.compatMode == "CSS1Compat"){
        return{
            w: d.documentElement.clientWidth,
            h: d.documentElement.clientHeight
        };
    }
    //对怪异模式下的浏览器
    return {
        w: d.body.clientWidth,
        h: d.body.clientHeight
    };
}
//检查是否为元素
function isArray(arr){
    return Object.prototype.toString.call(arr).slice(8, -1) == "Array";
}
//创建元素
function createEle(name){
    return document.createElement(name);
}
//向body中添加元素
function apdChild(node){
   document.body.appendChild(node);
}
//向body中移除元素
function rmvChild(node){
    document.body.removeChild(node);
}
