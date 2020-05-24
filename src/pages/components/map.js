import echarts from 'echarts'

import React, { useEffect, useState, useCallback } from 'react';

export default ({ china, mapData }) => {

    let myChart
    //初始化地图
    useEffect(() => {
        myChart = echarts.init(document.getElementById('myMap'));
    })
    useEffect(() => {
        initMap()
    }, [china, mapData]);

    const initMap = () => {
        if (!china) {
            return
        }
        echarts.registerMap('china', china)
        let option = {
            backgroundColor: '#f8f9fa',
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                show: true,
                x: 'left',
                y: 'bottom',
                splitList: [
                    { gte: 10000 }, { start: 1000, end: 9999 },
                    { start: 100, end: 999 }, { start: 10, end: 99 },
                    { start: 1, end: 9 }, { start: 0, end: 0 },
                ],
                color: ['#b80909', '#e64546', '#f57567', '#ff9985', '#ffe5db', '#fff']
            },
            series: [{
                name: "确诊数",
                type: "map",
                mapType: 'china',
                layoutCenter: ['50%', '65%'],
                zoom:1.2,
                // layoutSize:500,
                roam: false,
                label: {
                    normal: {
                        show: true  //省份名称  
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: mapData,
                nameMap: {
                    '北京市': '北京',
                    '天津市': '天津',
                    '河北省': '河北',
                    '山西省': '山西',
                    '内蒙古自治区': '内蒙古',
                    '辽宁省': '辽宁',
                    '吉林省': '吉林',
                    '黑龙江省': '黑龙江',
                    '上海市': '上海',
                    '江苏省': '江苏',
                    '浙江省': '浙江',
                    '安徽省': '安徽',
                    '福建省': '福建',
                    '江西省': '江西',
                    '山东省': '山东',
                    '河南省': '河南',
                    '湖北省': '湖北',
                    '湖南省': '湖南',
                    '广东省': '广东',
                    '广西壮族自治区': '广西',
                    '海南省': '海南',
                    '重庆市': '重庆',
                    '四川省': '四川',
                    '贵州省': '贵州',
                    '云南省': '云南',
                    '西藏自治区': '西藏',
                    '陕西省': '陕西',
                    '甘肃省': '甘肃',
                    '青海省': '青海',
                    '宁夏回族自治区': '宁夏',
                    '新疆维吾尔自治区': '新疆',
                    '台湾省': '台湾',
                    '香港特别行政区': '香港',
                    '澳门特别行政区': '澳门',
                    '南海诸岛': '南海诸岛'
                },
                dataType: Number,
                areaColor: '#0FB8F0'
            }]
        }
        myChart.setOption(option, true);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    return (
        < >
            <div id="myMap" ></div>
        </>
    )
}