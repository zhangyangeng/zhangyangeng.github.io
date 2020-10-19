//创建一个函数用来控制盒子移动动画
/*
 * 参数：
 *   1.元素名obj
 *   2.目标位置target
 *   3.速度speed
 *   4.属性attr
 *   5.回调函数callback
 */
/* var timer;
//注意：当timer定义在全局变量中时，两个元素调用时就会造成冲突，所以不能这样定义，应该使用元素.timer来定义 */
function move(obj, attr, target, speed, callback) {
	clearInterval(obj.timer);
	//自动判断speed正负值，减少用户计算过程。这里获取当前位置
	var current = parseInt(getStyle(obj, attr));
	if (current > target) {
		speed = -speed;
	}
	obj.timer = setInterval(function() {
		var oldValue = parseInt(getStyle(obj, attr));
		var newValue = oldValue + speed;
		//当speed为负值时向左移，界限为小于target；当speed为正值时向右移，界限为大于target
		if ((speed > 0 && newValue > target) || (speed < 0 && newValue < target)) {
			newValue = target;
		}
		obj.style[attr] = newValue + "px";
		if (newValue == target) {
			clearInterval(obj.timer);
			//当结束完此次动画后如果有回调函数就调用回调函数，如果没有则不执行
			callback && callback();
		}
	}, 50);
}
//创建一个函数用来获取元素的样式
function getStyle(obj, name) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}
