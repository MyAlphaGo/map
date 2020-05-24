import Item from './item'
import React, { useState, useEffect } from 'react'
const HeaderNav = ({ location }) => {

    const [menu, setmenu] = useState([
        { name: '疫情最新数据', isSelected: false, link: '/' },
        { name: '实时播报', isSelected: false, link: '/message' },
        { name: '预防策略', isSelected: false, link: '/prevent' },
        { name: '疫情热搜', isSelected: false, link: '/hot' },
    ]);
    const [select, setselect] = useState(-1);

    useEffect(() => {
        let temp = menu
        let index = -1
        temp.map((item, i) => {
            if (item.link === location) {
                index = i
            }
        })
        if (select !== -1) {
            temp[select].isSelected = false
        }
        setselect(index)
        if (index !== undefined && index !== -1) {
            temp[index].isSelected = true
        }
        setmenu(temp)
    }, [location]);


    const handleClick = (item) => {
        let lmenu = menu
        if (select !== -1) {
            lmenu[select].isSelected = false
        }
        setselect(item)
        lmenu[item].isSelected = true
        setmenu(lmenu)
    }


    return (
        <div className='header-nav-container'>
            <div className="menu">
                {
                    menu.map((item, i) => {
                        if (i <= 3) {
                            return <Item
                                key={i}
                                index={i}
                                name={item.name}
                                isSelected={item.isSelected}
                                link={item.link}
                                handleClick={handleClick} />
                        }

                    })
                }
            </div>

        </div>
    )
}

export default HeaderNav