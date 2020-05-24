import './index.less'
import $ from 'jquery'
import { useEffect, useState } from 'react'
import { Select, Timeline,Card } from 'antd'
const { Option } = Select
const { Item } = Timeline
export default () => {
    const [message, setmessage] = useState();
    const [select, setselect] = useState('china');
    function formatDate(now) {
        let tempDate = new Date(now * 1000)
        var month = tempDate.getMonth() + 1;
        var date = tempDate.getDate();
        var hour = tempDate.getHours();
        var minute = tempDate.getMinutes();
        return month + "月 " + date + "日" + hour + ":" + minute
    }
    useEffect(() => {
        $.ajax({
            async: true,
            url: "https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E8%82%BA%E7%82%8E&cb=jsonp_1590148757958_10976",
            type: 'GET',
            jsonp: 'cb', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
            jsonpCallback: 'jsonp_1590148757958_10976', //设置回调函数名
            dataType: 'jsonp',
            success: function (response, status, xhr) {
                let data = response.Result[0].DisplayData.result.items.map(item => {
                    return {
                        ...item,
                        eventTime: formatDate(item.eventTime)
                    }
                })
                setmessage(data)
            }
        })
    }, []);
    const handleChange = (value) => {
        if (value == select) {
            return
        }
        if (value == 'china') {
            $.ajax({
                async: true,
                url: "https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E8%82%BA%E7%82%8E&cb=jsonp_1590148757958_10976",
                type: 'GET',
                jsonp: 'cb', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
                jsonpCallback: 'jsonp_1590148757958_10976', //设置回调函数名
                dataType: 'jsonp',
                success: function (response, status, xhr) {
                    let data = response.Result[0].DisplayData.result.items.map(item => {
                        return {
                            ...item,
                            eventTime: formatDate(item.eventTime)
                        }
                    })
                    setmessage(data)
                    setselect('china')
                }
            })
        } else {
            $.ajax({
                async: true,
                url: "https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E6%96%B0%E5%86%A0%E8%82%BA%E7%82%8E%E5%9B%BD%E5%A4%96%E7%96%AB%E6%83%85&cb=jsonp_1590148757959_77839",
                type: 'GET',
                jsonp: 'cb', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
                jsonpCallback: 'jsonp_1590148757959_77839', //设置回调函数名
                dataType: 'jsonp',
                success: function (response, status, xhr) {
                    let data = response.Result[0].DisplayData.result.items.map(item => {
                        return {
                            ...item,
                            eventTime: formatDate(item.eventTime)
                        }
                    })
                    setmessage(data)
                    setselect('world')
                }
            })
        }
    }
    return (
        <div className='message circularBead' >
            <div className="title">实时播报
            <Select defaultValue='china' style={{ width: 120, marginLeft: 20 }} onChange={handleChange}>
                    <Option value='china'>国内资讯</Option>
                    <Option value='world'>国外资讯</Option>
                </Select></div>

            <Timeline mode="left" className="message-body">{
                message && message.map(item => {
                    return <Item
                        label={item.eventTime}
                        key={item.bjh_na.nid}>
                            
                        <a target="_Blank" href={item.eventUrl}><Card extra={<span className="xiangqing">点击查看详情</span>} hoverable='true' title={item.siteName}>{item.eventDescription}</Card></a>
                    </Item>
                })
            }
            </Timeline>

        </div>
    )
}