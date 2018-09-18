window.onload = initForm;

var g_years = document.getElementById("years");
var g_months = document.getElementById("months");
var g_days = document.getElementById("days");
var g_form = document.forms[0];

function initForm(){
    //出生日期
    g_months.selectedIndex = 0;
    g_months.onchange = populateDays;
    g_days.onchange = getBirthday;
    //表单验证
    g_form.onsubmit = validForm;

}
    function populateDays(){
    var year =  g_years.value;
    var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(year%4==0 && year%100!=0){
        monthDays[1] = 29;
    }
    var monthStr = this.options[this.selectedIndex].value;
    if(monthStr!=""){
        var theMonth = parseInt(monthStr);
        for(var i=0;i<monthDays[theMonth];i++){
            g_days.options[i] = new Option(i+1);
        }
    }
}
function getBirthday(){
    var month = parseInt(getTime("months"))+1;
    var birthday = getTime("years")+"/"+month+"/"+getTime("days");
    if(!g_years.value||!g_months.value||!g_days.value){
        alert("请将出生日期填写完整！");
    }else{
        alert("你的生日是："+birthday);
    }
    function getTime(type){
        var type_value = document.getElementById(type).value;
        return type_value;
    }
}

function validForm(){


}
