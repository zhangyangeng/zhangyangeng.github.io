/*
   功能说明:
   1. 点击向右(左)的图标, 平滑切换到下(上)一页
   2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
   3. 每隔3s自动滑动到下一页
   4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
   5. 切换页面时, 下面的圆点也同步更新
   6. 点击圆点图标切换到对应的页
   
   BUG:
   1. 快速点击的时候翻页不正常，图片会停在中间
		使用一个状态来标识是否正在翻页，如果在翻页直接返回
*/
$(function(){
	// 获取页面中的元素
	let $container = $('#container');
	let $list = $('#list');
	let $points = $('#pointsDiv>span');
	let $prev = $('#prev');
	let $next = $('#next');
	// 定义一些常量
	let PAGE_WIDTH = 600;			// 一张图片的宽度
	let TIME = 400;					// 翻页的总时间
	let ITEM_TIME = 20;				// 单元移动的间隔时间
	let imgCount = $points.length;	// 图片的总量
	let index = 0;					// 当前图片下标
	let moving = false;				// 标识是否正在翻页
	
	// 1. 点击向右(左)的图标, 平滑切换到下(上)一页
	$next.click(function(){
		// 平滑翻到下一页
		nextPage(true);
	})
	$prev.click(function(){
		// 平滑翻到上一页
		nextPage(false);
	})
	
	// 3. 每隔3s自动滑动到下一页
	let intervalId = setInterval(function(){
		nextPage(true);
	}, 3000);
	// 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
	$container.hover(function(){
		// 清除定时器
		clearInterval(intervalId);
	},function(){
		// 重新开启定时器
		intervalId = setInterval(function(){
			nextPage(true);
		}, 3000);
	})
	// 6. 点击圆点图标切换到对应的页
	$points.click(function(){
		// 目标页的下标
		let targetIndex = $(this).index();
		// 只有当点击的不是当前页的圆点时才进行翻页
		if(targetIndex != index){
			// 这里在nextPage函数中传入了数值，所以需要修改该函数的部分逻辑
			nextPage(targetIndex);
		}
	})
	
	// 点击切换页面的功能函数
	// 这里next可以传入一个布尔值，也可以传入一个数值
	function nextPage(next){
		/* 
		 * 总的偏移量：offset
		 * 翻页的总时间：TIME
		 * 单元移动的间隔时间：ITEM_TIME
		 * 单元移动的偏移量：itemOffset
		 * 启动循环定时器不断更新$list的left值，到达目标处停止
		 */
		// 判断是否正在翻页
		if(moving){
			return;
		}
		moving = true;
		let offset = 0;
		// 根据传入的next参数自动计算offset的值
		if(typeof next === 'boolean'){
			offset = next ? -PAGE_WIDTH : PAGE_WIDTH;
		}else{
			offset = -(next - index) * PAGE_WIDTH;
		}
		let itemOffset = offset/(TIME/ITEM_TIME);
		let currentLeft = $list.position().left;
		let targetLeft = currentLeft + offset;
		// 启动循环定时器不断更新$list的left值，到达目标处停止
		let intervalId = setInterval(function(){
			currentLeft += itemOffset;
			if(currentLeft === targetLeft){
				// 清除定时器
				clearInterval(intervalId);
				moving = false;
				// 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
				if(currentLeft === -(imgCount + 1) * PAGE_WIDTH){
					currentLeft = -PAGE_WIDTH;
				}else if(currentLeft === 0){
					currentLeft = -imgCount * PAGE_WIDTH;
				}
			}
			// 设置left
			$list.css ('left', currentLeft);
		}, ITEM_TIME);
		// 5. 切换页面时, 下面的圆点也同步更新
		updatePoints(next);
	}
	
	// 更新圆点的功能函数
	function updatePoints(next){
		// 计算出目标圆点的下标 targetIndex
		let targetIndex = 0;
		// 根据传入的next参数自动计算当前圆点的下标
		if(typeof next === 'boolean'){
			if(next){
				targetIndex = index + 1;
				if(targetIndex === imgCount){
					targetIndex = 0
				}
			}else{
				targetIndex = index + 1;
				if(targetIndex === -1){
					targetIndex = imgCount - 1;
				}
			}
		}else{
			targetIndex = next;
		}
		// 将当前index的<span>中的class移除
		$points.eq(index).removeClass('on');
		// 给目标圆点添加class='on'
		$points.eq(targetIndex).addClass('on');
		// 将index更新为targetIndex
		index = targetIndex;
	}
})