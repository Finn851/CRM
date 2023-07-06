import 'react-toastify/dist/ReactToastify.css';
import styles from './Notifications.module.css'
const Notifications = (props) => {
    return(
        <div>
            {props.user.notifications.map(n => <div className={styles.notification}><span>{n.notificationText}</span> <span>{n.time} {n.date}</span></div>)}
        </div>
    )
}

export default Notifications
