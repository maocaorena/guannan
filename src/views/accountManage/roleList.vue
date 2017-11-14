<template>
  <div id="accountList" class="wrapper">
    <div class="leftBlock">
      <router-link :to="{path:item.url}" :class="{selected:$route.fullPath==item.url}" tag="div" class="first-list type1" v-for="(item,index) of leftbars">
        <p class="first-item">
          {{item.tit}}
        </p>
      </router-link>
    </div>
    <div class="rightBlock">
      <div class="rightTabbar">
        <div class="rt-item rtItemSelect">
          角色管理
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
            <button type="button" name="button"  @click="add(1)">增加角色</button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="list-tit">
          <table class="list" border="1" cellspacing="0" cellpadding="0">
            <colgroup>
              <col width="4">
              <col width="4">
              <col width="8">
              <col width="18">
              <col width="10">
              <col width="11">
            </colgroup>
            <thead>
              <tr>
                <th>
                  <input type='checkbox' v-model='checked' v-on:change='checkedAll'>
                </th>
                <th>序号</th>
                <th>角色名称</th>
                <th>角色类型</th>
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
              <col width="8">
              <col width="18">
              <col width="10">
              <col width="11">
            </colgroup>
            <tbody class="list-con">
              <tr v-if="!ifPage">
                <td colspan="6">暂无数据</td>
              </tr>
              <tr v-for="(item,index) of items" class="list-con-item">
                <!-- 操作 -->
                <td>
                  <input type="checkbox" name="checkboxinput" v-model='checkboxModel' :value="item.roleId">
                </td>
                <td>{{index}}</td>
                <td>{{item.roleName}}</td>
                <td>{{item.roleType}}</td>
                <td>{{item.roleRemark}}</td>

                <td>
                  <a href="javascript:;" class="mode" @click="deleteData(item.roleId,2)">删除</a>
                  <a href="javascript:;" class="mode" @click="add(2,item)">编辑</a>
                  <a href="javascript:;" class="mode" @click = "setRights(item.roleId)">设置权限</a>
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
    <roleListDialog :item="roleData" :addType="addType" v-if="addDialog" @getParentData="getData"></roleListDialog>

    <rightDialog :roleId="roleModId" :addType="addType" v-if="rightDialog" @getParentData="getData"></rightDialog>

  </div>
</template>
<script>
import pages from '../../components/pages.vue';
import alert from '../../components/alert.vue';
import roleListDialog from './roleListDialog.vue';
import rightDialog from './rightDialog.vue';

export default {
  data() {
    return {
      leftbars: [{
          tit: '帐号列表',
          url: '/accountManage/accountList'
        },
        {
          tit: '角色',
          url: '/accountManage/roleList'
        }
      ],
      width: "",
      btn: '确定',
      moduleTitle: "添加角色",      
      pageNum: 1,
      pageSize: 10,
      total: 200,
      keywords: "",
      items: [],
      checkboxModel: [],
      checked: false,
      width: '',
      ifPage: false,
      roleData: {},
      roleModId: "",
      // 增加相关
      addType: 1
    }
  },
  components: {
    'pages-v': pages,
    roleListDialog,
    rightDialog
  },
  created() {
    this.getData();

  },
  computed: {
    addDialog() {
      return this.$store.getters.roleListDialog.state;
    },
    rightDialog() {
      return this.$store.getters.rightDialog.state;      
    }
  },
  methods: {
    checkedAll() {
      let _this = this;
      if (this.checked) { //实现反选
        _this.checkboxModel = [];
        _this.items.forEach(function(item) {
          _this.checkboxModel.push(item.systemId);
        });
      } else { //实现全选
        _this.checkboxModel = [];
      }
    },
    // 删除数据
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
        let url = "/deleteRole";
        let data = {
          id: ids
        }
        this.api.handleAjax(url, data).done(function(res) {
          self.$message.success({ message: "删除成功！", duration: Util.time() });
          self.getData();
        }).fail(function(res) {
          // console.log(res);
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
      let url = "/selectRoleList";
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
      }).fail(function(res) {})
    },
    add(type, param) {
      var self = this;
      this.$store.dispatch('ChangeRoleListDialogState', {
        type: type,
        state: true,
      });

      if (type == 2) {
        self.addType = 2;
        self.roleData = param
      }
      // if (type == 2) {
      //   self.addType = 2;
      //   self.roleid = param.roleId;
      //   self.rolename = param.roleName;
      //   self.roletype = param.roleType;
      //   self.roleremark = param.roleRemark;
      // }
    },
    setRights(id) {
      this.$store.dispatch('ChangeRightDialogState', {
        state: true,
      });
      this.roleModId = id;
    }
    
  },
  mounted() {
    this.width = this.$refs.list.getBoundingClientRect().width - 17;
    let _this = this;
    window.onresize = function() {
      _this.width = _this.$refs.list.getBoundingClientRect().width - 17;
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
    },
    provinceid: '_getCitys'
  },
}

</script>
<style lang="scss" scoped>
#accountList {
  .leftBlock {
    .first-list {
      cursor: pointer;
    }
    .router-link-active {
      .first-item {
        border: 1px solid #2899ee;
        color: #fff;
        background: #2899ee;
      }
    }
  }
  .rightTabbar {
    width: 100%;
    height: 30px;
    border-bottom: 4px solid #2899ee;
    .rt-handle {
      width: auto !important;
      .handle-item {
        display: inline-block;
        float: none;
      }
    }
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
      select {
        height: 24px;
        line-height: 24px;
        border: 1px solid #CFDDE7;
        min-width: 100px;
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
