import { NavLink, Route } from "react-router-dom";
import styles from "./Deal.module.css"
import { FormattedNumber } from 'react-intl';

const Deal = (props) => {
    return(
        <div className={styles.deal}>
            <h2 className={styles.deal__title}>Название сделки: {props.dealName}</h2>
            <p className={styles.deal__price}>Цена: {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                }).format(props.dealPrice)}</p>
            <div className={styles.deal__info}>
                <p>Описание сделки:</p>
                <p>Дата: 15 июля 2023</p>
                <p>Клиент: Иван Иванов</p>
            </div>
            <NavLink className={styles.deal__button} to={'/' + props.dealID}>Рассмотреть сделку</NavLink>
        </div>
    )
}

export default Deal