<template>
  <div>
    <x-header :left-options="{showBack: false}">查询方式</x-header>

    <group>
      <!-- <cell title="统计日期	" :value=" money.stDate "></cell>  -->
      <!-- <cell title="当前住院人数	" :value="money.inp" is-link link=""></cell>  -->
      <cell title="手术等级"  is-link link="/operatGrade/grade"></cell> 
      <cell title="手术病区"  is-link link="/operatGrade/ward"></cell> 
      <cell title="综合查询"  is-link link="/operation"></cell> 
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