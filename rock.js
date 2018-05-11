/*
 * Rock Event 手机摇晃事件
 */

$(document).ready(function () {

    // 首先，定义一个摇动的阀值
    var SHAKE_THRESHOLD = 3000;
    // 定义一个变量保存上次更新的时间
    var last_update = 0;
    // 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
    var x;
    var y;
    var z;
    var last_x;
    var last_y;
    var last_z;

    function deviceMotionHandler(eventData) {
        // 获取含重力的加速度
        var acceleration = eventData.accelerationIncludingGravity;

        // 获取当前时间
        var curTime = new Date().getTime();
        var diffTime = curTime - last_update;
        // 固定时间段
        if (diffTime > 100) {
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                //在此处可以实现摇一摇之后所要进行的数据逻辑操作
                var force = Math.abs(x) + Math.abs(y) + Math.abs(z) - 9.81;
                $(document).trigger('rock', [force]);
				
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    }else{
        alert("您的手机不支持DeviceMotionEvent属性，请点击抽奖");
    }
	
	
});