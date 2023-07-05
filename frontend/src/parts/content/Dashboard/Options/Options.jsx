import CreateStage from '../CreateStage/CreateStage';
import CreateDeal from '../CreateDeal/CreateDeal';
import styles from './Options.module.css'

const Options = (props) => {
    return(
        <div className={styles.dashboard__options}>
            <select className={styles.dashboard__selections}>
                <option selected value="new">Самые новые</option>
                <option value="price">По цене</option>
            </select>
            <CreateStage rerender={props.rerender} />
            <CreateDeal stages={props.stages} rerender={props.rerender} />
        </div>
    )
}

export default Options