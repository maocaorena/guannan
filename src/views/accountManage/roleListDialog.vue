<template>
  <div class="wrapper">
        <alert-v v-on:close="close" height="320px" :btn="btn" v-on:next="next" v-if="addDialog
    ">
          <span slot="name">{{moduleTitle}}</span>
          <div class="tep-in" slot="con">
            <input type="hidden" v-model="roleid">
            <div class="as-item" style="margin-top: 15px">
              <p class="as-item-tit">
                角色名称：
              </p>
              <div class="as-item-con">
                <input type="text" name="" value="" v-model="rolename">
              </div>
            </div>
            <div class="as-item">
              <p class="as-item-tit">
                角色类型：
              </p>
              <div class="as-item-con">
                <input type="text" name="" value="" v-model="roletype">
              </div>
            </div>
            <div class="as-item">
              <p class="as-item-tit">
                备注：
              </p>
              <div class="as-item-con">
                <input type="text" name="" value="" v-model="roleremark">
              </div>
            </div>
          </div>
        </alert-v>
  </div>
</template>
<script>
import alert from '../../components/alert.vue';
import { Util } from '../../lib/util.js';

export default {
  data() {
    return {

      width: "",
      btn: '确定',
      moduleTitle: this.addType == 2 ? "编辑角色" : "添加角色",
      ifModify: true,
      // 增加相关
      roleid: this.item.roleId,
      rolename: this.item.roleName,
      roletype: this.item.roleType,
      roleremark: this.item.roleRemark,
    }
  },
  props: ["item","addType"],
  components: {
    'alert-v': alert
  },
  created() {
    // this.getData();
  },
  computed: {
    addDialog() {
      return this.$store.getters.roleListDialog.state;
    }
  },
  methods: {

    close() {
      this.$store.dispatch('ChangeRoleListDialogState', {
        state: false,
      })
    },

    next() {
      if (!this.rolename) {
        this.$message("角色名称不能为空");
        return;
      }
      if (!this.roletype) {
        this.$message("角色类型不能为空");
        return;
      }
      
      
      var self = this;
      let url = "/addRole";
      let data = {
        roleid: this.roleid,
        rolename: this.rolename,
        roletype: this.roletype,
        roleremark: this.roleremark,
      };
      if (self.addType == 2) {
        url = "/modifyRole"
      }
      this.api.handleAjax(url, data).done(function(res) {
        self.close();
        self.$emit('getParentData');
      }).fail(function(res) {
        this.$message(res)
      })
    }
  }
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
