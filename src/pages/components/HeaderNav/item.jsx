import { Link } from 'umi'
import './index.less'
const Item = (({ name, isSelected, link, handleClick, index }) => {
    const active = 'active'
    return (
        <div onClick={handleClick.bind(this, index)} className={isSelected ? 'active' : undefined} >
            <Link to={link} >{name}</Link>
        </div>

    )
})
export default Item