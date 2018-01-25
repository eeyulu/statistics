<template>

  <div>
    <x-header>科室急诊人数</x-header>

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
      <cell title="科室名称" value="急诊人数(人)"></cell> 
      <cell-form-preview :list="list" ></cell-form-preview>
    </group>
  </div>

</template>


<script>
import {LoadMore, LoadingPlugin, Loading, Divider, XHeader,CellFormPreview, Group, Calendar, Cell, Badge, CellBox, XButton } from 'vux'
import axios from "axios";
import Vue from 'vue' 
Vue.use(LoadingPlugin)

export default {
  components: {
    LoadMore,
    Divider,
    XHeader,
    CellFormPreview,
    Calendar,
    Group,
    Cell,
    Badge,
    CellBox,
    XButton
  },
  data () {
    return { 
      noData:false,
      showData:false,
      list:[],
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

    axios.get('/ht_micro_service/his/emergency', {
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
      axios.get('/ht_micro_service/his/emergency', {
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

<style >
  .query{
    background-color:#35495e;  
    color:white;  
  }
</style>