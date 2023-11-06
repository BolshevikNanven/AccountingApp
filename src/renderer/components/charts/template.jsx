import * as echarts from "echarts"

export const pieChartOptionTemplate = (type, data) => ({
    title: {
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}: <b>{c}元</b> ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        top: '24px'
    },
    series: [
        {
            name: type,
            type: 'pie',
            radius: '50%',
            label: {
                formatter: '{b} {d}%',
            },
            data: data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})
export const lineChartOptionTemplate = (color, xAxis, type, data) => ({
    title: {
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: xAxis
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: type,
            type: 'line',
            symbolSize: 7,
            color: `rgba(${color}1)`,
            lineStyle: {
                width: 3,
                color: `rgba(${color}1)`,
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1.1, [
                    { offset: 0, color: `rgba(${color}0.7)` },
                    { offset: 1, color: '#ffffff' },
                ])
            },
            data: data,
        }
    ]
})