import Vue from 'vue';
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import config from './config';
import qs from 'qs';
import { Util } from '../lib/util.js'; //引入Util
class API {
	commonUrl(){
		return config.baseURL;
	};
	ajaxPost(url, param, callback) {
		let that = this;
		this.postN(url, param).then(callback).catch(function(error) {
			that.errorHandle(error);
		});
	};
	//get请求
	getN(url, param) {
		config.url = url;
		config.data = {};
		config.params = {};
		if(param){
			config.params = param;
		}
		return axios.get(url, config); //使用get方式
	};
	//post请求
	postN(url, param) {
		config.url = url;
		config.params = {};
		config.data = {};
		config.data = param;
		return axios(config); //使用post方式
	};
	//上传图片
	postUp(url, param, callback, progress) {
		let allUrl = config.baseURL + url;
		let upconfig = {
			onUploadProgress: progress
		};
		return axios.post(allUrl, param, upconfig).then(callback); //使用post方式
	};

	//请求错误处理
	errorHandle(error) {
		if(error.response || error.message.indexOf("timeout") > -1) {
			//状态不在200和超时的处理
			Util.myAlert("服务器未响应")
		}
	};

}
export default API;
