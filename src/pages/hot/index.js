import { useEffect, useState } from "react"
import $ from 'jquery'
import { Tabs, List, Divider } from 'antd'
const { TabPane } = Tabs

import './index.less'

export default () => {
    const [hot, sethot] = useState([]);
    const title = ["今日疫情热搜", "防疫知识热搜", "热搜谣言粉碎", "复工复课热搜"]
    useEffect(() => {
        $.ajax({
            async: true,
            url: "https://opendata.baidu.com/api.php?query=%E5%85%A8%E5%9B%BD&resource_id=39258&tn=wisetpl&format=json&cb=jsonp_1590240252317_55551",
            type: 'GET',
            jsonp: 'cb', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
            jsonpCallback: 'jsonp_1590240252317_55551', //设置回调函数名
            dataType: 'jsonp',
            success: function (response, status, xhr) {
                let data = response.data[0].list

                let hotTemp = []
                data.map((item, i) => {
                    if (i < 4) {
                        hotTemp.push(item)
                    }
                })
                sethot(hotTemp)
            }
        })
    }, []);
    return (
        <>
            <div className="title">疫情热搜</div>
            <div className="content">
                <Tabs type="card" defaultActiveKey='0' >{
                    hot.map((item, i) => {
                        return <TabPane key={item.title} tab={item.title}>
                            <List>{
                                hot[i] && hot[i].item.map((item, index) => {
                                    return <List.Item key={item.query}>
                                        <a target="_blank" href={item.url}>
                                            <span>{index + 1 + "  "}</span>
                                            <span>{item.query}</span>
                                            <span>{"  " + item.degree}</span>
                                        </a>
                                    </List.Item>
                                })}
                            </List>
                        </TabPane>
                    })}
                </Tabs>
            </div>
        </>
    )
}