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
                symbolSize: 7,
                symbolColor: '#bc0000',
                color: '#d50000',
                lineStyle: {
                    normal: {
                        width: 3,
                        color: '#d50000',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1.1, [
                            { offset: 0, color: '#ff0909' },
                            { offset: 1, color: '#ffffff' },
                        ])
                    }
                },
                data: [120, 132, 101, 134, 90, 0]
            }
        ]
    }
};

export default function Chart({ chartType, title }) {


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
            <p className=" absolute top-0 left-[28px] font-semibold text-lg text-zinc-600">
                <span className=" absolute bottom-0 left-0 h-[5px] w-[28px] rounded-full bg-gradient-to-r from-primary to-transparent"></span>
                {title}
            </p>
            
            <div ref={chartsRef} className=" h-full w-full "></div>
        </>
    )
}