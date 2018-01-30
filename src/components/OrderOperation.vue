<template>
  <div>
    <x-header :left-options="{showBack: false}">科室预约手术详情</x-header>

    <group>
      <calendar @on-change="startDate" v-model="start" title="开始日期" disable-future></calendar>
    </group>
     <group>
      <calendar @on-change="endDate" v-model="end" title="结束日期" disable-future></calendar>
    </group>
    <div style="padding:15px;">
      <x-button  @click.native="queryData()" class="query">查询</x-button>
    </div>

    <div v-if="noData">        
        <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
    </div>


    <card v-if="showData">
      <div slot="content" class="header-flex card-demo-content01">
        <div class="vux-1px-r">
          手术等级
        </div>
        <div class="vux-1px-r">
          手术者
        </div>
        <div class="vux-1px-r">
          患者床位
        </div>
        <div class="vux-1px-r">
          申请科室
        </div>
        <div class="vux-1px-r">
          是否需要隔离 
        </div>
      </div>
	   </card>

    <card :header="{title: '• +to.operName}"  v-for="to in list" class="head-color" v-if="showData">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span  :class="to.operScale=='III级'||to.operScale=='IV级'?classA:classB">{{to.operScale}}</span>
        </div>
        <div class="vux-1px-r">
          <span class="classB">{{to.surgeon}}</span>
        </div>
        <div class="vux-1px-r">
          <span class="classB">{{to.bedNo}}</span>
        </div>
        <div class="vux-1px-r">
          <span class="classB">{{to.deptName}}</span>
        </div>
        <div class="vux-1px-r">
          <span v-if="to.isOlation=='1'" class="classB">正常</span>
          <span v-else-if="to.isOlation=='2'" class="classB">隔离</span>
          <span v-else-if="to.isOlation=='3'" class="classB">放射</span>
        </div>

      </div>
	   </card>
  </div>
</template>


<script>
import {LoadMore, LoadingPlugin, Loading, XButton, Calendar, XHeader, Panel, Group, Radio ,Divider, Card } from 'vux'
import axios from "axios";

import Vue from 'vue' 
Vue.use(LoadingPlugin)
export default {
  components: {
    LoadMore,
    XButton,
    Calendar,
    XHeader,
    Panel,
    Group,
    Radio,
    Card,
    Divider
  },
  data () {
    return {
      classA:'classA',
      classB:'classB',
      noData:false,
      showData:false,
      list: [],
      start:'',
      end:''    
    }
  },
  created:function(){
    this.$vux.loading.show({
      text: '加载中'
    })  
    
    this.start = this.getNewDay(sessionStorage.startDate);
    this.end = this.getNewDay(sessionStorage.endDate);

    axios.get('/ht_micro_service/his/orderOpera', {
      params: {
        stStartDate: this.start,
        stEndDate: this.end
      }
    })
    .then(response=>{
      setTimeout(() => {
        this.$vux.loading.hide();
        this.list=response.data.data;
        if(this.list.length){
          this.showData = true;
        }else{
          this.noData = true;
        }
      },1000);
    })
    .catch(error=>{
      setTimeout(() => {
        this.$vux.loading.hide();
        this.noData = true;
        console.log(error);
      },1000);
    });
    
  },
  methods: {
    getNewDay(dateTemp) {  
      var nDate = new Date(dateTemp);    
      var millSeconds = Math.abs(nDate) + (24 * 60 * 60 * 1000);  
      var date = new Date(millSeconds);  
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() ;
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;

      return currentdate;  
    }, 
    startDate(val){
      this.start = val;
    },
    endDate(val){
      this.end = val;
    },
    queryData() {
      this.noData=false;
      this.showData=false;
      this.$vux.loading.show({
        text: '加载中'
      })   
      axios.get('/ht_micro_service/his/orderOpera', {
        params: {
          stStartDate: this.start,
          stEndDate: this.end
        }
      })
      .then(response=>{
        setTimeout(() => {
          this.$vux.loading.hide();
          this.list=response.data.data;
          if(this.list.length){
            this.showData = true;
          }else{
            this.noData = true;
          }
        },1000);   
      })
      .catch(error=>{
        setTimeout(() => {
          this.$vux.loading.hide();
          this.noData = true;
          console.log(error);
        },1000)
      });

    }
  }
}
</script>

<style scoped lang="less">
 @import '~vux/src/styles/1px.less';
  
  .card-demo-flex {
    display: flex;
    align-items:center;
    flex-wrap:wrap
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    margin-top: 2px;
    margin-bottom: 2px;
    width: 20%;
    text-align: center;
    font-size: 9px;
  }

  .classA{
    color:red;
    font-size: 11px;
  }
  .classB{
    color: #35495e;
    font-family: 幼圆;
  }


  .query{
    background-color:#35495e;  
    color:white;  
  }

  .header-flex {
    display: flex;
    align-items:center;
  }

  .header-flex  > div {
    width: 20%;
    text-align: center;
    font-size: 10px;
    font-family: 幼圆;
    opacity:0.6;
  }
</style>