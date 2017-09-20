import $ from 'jquery';
import { Util } from '../lib/util.js'; //引入Util
var config = {
	baseUrl : "/bb",
	contentType: "application/json",
	dataType: "json",
	timeout: 1800000,
};
class API {
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
			data: dd.params,
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
					dd.error();
				}else{
					alert('服务器错误')
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

}
export default API;
