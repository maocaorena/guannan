<template>
  <div class="leftbar">
    <div class="lb-top" v-if="leftbarsType == 1">全部</div>
    <!-- <div class="lb-top" v-if="leftbarsType == 3">
            <select class="selectAdd" name="" v-model="threeSelect" @change="hasSelect">
                <option v-for="(item,index) of leftbars">{{item.tit}}</option>
            </select>
        </div> -->
    <!-- 省 公司 -->
    <div v-if="leftbarsType == 1" class="first-list type1" v-for="(item,index) of leftbars">
      <p class="first-item">
        <img class="leftIcon" src="../../assets/img/leftbar/icon_sheng.png" alt=""> {{item.province}}
      </p>
      <ul class="second-list">
        <router-link class="second-item" :class="{selected:$route.query.clientid==second.clientid}" :to="{path:goBaseUrl,query:{clientid: second.clientid}}" tag="li" :key="second.clientid" v-for="(second,index2) of item.clientList">
          {{second.clientname}}
        </router-link>
      </ul>
    </div>
    <!-- 风机三级菜单 -->
    <!-- <div v-if="leftbarsType == 3" class="first-list type1" v-for="(item,index1) of leftbars[threeSelectInd].list">
            <p class="first-item">
                <img class="leftIcon" src="../../assets/img/leftbar/icon_gongsi.png" alt="">
                {{item.tit}}
            </p>
            <ul class="second-list">
                <li class="second-item"
                    :class="{selected:leftbarselected.first==index1&&leftbarselected.second==index2}"
                    v-for="(second,index2) of item.list"
                    @click="clickThis1(index1,index2,threeSelectInd)"><img class="leftIcon" src="../../assets/img/leftbar/icon_fengjikongzhidian.png" alt="">{{second.tit}}</li>
            </ul>
        </div> -->
    <!-- 菜单 -->
    <div v-if="leftbarsType == 2" class="first-list type2" v-for="(item,index1) of leftbars">
      <router-link class="first-item" tag="p" :to="item.url" :class="{selected : isthis2 == item.url}">
        {{item.tit}}
      </router-link>
    </div>
    <div class="lb-top" v-if="leftbarsType == 4">全部</div>
    <div v-if="leftbarsType == 4" class="first-list type1" v-for="(item,index) of leftbars">
      
    </div>
  </div>
</template>
<script>

</script>
<style lang="scss" scoped>
.leftbar {
  width: 100%;
  height: 100%;
  .lb-top {
    width: 100%;
    height: 35px;
    background: #2899ee;
    color: #fff;
    font-size: 14px;
    line-height: 35px;
    text-indent: 10px;
  }
  .selectAdd {
    position: relative;
    left: -8px;
    padding-left: 3px;
    width: 188px;
    height: 24px;
    background: #FFFFFF;
    border: 1px solid #CFDDE7;
    border-radius: 5px;
  }
  .first-item {
    width: 100%;
    text-indent: 18px;
    background: #e3e3e3;
    background: -moz-linear-gradient(top, #fdfdfd, rgba(222, 222, 222, 1));
    background: -o-linear-gradient(top, #fdfdfd, rgba(222, 222, 222, 1));
    background: -ms-linear-gradient(top, #fdfdfd 0%, #dedede 100%);
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fdfdfd), to(rgba(222, 222, 222, 1)));
    background: gradient(linear, 0 0, 0 bottom, from(#fdfdfd), to(rgba(222, 222, 222, 1)));
  }
  .leftIcon {
    position: relative;
    top: 3px;
    right: 2px;
  }
  .type1 .first-item {
    height: 29px;
    line-height: 29px;
    border: 1px solid #cccccc;
  }
  .type1 .selected {
    background: #2899ee;
    color: #fff;
  }
  .second-item {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-indent: 25px;
    border-bottom: 2px dashed #ddd;
    cursor: pointer;
    font-size: 13px;
  }
  .second-list {
    li:nth-last-child(1) {
      border: none;
    }
  }
  .type2 .first-item {
    border: none;
    cursor: pointer;
    height: 35px;
    line-height: 35px;
  }
  .type2 .selected {
    background: none;
    background: #2899ee;
    color: #fff;
  }
}

</style>
