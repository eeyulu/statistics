<template>
  <div>
    <x-header :left-options="{showBack: false}">{{headName}}</x-header>
    <group v-for="(item,key) in list">  
        <cell :title="key" :value="item" is-link :link="'/operatFilter/'+key"></cell> 
    </group>
  </div>

</template>


<script>
import {LoadMore, LoadingPlugin, Loading,  XHeader, Group, Calendar, Cell, Badge, CellBox } from 'vux'
import axios from "axios";
import Vue from 'vue' 
Vue.use(LoadingPlugin)

export default {
  components: {
    LoadMore,
    XHeader,
    Calendar,
    Group,
    Cell,
    Badge,
    CellBox
  },
  data () {
    return { 
      headName:'',
      list:[],
      pattern: this.$route.params.pattern
    }
  },
  created:function(){  
    this.$vux.loading.show({
      text: '加载中'
    })

    if(this.pattern == 'grade'){
      this.headName ='手术等级';
    }else if(this.pattern == 'ward'){
      this.headName ='手术病区';
    }

    this.start = sessionStorage.startDate;
    this.end = sessionStorage.endDate;
    axios.get('/ht_micro_service/his/operation/grade?pattern='+this.pattern, {
      params: {
        stStartDate: this.start,
        stEndDate: this.end
      }
    })
    .then(response=>{
      setTimeout(() => {
        this.$vux.loading.hide();
        this.list=response.data.data;
      },1000);
    })
    .catch(error=>{
      setTimeout(() => {
        this.$vux.loading.hide();
        console.log(error);
      },1000);
    });    
  }
}
</script>

<style >
</style>