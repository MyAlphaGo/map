import Map from './components/map'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'
import { Statistic, Radio, Table } from 'antd'

import './index.less';

export default () => {
  const [china, setchina] = useState();
  const [data, setdata] = useState();
  const [mapData, setmapData] = useState();
  const [briefdata, setbriefdata] = useState([]);
  const [allData, setallData] = useState();
  const [foreign, setforeign] = useState();
  const [swit, setswit] = useState('now')

  useEffect(() => {
    $.get('https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json', (chinaJson) => {
      $.ajax({
        async: true,
        url: "https://voice.baidu.com/newpneumonia/get?target=trend&isCaseIn=0&stage=publish&callback=jsonp_1590028438493_84612",
        type: 'GET',
        dataType: 'jsonp',
        success: function (response, status, xhr) {
          setallData(filterAllData(response.data))
          setdata(response.data)
          setmapData(filterMapData(response.data))
          setbriefdata(filterBriefdata(response.data))
          setchina(chinaJson)
        }
      })
      $.ajax({
        async: true,
        url: "https://voice.baidu.com/newpneumonia/get?target=trend&isCaseIn=1&stage=publish&callback=jsonp_1590028438492_41119",
        type: 'GET',
        dataType: 'jsonp',
        success: function (response, status, xhr) {
          setforeign(filterAllData(response.data))
        }
      })
    })
  }, []);
  const filterMapData = (data, typ) => {
    if (typ === 'now' || !typ) {
      return data.map(item => {
        return {
          name: item.name,
          value: item.trend.list[0].data[item.trend.updateDate.length - 1] - item.trend.list[1].data[item.trend.updateDate.length - 1] - item.trend.list[2].data[item.trend.updateDate.length - 1]
        }
      })
    } else {
      return data.map(item => {
        return {
          name: item.name,
          value: item.trend.list[0].data[item.trend.updateDate.length - 1]
        }
      })
    }

  }
  const filterBriefdata = (data) => {
    let nowDate = new Date();
    nowDate = nowDate.getMonth() + 1 + '.' + (nowDate.getDate() - 1)
    let statistics = [{ name: '累计确诊', num: 0, sum: 0 }, { name: '累计治愈', num: 0, sum: 0 }, { name: '累计死亡', num: 0, sum: 0 }, { name: '现有确诊', num: 0, sum: 0 }]
    let old = [0, 0, 0, 0]
    let temp = [0, 0, 0, 0]
    data.map(item => {
      if (item.trend.updateDate[item.trend.updateDate.length - 1] === nowDate) {
        statistics[0].num += item.trend.list[0].data[item.trend.list[0].data.length - 1]
        statistics[1].num += item.trend.list[1].data[item.trend.list[1].data.length - 1]
        statistics[2].num += item.trend.list[2].data[item.trend.list[2].data.length - 1]

        old[0] += item.trend.list[0].data[item.trend.list[0].data.length - 2]
        old[1] += item.trend.list[1].data[item.trend.list[1].data.length - 2]
        old[2] += item.trend.list[2].data[item.trend.list[2].data.length - 2]
      } else {
        temp[0] += item.trend.list[0].data[item.trend.list[0].data.length - 1]
        temp[1] += item.trend.list[1].data[item.trend.list[1].data.length - 1]
        temp[2] += item.trend.list[2].data[item.trend.list[2].data.length - 1]

      }
    })
    statistics = statistics.map((item, i) => {
      return {
        ...item,
        sum: item.num - old[i]
      }
    })
    statistics[3].num = statistics[0].num - statistics[1].num - statistics[2].num
    statistics[3].sum = statistics[3].num - (old[0] - old[1] - old[2])

    statistics[0].num += temp[0]
    statistics[1].num += temp[1]
    statistics[2].num += temp[2]
    return statistics
  }
  const handleMapData = (e) => {
    if (e.target.value === swit) {
      return
    }
    setmapData(filterMapData(data, e.target.value))
    setswit(e.target.value)

  }
  const filterAllData = (data) => {
    return data.map((item, i) => {
      return {
        name: item.name,
        key: i,
        now: item.trend.list[0].data[item.trend.updateDate.length - 1] - item.trend.list[1].data[item.trend.updateDate.length - 1] - item.trend.list[2].data[item.trend.updateDate.length - 1],
        add: item.trend.list[3].data[item.trend.list[3].data.length - 1],
        die: item.trend.list[2].data[item.trend.list[2].data.length - 1],
        sure: item.trend.list[0].data[item.trend.list[0].data.length - 1],
        cure: item.trend.list[1].data[item.trend.list[1].data.length - 1],
      }
    })
  }
  const columns = [
    {
      title: '疫情地区',
      dataIndex: 'name'
    },
    {
      title: '新增',
      dataIndex: 'add',
      sorter: {
        compare: (a, b) => a.add - b.add
      },
      // responsive: ['md'],
    },
    {
      title: '现有',
      dataIndex: 'now',
      sorter: {
        compare: (a, b) => a.now - b.now
      },
      // responsive: ['md'],
    },
    {
      title: '累计确诊',
      dataIndex: 'sure',
      sorter: {
        compare: (a, b) => a.sure - b.sure
      },
      // responsive: ['md'],
    },
    {
      title: '治愈',
      dataIndex: 'cure',
      sorter: {
        compare: (a, b) => a.cure - b.cure
      },
      // responsive: ['md'],
    },
    {
      title: '死亡',
      dataIndex: 'die',
      sorter: {
        compare: (a, b) => a.die - b.die
      },
      // responsive: ['md'],
    },
  ]
  return (
    <div className="circularBead">
      <div className="briefdata">
        <div className="title">国内疫情</div>
        <div className="briefdata-data">{
          briefdata.map(item => {
            return <div key={item.name}>
              <Statistic title={item.name} value={item.num} />
              <div>昨日<span>{item.sum >= 0 ? `+${item.sum}` : `${item.sum}`}</span></div>
            </div>
          })
        }
        </div>
      </div>
      <div className="map">
        <Radio.Group className="switchMap" size="large" value={swit} onChange={handleMapData}>
          <Radio.Button value="now">现有确诊</Radio.Button>
          <Radio.Button value="all">累计确诊</Radio.Button>
        </Radio.Group>
        <p>{swit == 'now' ? "现有确诊病例数，排除治愈、死亡" : "累计确诊病例数，包含治愈、死亡"}</p>
        <Map china={china} mapData={mapData}></Map>
      </div>
      <div className="maptable">
        <div className="title">国内各地区疫情统计汇总</div>
        <Table columns={columns} dataSource={allData}></Table>
      </div>
      <div className="maptable">
        <div className="title">国外各地区疫情统计汇总</div>
        <Table columns={columns} dataSource={foreign}></Table>
      </div>
    </div>
  )
}