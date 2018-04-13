/*
* @Author: Administrator
* @Date:   2018-03-31 09:07:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-11 16:37:03
*/
// var weather;
// $.ajax({
// 	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=吕梁",
// 	dataType:"jsonp",
// 	type:"get",
// 	success:function(obj){
// 		weather=obj.data.weather;
// 		console.log(weather);
// 	   // console.log(obj.data.weather.city_name);
// 	 	// console.log(weather.city_name);
// 	}
// })
var weather_city;
$.ajax({
  url:"https://www.toutiao.com/stream/widget/local_weather/city/",
  dataType:"jsonp",
  type:"get",
  success:function(obj){
    weather_city=obj.data;
    console.log(weather_city);
    renderCity(weather_city);
     // console.log(obj.data.weather.city_name);
  //    console.log(weather.city_name);
   }
})
// 渲染数据
function renderCity(weather_city){
	// 渲染城市
	for(var m in weather_city){
		console.log(m);
		var hot=document.createElement('div');
		hot.className="hot";
		var hot_city=document.querySelector('.hot_city');
		hot.innerHTML=m;
		hot_city.appendChild(hot);
	// 创建ul
	var city_box=document.createElement('ul');
	city_box.className="city_box";
	hot_city.appendChild(city_box);
	// 创建li元素
	for(var b in weather_city[m]){
		console.log(b);
		var hotbox1=document.createElement('li');
		hotbox1.className="hotbox1";
		hotbox1.innerHTML=b;
		city_box.appendChild(hotbox1);
	}
	
	}
}
function updata(weather){
	// 城市名称
	var city_name=document.querySelector(".city");
	city_name.innerHTML=weather.city_name;

	// 城市温度
	var current_temperature=document.querySelector(".temperature");
	current_temperature.innerHTML=weather.current_temperature+"°";

	// 天气情况
	var current_condition=document.querySelector(".condition");
	current_condition.innerHTML=weather.current_condition;

	// 今天最高温
	var dat_high_temperature=document.querySelector("#dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;

	// 今天最低温
	var dat_low_temperature=document.querySelector("#dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature+"°";

	// 今天天气状况
	var dat_condition=document.querySelector("#dat_condition");
	dat_condition.innerHTML=weather.dat_condition;

	// 今天图标
	var dat_weather_icon_id=document.querySelector(".today_bottom");
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;

	// 明天最高温 
	var tomorrow_high_temperature=document.querySelector("#tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;

	// 明天最低温
	var tomorrow_low_temperature=document.querySelector("#tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature+"°";

	// 明天天气状况
	var tomorrow_condition=document.querySelector("#tomorrow_condition");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;

	// 明天图标
    var tomorrow_weather_icon_id=document.querySelector(".tomorrow_bottom");
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
	// 24小时天气
	var str="";
	weather.hourly_forecast.forEach((item,index)=>{
			console.log(item,index);
			str=str+`
				<div class="now">
                    <h2 class="now_time">${item.hour}:00</h2>
                    <div class="now_icon" style="backgrund-image:url(img/${item.weather_icon_id}.png)"></div>
                    <h2 class="now_temp">${item.temperature}°</h2>
                </div>
                `
	})
	$(".wrap").html(str);
  //  // 今天24小时天气情况
  //  // 数组类型的对象
  //  for(var i in weather.hourly_forecast){
  //  	// 创建now元素
  //  	// 1、创建div
  //  	var now=document.createElement("div");
  //  	// 2、添加类名
  //  	now.className="now";
  //  	// 3、插入到页面中
  //  	var wrap=document.querySelector(".wrap");
  //  	wrap.appendChild(now);
  //  	// 创建时间元素
  //  	var h2=document.createElement("h2");
  //  	h2.className="now_time";
  //  	h2.innerHTML=weather.hourly_forecast[i].hour+":00";
  //  	now.appendChild(h2);
  //  	// 图片
 	// var now_icon=document.createElement('div');
  //  	now_icon.className="now_icon";
  //  	now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`;
  //  	now.appendChild(now_icon);
  //  	// 温度
  //  	var h2=document.createElement('h2');
  //  	h2.className='now_temp';
  //  	h2.innerHTML=weather.hourly_forecast[i].temperature+"°";
  //  	now.appendChild(h2);
   
  //  }
   // 近期天气情况
    var str3="";
	weather.forecast_list.forEach((item,index)=>{
			console.log(item,index);
			str3=str3+`
				<div class="con">
                     <div class="con_date">${item.date.slice(5, 7)}/${item.date.slice(8)}</div>
                    <div class="con_weaH">${item.condition}</div>
                    <div class="con_picH" style=background"backgrund-image:url(img/${item.weather_icon_id}.png)"></div>
                    <div class="con_high">${item.high_temperature}°</div>
                    <div class="con_low">${item.low_temperature}°</div>
                    <div class="con_picL" style=background"backgrund-image:url(img/${item.weather_icon_id}.png)"></div>
                    <div class="con_weaL"></div>
                    <div class="con_wind">${item.wind_direction}</div>
                    <div class="level">${item.wind_level}级</div>
                </div>
                `
	})
	$(".recent_wrap").html(str3);
//     for(var j in weather.forecast_list){
//     var con=document.createElement("div");
//    	con.className="con";
//    	var recent_wrap=document.querySelector(".recent_wrap");
//    	recent_wrap.appendChild(con);

//     // 日期
//     var con_date=document.createElement("div");
//     con_date.className="con_date";
//     // 截取日期2018-04-01:  
//     con_date.innerHTML=weather.forecast_list[j].date.slice(5, 7)+"/"+weather.forecast_list[j].date.slice(8,10);
//     con.appendChild(con_date);
    
    
//     // 天气状况
//     var con_weaH=document.createElement("div");
//     con_weaH.className="con_weaH";
//     con_weaH.innerHTML=weather.forecast_list[j].condition;
//     con.appendChild(con_weaH);

//     // 图标
//     var con_picH=document.createElement("div");
//     con_picH.className="con_picH";
//     con_picH.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png)`;
//     con.appendChild(con_picH);

//     // 最高温
//     var con_high=document.createElement("div");
//     con_high.className="con_high";
//     con_high.innerHTML=weather.forecast_list[j].high_temperature+"°";
//     con.appendChild(con_high);

//     // 最低温
//     var con_low=document.createElement("div");
//     con_low.className="con_low";
//     con_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
//     con.appendChild(con_low);

//     // 风向
//     var con_wind=document.createElement("div");
//     con_wind.className="con_wind";
//     con_wind.innerHTML=weather.forecast_list[j].wind_direction;
//     con.appendChild(con_wind);

//     // 风级
//     var level=document.createElement("div");
//     level.className="level";
//     level.innerHTML=weather.forecast_list[j].wind_level+"级";
//     con.appendChild(level);
// }
// 	渲染城市
// 	for(var m in weather_city){
// 		console.log(m);
// 		var hot=document.createElement('div');
// 		hot.className="hot";
// 		var hot_city=document.querySelector('.hot_city');
// 		hot.innerHTML=m;
// 		hot_city.appendChild(hot);
// 	// 创建ul
// 	var city_box=document.createElement('ul');
// 	city_box.className="city_box";
// 	hot_city.appendChild(city_box);
// 	// 创建li元素
// 	for(var b in weather_city[m]){
// 		console.log(b);
// 		var hotbox1=document.createElement('li');
// 		hotbox1.className="hotbox1";
// 		hotbox1.innerHTML=b;
// 		city_box.appendChild(hotbox1);
// 	}
	
// 	}

}

function AJAX(str){
	var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
	$.ajax({
		url:url1,
		dataType:"jsonp",
		type:'get',
		success:function(obj){
			var weather=obj.data.weather;
			console.log(weather);
			updata(weather);
			$('.location').css({"display":"none"});
			$('.hide').addClass('block');
		}
})
}

// 页面加载完成以后执行
window.onload=function(){
	// updata();

	$('.hotbox1').on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})

	$('.city').on('click',function(){
		$('.location').css({"display":"block"});
	})

// 输入框获取焦点，按钮内容变成搜索
	$('input').on('focus',function(){
		$('.btn').html("搜索");
	})

//操作按钮 
	var button=document.querySelector(".btn");
	button.onclick=function(){
		var text=button.innerText;
		console.log(text);
		if(text=='取消'){
			$(".location").css({'display':'none'});
		}
		else{
			var str1=document.querySelector("input").value;
			for(var i in weather_city){
				for(var j in weather_city[i]){
					if(str1==j){
						AJAX(str1);
						return;
					}
				}
			}
			alert("没有该城市");
		}

	}
}
