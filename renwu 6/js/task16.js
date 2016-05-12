window.onload = function() {
	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {};
	console.log(aqiData);
	var table = document.getElementById('aqi-table');
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		var city = document.getElementById('aqi-city-input');
		var num = document.getElementById('aqi-value-input');
		
		var re_num = /^\d+$/; //判断是否为数字
		var re_city = /^[\u4e00-\u9fa5]+$/; //检测是否为汉字
		re_city.test(city.value) && re_num.test(num.value) ? aqiData[city.value] = num.value : alert('您输入的城市名称或空气指数为空或包含非法字符，请重新输入!');
		console.log(aqiData);		
	}
	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
        table.innerHTML='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';//初始化，防止重复渲染
		for (var attr in aqiData) {
			table.innerHTML+='<tr><td>'+attr+'</td><td>'+aqiData[attr]+'</td><td><button>删除</button></tr>';
		}
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
		addAqiData();
		renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(cityName) {
		// do sth.
		console.log('cityName'+cityName);

		delete aqiData[cityName];

		renderAqiList();
	}

	function init() {

		// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
		var btn = document.getElementById("add-btn");
		//console.log(btn);
		btn.addEventListener('click',addBtnHandle,false);
		

		table.addEventListener('click',function(ev){
		var ev=ev||window.event;
		var target=ev.target||ev.srcElement;
		// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
		//console.log(target.nodeName.toLowerCase()==='button');
		target.nodeName.toLowerCase()==='button'?delBtnHandle(target.parentNode.parentNode.firstChild.innerHTML):'';
		},false);
	}

	init();
}