import { Layout, Menu } from 'antd'
import bg1 from '../img/bgimg.png'
import bg2 from '../img/bgimg2.png'
const { Header, Content } = Layout
const { Item } = Menu
import './index.less'

import HeadNav from '../pages/components/HeaderNav'

export default ({ children,location }) => {


    return (
        <Layout className="bg">
            <Header className="layout-header" style={{ position: 'fixed', zIndex: 99, width: '100%' }}>
                <div className="container">
                    <HeadNav location={location.pathname} ></HeadNav>
                </div>
            </Header>
            <Content className="layout" style={{ marginTop: 100 }}>
                <div className="container">
                    <div>
                        <div className="bgimg bg1">
                            <img src={bg1} alt="" />
                        </div>
                        <div className="bgimg bg2">
                            <img src={bg2} alt="" />
                        </div>
                    </div>

                    {children}
                </div>

            </Content>
        </Layout>
    )
}