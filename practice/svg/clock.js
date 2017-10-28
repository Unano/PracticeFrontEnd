/**
 * Created by LuoJing on 2017/9/14.
 */

window.onload = updateTime;

function updateTime() {
    var now = new Date();
    var min = now.getMinutes();
    var hour = (now.getHours() % 12) + min/60;
    var minangle = min * 6;
    var hourangle = hour * 30;

    var minhand = document.getElementById("minutehand");
    var hourhand = document.getElementById("hourhand");

    minhand.setAttribute("transform", "rotate(" + minangle + ",50,50)");
    hourhand.setAttribute("transform", "rotate(" + hourangle + ",50,50)");

    setInterval(updateTime, 60000);
}