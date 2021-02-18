var onmessage = function(event){
	// 不能用函数声明
	// 通过event.data获得发送来的数据
	var number = event.data;
	console.log("分线程从主线程接收数据："+number);
	var result = fibonacci(number);
	// 将获取到的数据发送回主线程
	postMessage(result);
	console.log("分线程向主线程发送数据："+result);
}

// 斐波那契数列求法
function fibonacci(n) {
	if (n > 1) {
		return n <= 3 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
	} else {
		return 0;
	}
}
