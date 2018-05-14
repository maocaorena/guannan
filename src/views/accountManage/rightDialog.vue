<template>
  <div class="wrapper">
    <alert-v v-on:close="close" height="480px" width="300px" :btn="btn" v-on:next="next" v-if="addDialog">
      <span slot="name">分配角色</span>
      <div class="tep-in" slot="con">
          <div class="items">
            <div class="item" v-for="(item,index) of items">
              <label><input type="checkbox" v-model='checkboxModel' :value="item.permissionId"> {{item.permissionName}}</label>
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
      items: [],
      checkboxModel: [],
      ifModify: true,
      // 增加相关
    }
  },
  props: ["roleId","addType"],
  components: {
    'alert-v': alert
  },
  created() {
    this.getData(); 
    this.getSetedData();
  },
  computed: {
    addDialog() {
      return this.$store.getters.rightDialog.state;
    }
  },
  methods: {

    close() {
      this.$store.dispatch('ChangeRightDialogState', {
        state: false,
      })
    },

    next() {

      var self = this;
      let url = "/setPermission";
      let data = {
        id: self.roleId,
        list: "["+self.checkboxModel.toString()+"]"
      };

      this.api.handleAjax(url, data).done(function(res) {
        self.close();
        self.$emit('getParentData')
      }).fail(function(res) {
        self.$message(res)
      })
    },

    getSetedData() {
      // console.log(this.userId)
      var self = this;
      let url = "/getPermission";
      let data = {
        id: self.roleId
      }
      this.api.handleAjax(url,data).done(function(res){
          res.list.forEach(function(item){
            if(item.checked) {
              self.checkboxModel.push(item.permissionId);
            }
          })
      })     
    },
    getData() {
      var self = this;
      let url = "/selectAllPermission";
      let data = {
        pagesize: 40,
      };
      this.api.handleAjax(url, data).done(function(res) {
        // console.log(res.list.length);
        if (res.list.length > 0) {
          self.items = res.list;
        }
      }).fail(function(res) {})
    }
  }
}

</script>
<style lang="scss" scoped>
.items {
  padding: 20px;
  padding-right: 0;
  text-align: left;
  .item {
    padding-right: 20px;
    margin-bottom: 10px;
  }
}

</style>
