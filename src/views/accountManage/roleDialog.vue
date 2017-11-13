<template>
  <div class="wrapper">
    <alert-v v-on:close="close" height="320px" :btn="btn" v-on:next="next" v-if="addDialog
">
      <span slot="name">分配角色</span>
      <div class="tep-in" slot="con">

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
      ifModify: true,
      // 增加相关
    }
  },
  props: ["userId","addType"],
  components: {
    'alert-v': alert
  },
  created() {
    // this.getData();
  },
  computed: {
    addDialog() {
      return this.$store.getters.roleDialog.state;
    }
  },
  methods: {

    close() {
      this.$store.dispatch('ChangeDialogState', {
        state: false,
      })
    },

    next() {
      if (!this.username) {
        this.$message("用户名不能为空");
        return;
      }
      if (this.addType == 1) {
        if (!this.password) {
          this.$message("密码不能为空");
          return;
        }
      }
      if (!this.phone) {
        this.$message("联系电话不能为空");
        return;
      }

      var self = this;
      let url = "/addSystemUser";
      let data = {
        systemid: this.systemid,
        username: this.username,
        password: this.password,
        name: this.name,
        phone: this.phone,
        email: this.email
      };
      if (self.addType == 2) {
        url = "/modifyUser";
        data = {
          systemid: this.systemid,
          username: this.username,
          // password: this.password,
          name: this.name,
          phone: this.phone,
          email: this.email
        };
      }
      this.api.handleAjax(url, data).done(function(res) {
        self.close();
        self.$emit('getParentData')
      }).fail(function(res) {
        self.$message(res)
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
