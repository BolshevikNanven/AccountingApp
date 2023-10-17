import { useCallback, useEffect, useRef, useState } from "react";

import { debounce } from "../../lib/utils";

import * as echarts from "echarts";

const option = {
    'pie': {
        title: {
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '打胶' },
                    { value: 735, name: '吃饭' },
                    { value: 580, name: '购物' },
                    { value: 484, name: '出行' },
                    { value: 300, name: '电费' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    },
    'line': {
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                symbolSize: 6,
                color: '#d50000',
                lineStyle: {
                    normal: {
                        color: '#d50000',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1.1, [
                            { offset: 0, color: '#d50000' },
                            { offset: 1, color: '#ffffff' },
                        ])
                    }
                },
                data: [120, 132, 101, 134, 90, 0]
            }
        ]
    }
};

export default function Chart({ chartType }) {


    const chartsRef = useRef();

    const resizeCharts = useCallback((charts) => {
        charts.resize();
    }, [])

    useEffect(() => {
        const chartsDom = chartsRef.current;

        const charts = echarts.init(chartsDom);

        charts.setOption(option[chartType]);

        window.addEventListener('resize', debounce(() => resizeCharts(charts), 500))


    }, [])


    return (
        <>
            <div ref={chartsRef} className=" h-full w-full "></div>
        </>
    )
}