import styles from "./Deal.module.css"
import { useEffect } from "react";

const Deal = (props) => {
    useEffect(() => {
        document.querySelectorAll('#price').forEach((node) => {
            console.log(node)
            if (!isNaN(node.textContent)) {
                node.textContent = new Intl.NumberFormat('ru-RU', {
                    currency: 'rub',
                    style: 'currency',
                }).format(node.textContent);
            }
        });
    }, []);
    return(
        <div className={styles.deal}>
            <h2 className={styles.deal__title}>Название сделки: {props.dealName}</h2>
            <p className={styles.deal__price}>Цена: <span id="price">{props.dealPrice}</span></p>
            <div className={styles.deal__info}>
                <p>Описание сделки:</p>
                <p>Дата: 15 июля 2023</p>
                <p>Клиент: Иван Иванов</p>
            </div>
            <a className={styles.deal__button} href="/deals/{{id}}">Рассмотреть сделку</a>
        </div>
    )
}

export default Deal