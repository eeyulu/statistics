<template>
  <div>
    <x-header :left-options="{showBack: false}">日交接班数据</x-header>

    <group>
      <calendar @on-change="startDate" v-model="start" title="开始日期" disable-future></calendar>
    </group>
     <group>
      <calendar @on-change="endDate" v-model="end" title="结束日期" disable-future></calendar>
    </group>
    <div style="padding:15px;">
      <!-- <x-button  @click.native="queryData()" class="query"   show-loading	 plain disabled>查询</x-button> -->
      <x-button  @click.native="queryData()" class="query">查询</x-button>
    </div>

    
    <div v-if="noData">        
        <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
    </div>

    <group v-if="showData">
      <!-- <cell title="统计日期	" :value=" money.stDate "></cell>  -->
      <!-- <cell title="当前住院人数	" :value="money.inp" is-link link=""></cell>  -->
      <cell title="当前占床数(实时)" :value="money.bed" is-link link="/inBed"></cell> 
      <cell title="入院人数" :value="money.adm" is-link link="/hospital"></cell> 
      <cell title="出院人数" :value="money.disCharge" is-link link="/leaveHospital"></cell> 
      <cell title="当前危重人数(实时)" :value="money.critical" is-link link="/critical"></cell> 
      <cell title="新增危重人数" :value="money.criticalNew" is-link link="/newCritical"></cell> 
      <cell title="门诊人数" :value="money.outpNum" is-link link="/outpatient"></cell> 
      <cell title="急诊人数" :value="money.erNum" is-link link="/emergency"></cell> 
      <cell title="手术总人数" :value="money.operNum" is-link link="/operation"></cell> 
      <cell title="当前预约手术总人数(实时)" :value="money.operNumSche" is-link link="/orderOperation"></cell> 

      <!-- <cell
      title="手术分类人数"
      is-link
      :border-intent="false"
      :arrow-direction="showContent002 ? 'up' : 'down'"
      @click.native="showContent002 = !showContent002"></cell>

      <template v-if="showContent002">
        <cell-form-preview :border-intent="false" :list="list"></cell-form-preview>
      </template> -->

    </group>

  </div>
</template>



<script>
import {LoadMore, LoadingPlugin, Loading, Divider, Calendar, XButton, XHeader,FormatTimeFilter, Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
import axios from "axios";
import Vue from 'vue' 
Vue.use(LoadingPlugin)

export default {
  filters: {
    FormatTimeFilter
  },
  components: {
    LoadMore,
    Divider,
    Calendar, 
    XButton,
    XHeader,
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  methods: {
    startDate(val){
      this.start = val;
      sessionStorage.startDate=this.start;
    },
    endDate(val){
      this.end = val;
      sessionStorage.endDate=this.end;
    },
    queryData() {
      this.noData=false;
      this.showData=false;
      this.$vux.loading.show({
        text: '加载中'
      })       
      axios.get('/ht_micro_service/his/adtDay', {
        params: {
          stStartDate: this.start,
          stEndDate: this.end
        }
      })
      .then(response=>{
        setTimeout(() => {
          this.$vux.loading.hide();
          this.money=response.data.data;
          // if(response.data.list.length){
          //   this.list=response.data.list;
          // }
          if('bed' in this.money){
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
  },
  data () {
    return {
      noData:false,
      showData:false,
      start:'',
      end:'',
      showContent002: true,
      list: [
          {
              "label":"III级",
              "value":0
          },
          {
              "label":"II级",
              "value":0
          },
          {
              "label":"I级",
              "value":0
          }
      ],
      money: {}
    }
  },
  created:function(){ 
    if(typeof(sessionStorage.startDate)=="undefined"){
      var date = new Date(Math.abs(new Date()) - (24 * 60 * 60 * 1000));  
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;

      this.start = currentdate;
      this.end = currentdate;  

      sessionStorage.startDate=this.start;
      sessionStorage.endDate=this.end;
    }else{
      this.start = sessionStorage.startDate;
      this.end = sessionStorage.endDate;
    }
    
    this.$vux.loading.show({
      text: '加载中'
    })    

    axios.get('/ht_micro_service/his/adtDay', {
      params: {
        stStartDate: this.start,
        stEndDate: this.end
      }
    })
    .then(response=>{
      // setTimeout(() => {
        this.$vux.loading.hide();
        this.money=response.data.data;        
        if('bed' in this.money){
          this.showData = true;
        }else{
          this.noData = true;
        }
      // },1000);  
    })
    .catch(error=>{
      setTimeout(() => {
        this.$vux.loading.hide();
        this.noData = true;
        console.log(error);
      },1000);
    });

  }
}
</script>

<style >
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.query{
  background-color:#35495e;  
  color:white;  
}
</style>