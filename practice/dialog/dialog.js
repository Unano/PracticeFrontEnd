/**
 * Created by LuoJing on 2017/8/24.
 */

window.onload = main;
function main(){
    var str = "<p style='width:200px;margin:50px auto;'>您已成功支付100元！！</p>";
    showWindow("我的提示框",str,400,300,true,["地区",func1,"矿种",func2]);
}

function func1(){
    console.log("方程1");
}
function func2(){
    console.log("方程2");
}
//弹出窗口，包含的参数有标题，html，宽度，高度，是否为对话框，按钮（格式为["按钮1",func1,"按钮2",func2]的数组）
function showWindow(title,html,width,height,modal,buttons){
    //避免窗体过小
    if(width<300){
        width = 300;
    }
    if(height<200){
        height = 200;
    }

    var w,h;

    //设置可见区域的宽度和高度
    var cw = document.body.clientWidth;
    // var ch = document.body.clientHeight;
    //获取到的高度为0，通过网上搜索了解到目前已经开始使用document.documentElement.clientWidth
    var ch = document.documentElement.clientHeight;

    console.log(cw,"可见区域宽度",ch,'可见区域高度');

    //设置正文的宽度和高度
    var sw = document.body.scrollWidth;
    var sh = document.body.scrollHeight;
    console.log(sw,"正文宽度",sh,"正文高度");


    w = cw>sw ? cw : sw;
    h = ch>sh ? ch : sh;
    //避免窗体过大
    if(width > w){
        width = w;
    }
    if(height > h){
        height = h;
    }
  //如果modal为true，也就是模式是对话框的话，就需要创建一层透明的掩膜
    if(modal){
        var mask = createEle('div');
        mask.style.cssText = "position:absolute;left:0;" +
            "top:0;background:rgba(183,183,183,0.5);" +
            "z-index:10000;width:"+ w +"px;height:"+ h +"px";
        appdChild(mask);
    }
 //主窗体
    var win = createEle("div");
    win.style.cssText = "position:absolute;left:" +(cw- width)/2+
            "px;top:"+(ch-height)/2 + "px;background:#f0f0f0;z-index:10001;"+
            "width:" + width + "px;height:" + height + "px;border:solid 2px #afccfe;"+
            "border-radius:10px;";
    //标题栏
    var tBar = createEle("div");
    tBar.style.cssText = "margin:0;width:" + width + "px;height:35px;background-color:rgb(175, 204, 254);"+
            "cursor:move;border-radius:8px 8px 0 0;";
    //标题栏中的文字部分
    var titleCon = createEle("div");
    titleCon.style.cssText = "float:left;margin:3px;line-height:1.5em;";
    titleCon.innerHTML = title;//fireFox不支持innerText，所以这里用innerHTML
    tBar.appendChild(titleCon);
    //标题栏中的“关闭按钮"
    var closeCon = createEle("div");
    closeCon.style.cssText = "float:right;width:20px;margin:3px;cursor:pointer;";
    closeCon.innerHTML = "X";
    tBar.appendChild(closeCon);
    win.appendChild(tBar);
    //窗体的内容部分，CSS中的overflow使得当内容大小超过此范围时，会出现滚动条
    var htmlCon = createEle("div");
    htmlCon.style.cssText = "text-align:center;width:" + width + "px;height:" +
        (height - 70) + "px;overflow:auto;";
    htmlCon.innerHTML = html;
    win.appendChild(htmlCon);
    //窗体底部的按钮部分
    var btnCon = createEle("div");
    btnCon.style.cssText = "width:" + width +"px;height:35px;text-align:20px;"+
            "background-color:rgb(175, 204, 254);text-align:center;";
    //如果参数是数组的话。就会创建自定义按钮
    // if(isArray(buttons)){
    //     var length = buttons.length;
    //     if(length > 0){
    //         if(length%2 == 0){
    //             for(var i=0;i<length;i=i+2){
    //                 //按钮数组
    //                 var btn = createEle("button");
    //                 btn.innerHTML = buttons[i];
    //                 //btn.value = buttons[i];
    //                 // btn.onclick = buttons[i+1];
    //                 btnCon.appendChild(btn);
    //                 //用户填充按钮之间的空白
    //                 var nbsp = createEle("label");
    //                 nbsp.innerHTML =" ";
    //                 btnCon.appendChild(nbsp);
    //             }
    //         }
    //     }
    // }
    //这是默认的关闭按钮
    var bottom_btn = createEle("button");
    bottom_btn.style.cssText = "display: inline-block; margin: 5px;border-radius:5px;" +
        "border:1px solid white;width:50px;height:25px;background-color:white;";
    //bottom_btn.setAttribute("value","关闭");
    bottom_btn.innerHTML = "关闭";
    //btn.value = "关闭";
    btnCon.appendChild(bottom_btn);
    win.appendChild(btnCon);
    appdChild(win);
    /*************拖动窗体事件**************/
    //鼠标停留的X坐标
    var mouseX = 0;
    //鼠标停留的Y坐标
    var mouseY = 0;
    //窗体到body顶部的距离
    var toTop = 0;
    //窗体到body左边的距离
    var toLeft = 0;
    //判断窗体是否可以移动
    var moveable = false;
    //标题栏的按下鼠标事件
    tBar.onmousedown = function(){
        var eve = getEvent();
        moveable = true;
        mouseX = eve.clientX;
        mouseY = eve.clientY;
        toTop = parseInt(win.style.top);
        toLeft = parseInt(win.style.left);
        //移动鼠标事件
        tBar.onmousemove = function(){
            if(moveable){
                var eve = getEvent();
                var x = toLeft + eve.clientX - mouseX;
                var y = toTop + eve.clientY - mouseY;
                if(x>0&&(x+width<w)&&y>0&&(y+height<h)){
                    win.style.left = x + "px";
                    win.style.top = y + "px";
                }
            }
        };
        //放下鼠标事件，注意这里是document而不是tBar
        document.onmouseup = function(){
            moveable = false;
        };
    };
    //获取浏览器事件的方法，兼容IE和fireFox
    function getEvent(){
        return window.event || arguments.callee.caller.arguments[0];
    }
    //顶部的标题栏和底部的按钮栏中的“关闭按钮”的关闭事件
    bottom_btn.onclick = closeCon.onclick = function(){
        removeChild(win);
        removeChild(mask);
    }

}

//判断是否为数组
function isArray(arr){
    return arr && arr.length == "number" && typeof arr.splice == "function";
}
//创建元素
function createEle(tag_name){
    return document.createElement(tag_name);
}
//在body中添加子元素
function appdChild(ele_name){
    return document.body.appendChild(ele_name);
}
//在body中移除子元素
function removeChild(ele_name){
    return document.body.removeChild(ele_name);
}