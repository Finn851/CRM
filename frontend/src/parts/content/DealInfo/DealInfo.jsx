import { NavLink } from "react-router-dom"
import styles from './DealInfo.module.css'

const DealInfo = (props) => {
    return(
        <div className={styles.dealInfo}>
            <div className={styles.dealInfoContainer}>
                <h1>{props.deal.name}</h1>
                <p>{props.deal.price}</p>
                <NavLink to={"/dashboard/"+localStorage.getItem('selectedOption')}>Вернуться назад</NavLink>
            </div>
        </div>
    )
}

export default DealInfo