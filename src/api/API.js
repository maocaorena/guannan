import $ from 'jquery';
import { Util } from '../lib/util.js'; //引入Util
var config = {
	baseUrl : "http://120.26.222.27:10003",//build
//	baseUrl : "/bb",//dev
	contentType: "application/json",
	dataType: "json",
	timeout: 1800000,
};

var socket = new Promise(function(resolve, reject){
	var socket = new SockJS('http://120.26.222.27:10004/endpointWisely'); //1连接SockJS的endpoint是“endpointWisely”，与后台代码中注册的endpoint要一样。
	var stompClient = Stomp.over(socket);//2创建STOMP协议的webSocket客户端。
	stompClient.connect({}, function(frame) {//3连接webSocket的服务端。
	    console.log('开始进行连接Connected: ' + frame);
	    resolve(stompClient)
	    //4通过stompClient.subscribe（）订阅服务器的目标是'/topic/getResponse'发送过来的地址，与@SendTo中的地址对应。
	//	        stompClient.subscribe('/infocurrentdata', function(respnose){
	//	            console.log('res',JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage));
	//	        });
	});
});

class API {
    createdGoEasy(){
    	return socket
//      const goEasy = new GoEasy({
//           appkey: 'BC-fe15f72d698248f6986042fc4549f238'
//      });
	}
	unsubscribe(txt){
		goEasy.unsubscribe ({
			channel: txt
		});
		return goEasy;
	}
	commonUrl (){
		return config.baseUrl;
	};
	/**
	* 获取数据ajax-get请求
	*/
	getN(dd){
		$.ajax({
			url: config.baseUrl + dd.url,
			type:"get",
			dataType: config.dataType,
			timeout: config.timeout,
			params: dd.params,
			success: dd.success,
			error:function(xhr,textstatus,thrown){

			}
		});
	};

	/**
	* 提交json数据的post请求
	*/
	postN(dd){
		$.ajax({
			url: config.baseUrl + dd.url,
			type:"post",
			dataType: config.dataType,
			data: dd.params,
			timeout: config.timeout,
			success: dd.success,
			error: function(xhr,status,error){
				if(dd.error){
					dd.error(error);
				}else{
					console.log('服务器错误')
				}
			}
		})
	};

	/**
	* 修改数据的ajax-put请求
	*/
	putN(dd){
		$.ajax({
			url: config.baseUrl + dd.url,
			type:"put",
			contentType: config.contentType,
			dataType: config.dataType,
			data: dd.params,
			timeout: config.timeout,
			success: dd.success,
			error:function(xhr,textstatus,thrown){

			}
		});
	};
	/**
	* 删除数据的ajax-delete请求
	*/
	delN(dd){
		$.ajax({
			url: config.baseUrl + dd.url,
			type:"delete",
			contentType: config.contentType,
			dataType: config.dataType,
			timeout: config.timeout,
			data: dd.params,
			success: dd.success,
			error:function(xhr,textstatus,thrown){

			}
		});
	};


    ajax(url, param, type, async) {
        return $.ajax({
            url: config.baseUrl+url,
            data: param || {},
            type: type || 'POST',
            async: async || false
        });

    };
    // 根据项目业务二次封装ajax方法
    handleAjax(url, param, type, async) {

        return this.ajax(url, param, type, async).then(function(res) {
            // 成功回调
            if (res.response.info.code == 100000) {
                return res.response.content; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
            } else {
                return $.Deferred().reject(res.response.info.msg); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
            }
        }, function(err) {
            // 失败回调
            // alert("网络异常，请稍后重试！")
        });
    };
}
export default API;
