// 方法一：
function myModule(){
	// 私有数据
	var msg = 'Wrysmile';
	// 操作数据的函数
	function doSomething(){
		console.log('doSomething()'+msg.toUpperCase());
	}
	function doOtherthing(){
		console.log('doOtherthing()'+msg.toLowerCase());
	}
	// 向外暴露对象（给外部使用方法）
	return {
		doSomething: doSomething,
		doOtherthing: doOtherthing
	}
}

// 方法二：
// 这里最上与最下填写的 window 是为了以后代码压缩使用
(function(window){
	// 私有数据
	var msg = 'Wrysmile';
	// 操作数据的函数
	function doSomething(){
		console.log('doSomething()'+msg.toUpperCase());
	}
	function doOtherthing(){
		console.log('doOtherthing()'+msg.toLowerCase());
	}
	window.myModule2 = {
		doSomething: doSomething,
		doOtherthing: doOtherthing
	}
})(window)