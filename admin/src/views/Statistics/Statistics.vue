<template>
  <div class="statistics">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Statistics</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <div style="display: flex; justify-content: center; align-items: center">
            <div id="gradeChart" :style="{width: '500px', height: '300px', margin: '0 50px 0 0'}"></div>
            <div id="UniversityChart" :style="{width: '500px', height: '300px'}"></div>  
          </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
var echarts = require('echarts')
export default {
    data() {
        return {
            users:{

            }
        }
    },
    methods: {
        draw(){
            var gradeChart = echarts.init(document.getElementById('gradeChart'))
            gradeChart.setOption({
                title: {
                    text: '用户年级分布图',
                    padding: [20,20,40,40],
                },
                backgroundColor: '#FFFFFF',
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:235, name:'大一'},
                            {value:274, name:'大二'},
                            {value:310, name:'大三'},
                            {value:335, name:'大四'},
                            {value:400, name:'其他'}
                        ],
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(0, 0, 0, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
            var UniversityChart = echarts.init(document.getElementById('UniversityChart'))
            UniversityChart.setOption({
                title: {
                    text: '用户学校分布图',
                    padding: [20,20,40,40],
                },
                backgroundColor: '#FFFFFF',
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:235, name:'华农'},
                            {value:274, name:'非华农'},
                        ],
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(0, 0, 0, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })            
        }
            
    },
    mounted() {
        this.draw()
    },
}
</script>
<style>

</style>
