<template>
  <div id="clientList" class="wrapper">
    <div class="leftBlock">
      <div class="first-list type1" v-for="(item,index) of leftbars">
        <p class="first-item">
          <img class="leftIcon" src="../../assets/img/leftbar/icon_sheng.png" alt=""> {{item.province}}
        </p>
        <ul class="second-list">
          <router-link class="second-item" :class="{selected:$route.query.clientid==second.clientid}" :to="{path:'/clientManage/clientList',query:{clientid: second.clientid}}" tag="li" :key="second.clientid" v-for="(second,index2) of item.clientList">
            <img class="leftIcon" src="../../assets/img/leftbar/icon_gongsi.png" alt=""> {{second.clientname}}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="rightBlock">
      <div class="rightTabbar">
        <div class="rt-item rtItemSelect">
          客户列表
        </div>
        <div class="rt-handle">
          <div class="handle-item">
            <button type="button" name="button">搜索</button>
          </div>
          <div class="handle-item">
            <input type="text" name="" value="">
          </div>
          <div class="handle-item">
            <button type="button" name="button">批量删除</button>
          </div>
          <div class="handle-item">
            <button type="button" name="button" @click="add(1)">增加客户</button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="list-tit">
          <table class="list" border="1" cellspacing="0" cellpadding="0">
            <colgroup>
              <col width="4">
              <col width="4">
              <col width="7">
              <col width="7">
              <col width="11">
              <col width="17">
              <col width="11">
              <col width="9">
              <col width="9">
              <col width="9">
            </colgroup>
            <thead>
              <tr>
                <th>
                    <input type='checkbox' v-model='checked' v-on:change='checkedAll'>
                </th>
                <th>序号</th>
                <th>所在省份</th>
                <th>所在城市</th>
                <th>单位名称</th>
                <th>单位地址</th>
                <th>联系人</th>
                <th>电话</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="list-container" ref="list">
          <table class="list" border="1" cellspacing="0" cellpadding="0" :style="{width: width+'px'}">
            <colgroup>
              <col width="4">
              <col width="4">
              <col width="7">
              <col width="7">
              <col width="11">
              <col width="17">
              <col width="11">
              <col width="9">
              <col width="9">
              <col width="9">
            </colgroup>
            <tbody class="list-con">
              <tr v-if="!ifPage">
                <td colspan="10">暂无数据</td>
              </tr>
              <tr v-for="(item,index) of items" class="list-con-item">
                <td>
                    <input type="checkbox" name="checkboxinput" v-model='checkboxModel' :value="item.clientid">
                  
                </td>
                <td>
                  {{index}}
                </td>
                <td>
                  {{item.province}}
                </td>
                <td>{{item.city}}</td>
                <td>{{item.clientName}}</td>
                <td>{{item.address}}</td>
                <td>{{item.name}}</td>
                <td>{{item.phone}}</td>
                <td>--</td>
                <td>
                  <a href="javascript:;" @click="deleteData(item.clientid,2)" class="mode">删除</a>
                  <a href="javascript:;" class="mode">编辑</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="downpage" v-if="ifPage">
        <pages-v :pageNum="pageNum" :pageSize="pageSize" :total="total" v-on:pagechange="pagechange"></pages-v>
      </div>
    </div>
    <alert-v v-on:close="close" :btn="btn" v-on:next="next" v-if="addDialog
">
      <span slot="name">添加客户</span>
      <div class="tep-in" slot="con">
        <div class="as-item">
          <p class="as-item-tit">
            监控器型号：
          </p>
          <div class="as-item-con">
            <select class="" name="">
              <option value="">zh-12312</option>
              <option value="">zh-345345</option>
            </select>
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            监控器UID：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            监控器出厂编号：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            所属单位：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            安装单位：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
      </div>
    </alert-v>
  </div>
</template>
<script>
import pages from '../../components/pages.vue';
import alert from '../../components/alert.vue';

export default {
  data() {
    return {
      btn: '确定',
      pageNum: 1,
      pageSize: 10,
      total: 200,
      keywords: "",
      items: [],
      checkboxModel: [],
      checked: false,
      leftbars: [],
      width: '',
      ifPage: false
    }
  },
  components: {
    'pages-v': pages,
    'alert-v': alert
  },
  computed: {
    addDialog() {
      return this.$store.getters.dialog.state;
    }
  },
  created() {
    this.getData();
    this.getBar();
  },
  methods: {
    checkedAll() {
      let _this = this;
      if (this.checked) { //实现反选
        _this.checkboxModel = [];
        _this.items.forEach(function(item) {
          _this.checkboxModel.push(item.clientid);
        });
      } else { //实现全选
        _this.checkboxModel = [];
      }
    },
    deleteData(ids, type) {
      var self = this;
      var ids = ids;
      if (type == 1) {
        self.checkboxModel.push(ids);
        self.checkboxModel.join(',');
      }
      this.$confirm('您确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.loading = true;
        let url = "client/deleteClientById";
        let data = {
          ids: ids
        }
        this.api.handleAjax(url, data).done(function(res) {
          self.$message.success({ message: "删除成功！", duration: Util.time() });
          self.getData();
        }).fail(function(res) {
          console.log(res);
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    pagechange(val) {
      console.log(val + '页')
    },
    getData() {
      var self = this;
      console.log(0)
      let url = "/client/findClientByConditions";
      let data = {
        currentpage: this.pageNum,
        pagesize: this.pageSize,
        keywords: this.keywords
      }
      this.api.handleAjax(url, data).done(function(res) {
        // console.log(res.list.length);
        if (res.list.length > 0) {
          self.total = res.total;
          self.pageSize = res.pageSize;
          self.pageNum = res.pageNum;
          self.items = res.list;
          self.ifPage = true;
        } else {
          self.ifPage = false;
        }
      }).fail(function(res) {
      })
    },
    getBar() {
      let _this1 = this;
      this.api.postN({
        url: "/client/findProvinceAndCompanys",
        success: function(res) {
          let _res = res.response;
          if (_res.info.code == 100000) {
            _this1.leftbars = _res.content;
            console.log(_this1.$route.path.indexOf('item'))
            if (!_this1.$route.query.clientid && _this1.$route.path.indexOf('item') < 0) {
              // _this1.$router.replace({path:'/monitoringInstall/list',query:{clientid: _res.content[0].clientList[0].clientid}})
            }
          }
        }
      });
    },
    add(type, id) {
      console.log(0)
      this.$store.dispatch('ChangeDialogState', {
        type: type,
        state: true,
      })
    },

    close() {
      this.$store.dispatch('ChangeDialogState', {
        state: false,
      })
    },

    next() {
      let url = "/client/addClientByCity";
      let data = {
        clientname: "小小",
        address: "杭州",
        name: "baba",
        phone: "13340594495",
        email: "zzy@ma.com",
        remark: "supper",
        cityid: 130100,
        provinceid: 130000,
      };
      this.api.handleAjax(url, data).done(function(res) {

      }).fail(function(res) {
        console.log(res)
      })
      this.close();
    }

  },

  watch: {
    '$route' (to, from) {
      this.pageNum = 1;
      this.getList();
    },
    'checkboxModel': {
      handler: function(val, oldVal) {
        console.log(this.checkboxModel)
        if (this.checkboxModel.length === this.items.length) {
          this.checked = true;
        } else {
          this.checked = false;
        };
      },
      deep: true
    }
  },
  mounted() {
    this.width = this.$refs.list.getBoundingClientRect().width - 17;
    let _this = this;
    window.onresize = function() {
      _this.width = _this.$refs.list.getBoundingClientRect().width - 17;
    }
  }
}

</script>
<style lang="scss" scoped>
#clientList {
  .rightTabbar {
    width: 100%;
    height: 30px;
    border-bottom: 4px solid #2899ee;
    .rt-item {
      margin-right: 3px;
      float: left;
      width: 120px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border: 1px solid #cfdde7;
      border-bottom: 0;
      cursor: pointer;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .rtItemSelect {
      background: #2899ee;
      border-color: #2899ee;
      color: #fff;
    }
    .rt-handle {
      float: right;
      width: 400px;
      height: 30px;
    }
    .handle-item {
      float: right;
      margin-left: 10px;
      button {
        height: 24px;
        line-height: 24px;
        padding: 0 7px;
        border: 1px solid #CFDDE7;
        border-radius: 3px;
        background: url(../../assets/img/bg_sheng.png) repeat-x;
        font-size: 12px;
        color: #2899EE;
        cursor: pointer;
      }
      input {
        padding: 4px;
        width: 150px;
        height: 24px;
        border: 1px solid #CFDDE7;
        border-radius: 3px;
      }
    }
  }
  .downpage {
    position: absolute;
    bottom: 1px;
    left: 0;
    padding-right: 10px;
    width: 100%;
    height: 30px;
    background: #fff;
  }

  .as-item {
    position: relative;
    margin-bottom: 5px;
    width: 100%;
    min-height: 24px;
    padding: 1px 0;
    font-size: 12px;
    color: #666666;
  }
  .as-item-tit {
    position: absolute;
    top: 0;
    left: 0;
    width: 115px;
    height: 100%;
    line-height: 24px;
    text-align: right;
  }
  .as-item-con {
    padding-left: 120px;
    width: 100%;
    height: 100%;
    text-align: left;
    input,
    select {
      width: 455px;
      height: 24px;
      background: #FFFFFF;
      border: 1px solid #D3D3D3;
      border-radius: 2px;
    }
    button {
      width: 100px;
      height: 24px;
      background: #FF7800;
      border-radius: 2px;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
    }
  }
}

</style>
