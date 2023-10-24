import { useCallback, useEffect, useRef, useState } from "react";

import { debounce } from "../../lib/utils";

import TabSelector from "../../components/selector/tab";
import DropdownSelector from "../../components/selector/dropdown";

import * as echarts from "echarts";
import { cn } from "../../lib/utils";

const option = (type, data) => {

    switch (type) {
        case 'pie':
            return {
                title: {
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}<br />{b}:{c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    top: '24px'
                },
                series: [
                    {
                        name: '支出分类',
                        type: 'pie',
                        radius: '50%',
                        label: {
                            formatter: '{b} {d}%',
                        },
                        data: [
                            { value: 1048, name: '打胶' },
                            { value: 735, name: '吃饭' },
                            { value: 580, name: '购物' },
                            { value: 484, name: '出行' },
                            { value: 300, name: '电费' },
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
            }
        case 'line':
            return {
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
                            width: 3,
                            color: '#d50000',
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1.1, [
                                { offset: 0, color: '#ff0909' },
                                { offset: 1, color: '#ffffff' },
                            ])
                        },
                        data: [120, 132, 101, 134, 90, 0]
                    }
                ]
            }
    }
}
export default function Chart({ chartType, title, className, data }) {

    const [typeState, setTypeState] = useState('支出')
    const [timeState, setTimeState] = useState('月')
    const chartsRef = useRef();

    const resizeCharts = useCallback((charts) => {
        charts.resize();
    }, [])

    useEffect(() => {
        const chartsDom = chartsRef.current;

        const charts = echarts.getInstanceByDom(chartsDom) || echarts.init(chartsDom);

        charts.setOption(option(chartType));

        window.addEventListener('resize', debounce(() => resizeCharts(charts), 500))
    }, [])


    return (
        <>
            <p className={cn(" absolute top-0 left-[28px] font-semibold text-lg text-zinc-600", className)}>
                <span className=" absolute bottom-0 left-0 h-[5px] w-[28px] rounded-full bg-gradient-to-r from-primary to-transparent"></span>
                {title}
            </p>
            <div className=" absolute top-0 right-2 z-20 flex flex-row gap-1">
                <TabSelector value={typeState} onChangeValue={(value)=>setTypeState(value)} valuesOption={['支出', '收入', '收支']} />
                <DropdownSelector value={timeState} onChangeValue={(value)=>setTimeState(value)} valuesOption={['年', '月', '星期']} />
            </div>
            <div ref={chartsRef} className=" h-full w-full "></div>
        </>
    )
}