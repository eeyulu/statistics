<template>
  <div>
    <x-header :left-options="{showBack: false}">科室手术详情</x-header>

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
          切口等级
        </div>
        <div class="vux-1px-r">
          病&nbsp;&nbsp;&nbsp;&nbsp;区 
        </div>
      </div>
	   </card>
    <card :header="{title: '• '+to.operName}"  v-for="to in list" v-if="showData">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span  :class="to.operScale=='III级'||to.operScale=='IV级'?classA:classB">{{to.operScale}}</span>
          <!-- <br/>
          手术等级 -->
        </div>
        <div class="vux-1px-r">
          <span class="classB">{{to.woundGrade}}</span>
          <!-- <br/>
          切口等级 -->
        </div>
        <div class="vux-1px-r">
          <span class="classB">{{to.deptName}}</span>
          <!-- <br/>
          科室名称 -->
        </div>
      </div>
	   </card>
  </div>
</template>

<style scoped lang="less">
 @import '~vux/src/styles/1px.less';
  
  .card-demo-flex {
    display: flex;
    align-items:center;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 13px;
  }

  .classA{
    color:red;
    font-size: 15px;
  }
  .classB{    
    color: #35495e;
    // font-family: 幼圆;
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
    flex: 1;
    text-align: center;
    font-size: 14px;
    // font-family: 幼圆;
  }
</style>

<script>
import {LoadMore, LoadingPlugin, Loading, Card, Divider, XButton, Calendar, XHeader, Panel, Group, Radio } from 'vux'
import axios from "axios";

import Vue from 'vue' 
Vue.use(LoadingPlugin)
export default {
  components: {
    LoadMore,
    Card,
    Divider,
    XButton,
    Calendar,
    XHeader,
    Panel,
    Group,
    Radio
  },
  data () {
    return {
      classA:'classA',
      classB:'classB',
      noData:false,
      showData:false,
      type: '2',
      list: [],
      start:'',
      end:''
    }
  },
  created:function(){  
    this.$vux.loading.show({
      text: '加载中'
    })      
    this.start = sessionStorage.startDate;
    this.end = sessionStorage.endDate;

    axios.get('/ht_micro_service/his/operation', {
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
    startDate(val){
      this.start = val;
      console.log("start"+this.start);
    },
    endDate(val){
      this.end = val;
      console.log("end"+this.end );
    },
    queryData() { 
      this.noData=false;
      this.showData=false;
      this.$vux.loading.show({
        text: '加载中'
      })          
      axios.get('/ht_micro_service/his/operation', {
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