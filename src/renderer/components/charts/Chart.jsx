import { useCallback, useEffect, useRef, useState } from "react";

import { computeNumber, debounce } from "../../lib/utils";

import TabSelector from "../../components/selector/tab";

import * as echarts from "echarts";
import { cn } from "../../lib/utils";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(customParseFormat)

import { lineChartOptionTemplate, pieChartOptionTemplate } from "./template";
import { useTheme } from "../theme/theme";
import { useGlobalState } from "../../store/provider/state-provider";


export default function Chart({ chartType, title, className, billdata }) {

    const [typeState, setTypeState] = useState('支出')
    const timeState = useGlobalState()[0].chartRange || ['近7天']
    const chartsRef = useRef();
    const [theme, setTheme] = useTheme()


    const timeFilterData = useCallback((range, inout, data) => {
        let dataMap = new Map();
        let headDay = dayjs(), tailDay = dayjs();

        switch (range[0]) {
            case '近7天': {
                headDay = dayjs().subtract(6, 'day');
                tailDay = dayjs().add(1, 'day');
                break;
            }
            case '月': {
                headDay = dayjs(range[1], 'YYYY年MM月').startOf('month')
                tailDay = dayjs(range[1], 'YYYY年MM月').endOf('month').add(1, 'day')
                break;
            }
            case '年': {
                headDay = dayjs(range[1], 'YYYY年').startOf('year')
                tailDay = dayjs(range[1], 'YYYY年').endOf('year').add(1, 'day')
                break;
            }
        }

        for (let item of data) {
            if (dayjs(item.datetime).isBefore(headDay, 'day')) {
                break
            }
            if (!inoutFilter(inout, item)) {
                continue
            }

            if (dayjs(item.datetime).isBefore(tailDay, 'day')) {
                const formatDate = range[0] === '年' ? dayjs(item.datetime).format('YYYY-MM') : dayjs(item.datetime).format('YYYY-MM-DD')

                if (dataMap.has(formatDate)) {
                    dataMap.set(formatDate, [...dataMap.get(formatDate), item])
                } else {
                    dataMap.set(formatDate, [item])
                }
            }

        }

        return dataMap;

    }, [])
    const lineFilterData = useCallback((range, inout, data) => {
        let dataMap = timeFilterData(range, inout, data);
        let headDay = dayjs();
        let sum = 0;

        switch (range[0]) {
            case '近7天': {
                sum = 7;
                headDay = dayjs().subtract(6, 'day');
                break;
            }
            case '月': {
                sum = dayjs(range[1], 'YYYY年MM月').daysInMonth();
                headDay = dayjs(range[1], 'YYYY年MM月').startOf('month')
                break;
            }
            case '年': {
                sum = 12;
                headDay = dayjs(range[1], 'YYYY年').startOf('year')
                break;
            }
        }


        let dataArray = Array(sum).fill(0);
        dataArray.forEach((value, index) => {
            const dateKey = range[0] === '年' ? headDay.add(index, 'month').format('YYYY-MM') : headDay.add(index, 'day').format('YYYY-MM-DD')
            if (dataMap.has(dateKey)) {
                dataMap.get(dateKey).forEach(i => dataArray[index] = computeNumber(dataArray[index], '+', (inout === '收支' ? i.count : Math.abs(i.count))))
            }
        })
        return dataArray

    }, [])

    const pieFilterData = useCallback((range, inout, data) => {
        let dataMap = timeFilterData(range, inout, data);

        let classObj = {};

        for (let mapvalues of dataMap.values()) {
            mapvalues.forEach(value => {
                const bigType = (inout === '支出' ? value.big_type : value.type)
                if (classObj.hasOwnProperty(bigType)) {
                    classObj[bigType] = computeNumber(Math.abs(value.count), '+', classObj[bigType])
                } else {
                    classObj[bigType] = Math.abs(value.count)
                }
            })
        }

        return Object.keys(classObj).map(key => (
            { value: classObj[key], name: key }
        ))

    }, [])

    const inoutFilter = useCallback((inout, bill) => {
        if (inout === '支出' && bill.count < 0) {
            return true;
        }
        if (inout === '收入' && bill.count > 0) {
            return true;
        }
        if (inout === '收支') {
            return true;
        }
        return false;

    }, [])
    const getLinexAxis = useCallback((range) => {
        let xAxis = [];
        if (range[0] === '近7天') {
            let date = dayjs().subtract(6, 'day');
            for (let i = 0; i < 7; i++) {
                xAxis.push(date.add(i, 'day').format('周dd'));
            }
        }
        if (range[0] === '月') {
            for (let i = 1; i <= dayjs(range[1], 'YYYY年MM月').daysInMonth(); i++) {
                xAxis.push(i + '号')
            }
        }
        if (range[0] === '年') {
            xAxis = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
        return xAxis;
    }, [])

    const getChartOption = () => {
        if (chartType === 'line') {
            const data = lineFilterData(timeState, typeState, billdata);
            const xAxis = getLinexAxis(timeState);
            const color = typeState !== '支出' ? '220,38,38,' : '5,150,105,';

            return lineChartOptionTemplate(color, xAxis, typeState, data);
        }
        if (chartType === 'pie') {
            const data = pieFilterData(timeState, typeState, billdata);

            return pieChartOptionTemplate(typeState, data);
        }

    }

    useEffect(() => {
        const chartsDom = chartsRef.current;

        const charts = echarts.getInstanceByDom(chartsDom) || echarts.init(chartsDom, theme === 'dark' && 'dark');

        charts.setOption(getChartOption());

        return () => {
            charts.dispose();
        }

    }, [typeState, timeState, theme, billdata])
    useEffect(() => {
        const chartsDom = chartsRef.current;
        const charts = echarts.getInstanceByDom(chartsDom) || echarts.init(chartsDom, theme === 'dark' && 'dark');


        window.addEventListener('resize', debounce(() => charts.resize(), 500))

    }, [])


    return (
        <>
            <p className={cn(" absolute top-0 left-[28px] font-semibold text-lg text-zinc-600 dark:text-zinc-200", className)}>
                <span className=" absolute bottom-0 left-0 h-[5px] w-[28px] rounded-full bg-primary"></span>
                {typeState + title}
            </p>
            <div className=" absolute top-0 right-2 z-20 flex flex-row gap-1">
                <TabSelector value={typeState} onChangeValue={(value) => setTypeState(value)} valuesOption={chartType === 'line' ? ['支出', '收入', '收支'] : ['支出', '收入']} />
            </div>
            <div ref={chartsRef} className=" h-full w-full "></div>
        </>
    )
}