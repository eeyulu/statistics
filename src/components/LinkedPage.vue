<template>
  <div>
    <!-- <tabbar class="tabbar">  
      <div class="title">统计数据</div>  
    </tabbar>  -->
    <x-header :left-options="{showBack: false}">
        数据统计
    </x-header>
    
    <group>
      <calendar @on-change="startDate" v-model="start" title="开始日期" disable-future id="startDate"></calendar>
    </group>
     <group>
      <calendar @on-change="endDate" v-model="end" title="结束日期" disable-future id="endDate"></calendar>
    </group>
      <divider>数据列表</divider>  
    <group>
      <cell title="日交接班数据" value="" link="/basicData"></cell>
      <cell title="科室占床人数" value="" link="/inBed"></cell>
      <cell title="科室入院人数" value="" link="/hospital"></cell>
      <cell title="科室出院人数" value="" link="/leaveHospital"></cell>
      <cell title="科室急诊人数" value="" link="/emergency"></cell>
      <cell title="科室门诊人数" value="" link="/outpatient"></cell>

      <cell title="科室危重人数" value="" link="/critical"></cell>
      <cell title="科室新增危重人数" value="" link="/newCritical"></cell>

      <cell title="科室手术详情" value="" link="/operation"></cell>
      <cell title="科室预约手术详情" value="" link="/orderOperation"></cell>

      <!-- <cell title="测试" value="" link="/cardTest"></cell> -->
    </group>
  </div>
</template>

<script>
import {Divider, Calendar, XHeader,Group, Cell, CellBox } from 'vux'
export default {
  components: {
    Divider,
    Calendar,
    XHeader,
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      start:'',
      end:''
    }
  },
  methods: {
    startDate(val){
      this.start = val;
      sessionStorage.startDate=this.start;
    },
    endDate(val){
      this.end = val;
      sessionStorage.endDate=this.end;
    }
  },
  created:function(){   
    // console.log("sessionStorage:"+sessionStorage.startDate);
    if(typeof(sessionStorage.startDate)=="undefined"){
      
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() - 1;
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

  }  
}
</script>

<style >
.tabbar{  
background-color:#35495e;  
height:50px;  
position:relative;  
}

.title{  
   text-align:center;  
   margin:auto;  
   color:white;  
   line-height:50px;  
   font-size:18px;  
 } 

</style>