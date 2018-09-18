addLoadEvent(arrowChange);
addLoadEvent(pictureDetails);
addLoadEvent(fmClk);
//轮播图
function arrowChange(){
    var list = document.getElementById("img_list");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    function animate(offset){
        var old_left = list.style.left; //JavaScript只能控制页面内的style（也就是写在HTML中的style的属性）
        var new_left = parseInt(old_left)+ offset;  //list.style.left获取的是字符串
        if(new_left > 0){
            new_left = -1200;
        }
        if(new_left<-1200){
            new_left = 0;
        }
        list.style.left = new_left + "px";
    }
    var buttons = document.getElementById("img_dots").getElementsByTagName("span");
    var index = 1;

    function buttonShow(){
        //每次将所有按钮的样式清空
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className = "on"){
                buttons[i].className = "";
            }
        }
        //然后在应该添加样式的按钮上加上样式
        buttons[index-1].className = "on";
    }
    prev.onclick = function(){
        index -= 1;
        if(index < 1){
            index = 3;
        }
        buttonShow();
        animate(600);
    };
    next.onclick = function(){
        index +=1;
        if(index > 3){
            index = 1;
        }
        buttonShow();
        animate(-600);
    };
    var timer;
    function play(){
        timer = setInterval(function(){
            next.onclick()
        },5000); //和setTimeout(func,time)方法只执行一次函数不同，setInterval方法会循环执行函数
    }
    play();
    function stop(){
        clearInterval(timer);
    }
    list.onmouseover = stop;
    list.onmouseout = play;

    for(var i=0;i<buttons.length;i++){
        //使用立即执行函数保护变量i
        (function(i){
            buttons[i].onclick = function(){
                var clickIndex = parseInt(this.getAttribute("index"));
                var offset = -600 * (clickIndex-1);
                list.style.left = offset + "px";
                index = clickIndex;
                buttonShow();
            }
        })(i);
    }
}
//跳转到图片详情
function pictureDetails(){
    var pictures = document.getElementById("pictures");
    var pic_div = getElementsByClassName(pictures,"picture-describe");
    for(var i=0;i<pic_div.length;i++){
        pic_div[i].onclick = function(){
            location.href = "picture.html ";
            console.log("aaa");
        }
    }
}
//搜索框模糊匹配
function fmClk(){
    var fm = document.getElementById("search");
    fm.onkeyup = fuzzMatch;
    //关闭按钮
    var fm_close = document.getElementById("fm_close");
    fm_close.onclick = function(){
        var ul = document.getElementsByClassName("fuzz-match")[0];
        ul.style.visibility = "hidden";
        event.preventDefault();
    };
}
function fuzzMatch(){
    var input, filter, ul, li, len, a, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("fuzz-match")[0];
    li = ul.getElementsByTagName("li");
    len = li.length;
    ul.style.visibility = "visible";
    for(i = 0; i < len - 1; i++){
        a = li[i].getElementsByTagName("a")[0];
        if(a.innerHTML.toUpperCase().indexOf(filter) !== -1){
            li[i].style.display = "";
        }
        else{
            li[i].style.display = "none";
        }
    }
}

function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload!= "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

function getElementsByClassName(node,classname){
    if(node.getElementsByClassName){
        return node.getElementsByClassName(classname);
    }else{
        var results = new Array();
        var elems = node.getElementsByTagName("*");
        for(var i=0;i<elms.length;i++){
            if(elems[i].className.indexOf(classname)!=-1){
                results.push(elems[i]);
            }
        }
        return results;
    }
}

