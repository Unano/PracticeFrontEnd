// addLoadEvent(turnPage);
// addLoadEvent(prepareGallery);
//用以上方式添加事件，发现只有后面调用的函数才起到了作用，按理说addLoadEvent函数已经将要执行的函数创建为一个队列了才是
window.onload = main;

function main(){
    turnPage();
    prepareGallery();
    document.body.onmousewheel = function(){
        console.log("aaa");
    }
}
//左右翻页
function turnPage(){
    var right_arrow = document.getElementById("big_right");
    var left_arrow = document.getElementById("big_left");
    var this_img = document.getElementById("placeholder");

    right_arrow.onclick = function(){
        var page = whichPage();
        if(!page[1]){
            alert("当前已是最后一页！");
            return false;
        }
        this_img.setAttribute("src",page[1]);
    };
    left_arrow.onclick = function(){
        var page = whichPage();
        if(!page[0]){
            alert("当前已是第一页！");
            return false;
        }
        this_img.setAttribute("src",page[0]);
    };
    function whichPage(){
        var gallery = document.getElementById("image_gallery");
        var links = gallery.getElementsByTagName("a");
        var next_src = "";
        var prev_src = "";
        for(var i=0;i<links.length;i++){
            if(this_img.getAttribute("src") == "../../img/pictures/placeholder.gif"){//直接使用this_img.src获取不到属性值
                next_src = links[0].href;
                // left_arrow.display = "none";
            }else if(this_img.src == links[i].href){
                if(i==0){
                    next_src = links[i+1].href;
                }else if(i>0 && i<links.length-1){
                    next_src = links[i+1].href;
                    prev_src = links[i-1].href;
                }else if(i==links.length-1){
                    prev_src = links[i-1].href;
                }
            }
        }
        return [prev_src,next_src];
    }
}



//展示图片
function prepareGallery(){
    if(!document.getElementById ||!document.getElementsByTagName){
        return false;
    }
    var gallery = document.getElementById("image_gallery");
    var links = gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick = function(){
            showPic(this);
            return false;
            // return !showPic(this);//使用这个语句时，在浏览器showPic(this)为true的情况下，页面也进行了跳转
       }
    }
}

function showPic(whichpic){
    var source = whichpic.href;
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    var text = whichpic.title;//或者使用getAttribute("title");
    // var description = document.getElementById("description");
    // description.firstChild.nodeValue = text;
}

//将页面需要加载的方法排列成一个队列
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof oldload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
           oldonload();
           func();
        }
    }
}
