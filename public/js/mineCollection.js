addLoadEvent(deleteCollect);

function deleteCollect(){
    var table_node = document.getElementById("novel_list");
    var dele_nodes = getElementsByClassName(table_node,"delete-collect");
    //单个删除
    for(var i=0;i<dele_nodes.length;i++) {
        dele_nodes[i].onclick = function(){
            var tbody_node = this.parentNode.parentNode.parentNode;
            tbody_node.removeChild(this.parentNode.parentNode);
        }
    }
    //全选和取消全选
    var check_all = document.getElementById("check_all");
    var checked = false;
    check_all.addEventListener("click",checkAll);

    function checkAll(){
        var checkNodes = getElementsByClassName(table_node,"check-box");
        if(checked == false){
            for(var i=0;i<checkNodes.length;i++){
                checkNodes[i].checked = "checked";
            }
            checked = true;
        }else{
            for(var j=0;j<checkNodes.length;j++){
                // checkNodes[i].removeAttribute("checked");//这是移除元素属性的方法，但是没有起作用
                checkNodes[j].checked = false;
            }
            checked = false;
        }
    }
    //批量删除
    var delete_many = document.getElementById("delete_many");
    delete_many.onclick = function(){
        var checkedNodes = [];
        var inputNodes = document.getElementsByTagName("input");
        for(var i=0;i<inputNodes.length;i++){
            var tbNode = inputNodes[i].parentNode.parentNode.parentNode;
            if(inputNodes[i].checked == true && tbNode.className.indexOf("head")==-1){//这里使用inputNodes[i].getAttribute("checked")无效了，难道是因为
                checkedNodes.push(inputNodes[i]);     //使用获取节点的方法获取到的节点数组已经不支持这些方法了吗？
            }
        }
        for(var j=0;j<checkedNodes.length;j++){
            var tNode = checkedNodes[j].parentNode.parentNode.parentNode;
            var delNodes = checkedNodes[j].parentNode.parentNode;
            tNode.removeChild(delNodes);
        }
    };
    //按浏览量排序
    var books= document.getElementsByClassName("tbody");
    var books_list = books[0].children, len = books_list.length;
    var pageviews = document.getElementById("pageviews");
    pageviews.onclick = function(){
/*      var aux_arr = [];
        for(var p = 0; p < len; p++){
            aux_arr[p] = books_list[p];
        }
*/
        var aux_arr = Array.prototype.slice.call(books_list, 0);
        aux_arr.sort(compare);
        console.log(aux_arr[1]);
        for(var q = 0; q < len; q++ ){
            books[0].appendChild(aux_arr[q]);
        }
    };
    //本来打算直接间接调用数组的sort()方法来进行排序的，但是并不起作用
    // var sorted = Array.prototype.sort.call(books_list, compare);
    function compare(tra, trb){
        var a = Number(tra.children[6].textContent);
        var b = Number(trb.children[6].textContent);
        return a - b;
    }
}


//通过类名获取元素
function getElementsByClassName(node,classname){
    if(node.getElementsByClassName){
        return node.getElementsByClassName(classname);
    }else{
        var results = [];
        var elems = node.getElementsByTagName("*");
        for(var i=0;i<elems.length;i++){
            if(elems[i].className.indexOf(classname) != -1){
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
//把在页面加载完成时执行的函数创建为一个队列
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
