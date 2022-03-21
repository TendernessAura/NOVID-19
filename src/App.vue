<template>
    <div style="color: white" class="box">
        <div class="box-left">
            <div class="box-left-card">
                <section>
                    <div>较上日+{{ store.chinaAdd.localConfirmH5 }}</div>
                    <div>{{ store.chinaTotal.localConfirm }}</div>
                    <div>本土现有确诊</div>
                </section>
                <section>
                    <div>较上日+{{ store.chinaAdd.nowConfirm }}</div>
                    <div>{{ store.chinaTotal.nowConfirm }}</div>
                    <div>现有确诊</div>
                </section>
                <section>
                    <div>较上日+{{ store.chinaAdd.confirm }}</div>
                    <div>{{ store.chinaTotal.confirm }}</div>
                    <div>累计确诊</div>
                </section>
                <section>
                    <div>较上日+{{ store.chinaAdd.noInfect }}</div>
                    <div>{{ store.chinaTotal.noInfect }}</div>
                    <div>无症状感染者</div>
                </section>
                <section>
                    <div>较上日+{{ store.chinaAdd.importedCase }}</div>
                    <div>{{ store.chinaTotal.importedCase }}</div>
                    <div>境外输入</div>
                </section>
                <section>
                    <div>较上日+{{ store.chinaAdd.dead }}</div>
                    <div>{{ store.chinaTotal.dead }}</div>
                    <div>累计死亡</div>
                </section>
            </div>
            <div class="box-left-pic"></div>
            <div class="box-left-line"></div>
        </div>
        <div id="china" class="box-center"></div>
        <div class="box-right" style="color: white">
            <table class="table" border="1" cellspacing="0">
                <thead>
                    <tr>
                        <th>地区</th>
                        <th>新增确诊</th>
                        <th>累计确诊</th>
                        <th>治愈</th>
                        <th>死亡</th>
                    </tr>
                </thead>
                <transition-group
                    enter-active-class="animate__animated animate__backInLeft"
                    tag="tbody"
                >
                    <tr v-for="item in store.item" :key="item.name">
                        <td align="center">{{ item.name }}</td>
                        <td align="center">{{ item.today.confirm }}</td>
                        <td align="center">{{ item.total.confirm }}</td>
                        <td align="center">{{ item.total.heal }}</td>
                        <td align="center">{{ item.total.dead }}</td>
                    </tr>
                </transition-group>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from './stores'
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import './assets/china'
import { geoCoordMap } from './assets/geoMap'
import 'animate.css'

const store = useStore()
//初始化地图
const initCharts = () => {
    const city = store.list.data.diseaseh5Shelf.areaTree[0].children
    store.item = city[1].children
    let data = city.map((v) => {
        return {
            name: v.name,
            value: geoCoordMap[v.name].concat(v.total.nowConfirm),
            children: v.children
        }
    })

    const charts = echarts.init(document.querySelector('#china') as HTMLElement)
    charts.setOption({
        geo: {
            map: 'china',
            aspectScale: 0.8,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            itemStyle: {
                areaColor: {
                    type: 'linear-gradient',
                    x: 0,
                    y: 1200,
                    x2: 1000,
                    y2: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#152E6E' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#0673AD' // 50% 处的颜色
                        }
                    ],
                    global: true // 缺省为 false
                },
                shadowColor: '#0f5d9d',
                shadowOffsetX: 0,
                shadowOffsetY: 15,
                opacity: 0.5
            },
            emphasis: {
                areaColor: '#0f5d9d'
            },

            regions: [
                {
                    name: '南海诸岛',
                    itemStyle: {
                        areaColor: 'rgba(0, 10, 52, 1)',
                        borderColor: 'rgba(0, 10, 52, 1)',
                        opacity: 0,
                        label: {
                            show: false,
                            color: '#009cc9'
                        }
                    },
                    label: {
                        show: false,
                        color: '#FFFFFF',
                        fontSize: 12
                    }
                }
            ]
        },
        series: [
            {
                type: 'map',
                map: 'china',
                aspectScale: 0.8,
                layoutCenter: ['50%', '50%'], //地图位置
                layoutSize: '100%',
                label: {
                    show: true,
                    color: '#FFFFFF',
                    fontSize: 12
                },
                itemStyle: {
                    areaColor: '#0c3653',
                    borderColor: '#1cccff',
                    borderWidth: 1.8
                },
                emphasis: {
                    areaColor: '#56b1da',
                    label: {
                        show: true,
                        color: '#fff'
                    }
                },
                data: data
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [50, 50],
                label: {
                    show: true,
                    color: '#fff',
                    formatter(value: any) {
                        return value.data.value[2]
                    }
                },
                itemStyle: {
                    color: '#1E90FF' //标志颜色
                },
                data: data
            }
        ]
    })
    charts.on('click', (e: any) => {
        store.item = e.data.children
    })
}
//初始化饼图
const initPic = () => {
    const charts = echarts.init(
        document.querySelector('.box-left-pic') as HTMLElement
    )
    charts.setOption({
        backgroundColor: '#223651',
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                data: store.cityDetail.map((v) => {
                    return {
                        name: v.city,
                        value: v.nowConfirm
                    }
                })
            }
        ]
    })
}
//初始化折线图
const initLine = () => {
    const charts = echarts.init(
        document.querySelector('.box-left-line') as HTMLElement
    )
    charts.setOption({
        backgroundColor: '#223651',
        xAxis: {
            type: 'category',
            data: store.cityDetail.map((v) => v.city),
            axisLine: {
                linestyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                linestyle: {
                    color: '#fff'
                }
            }
        },
        label: {
            show: true
        },
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                data: store.cityDetail.map((v) => v.nowConfirm),
                type: 'line',
                smooth: true
            }
        ]
    })
}

onMounted(async () => {
    await store.getList()
    initCharts()
    initPic()
    initLine()
})
</script>

<style lang="less">
.table {
    width: 100%;
    background: #212028;
    tr {
        th {
            padding: 5px;
            white-space: nowrap;
        }
        td {
            padding: 5px 10px;
            width: 100px;
            white-space: nowrap;
        }
    }
}
* {
    padding: 0;
    margin: 0;
}
@itemBg: #223651;
@itemColor: #41b0db;
@itemBorder: #212020;
html,
body,
#app {
    height: 100%;
    overflow: hidden;
}
.box {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
    &-left {
        width: 400px;
        &-card {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-template-rows: auto auto;
            section {
                background: @itemBg;
                border: 1px solid @itemColor;
                padding: 10px;
                flex-direction: column;
                align-items: center;
                div:nth-child(2) {
                    color: @itemColor;
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
        &-pic {
            height: 350px;
            margin-top: 20px;
        }
        &-line {
            height: 350px;
            margin-top: 20px;
        }
    }
    &-center {
        flex: 1;
        height: 1080px;
    }
    &-right {
        width: 400px;
    }
}
</style>
