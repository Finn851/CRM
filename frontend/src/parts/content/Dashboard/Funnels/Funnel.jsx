import styles from './Funnels.module.css'
import { useState, useEffect } from 'react'
import Deal from './Deal/Deal'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';


const Funnel = (props) => {
    const Stages = props.stages

    Stages.forEach(el => {
        if(!el.deals){
            el.deals = []
        }
    });

    const [stages, setStages] = useState(Stages)
    const [currentStage, setCurrentStage] = useState(null)
    const [currentDeal, setCurrentDeal] = useState(null)

    useEffect(() => {
        setStages(Stages);
    }, [props.data]);

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e, stage, deal) {
        setCurrentStage(stage)
        setCurrentDeal(deal)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e) {
        e.preventDefault()
        e.target.style.boxShadow = 'none'
    }

    function dropDealHandler(e, stage) {
        stage.deals.push(currentDeal);
        currentStage.dealsSum = currentStage.dealsSum - currentDeal.price;
        stage.dealsSum = stage.dealsSum + currentDeal.price;
        const currentIndex = currentStage.deals.indexOf(currentDeal);
        currentStage.deals.splice(currentIndex, 1);
        const updatedStages = stages.map((b) => {
            if (b.id === stage.id) {
                return stage;
            }
            if (b.id === currentStage.id) {
                return currentStage;
            }
            return b;
        });
        setStages(updatedStages);
        const d = props.data
        d.forEach(el => {
            if(el.funnelID === props.funnelID){
                el.funnel = updatedStages
            }
        })
        postData(d)
    }

    function postData(data) {
        const database = firebase.database();
        const ref = database.ref('/data');
        ref.set(data);
    }

    return(
        <div className={styles.dashboard__stages}>
            {stages.map(stage => <div className={styles.dashboard__stage}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropDealHandler(e, stage)}
            >
                <div className={styles.dashboard__stageInner} style={{ 'border-bottom': `3px solid ${stage.color}` }}>
                    <h5 className={styles.dashboard__stageHead}>{stage.name}</h5>
                    <div>
                        <p className={styles.dashboard__stageDeals}><span>{stage.deals.length}</span> сделок</p>
                        <p className={styles.dashboard__stagePrice}><span id="price">{stage.dealsSum}</span></p>
                    </div>
                </div>
                {stage.deals.map(deal => <div className={styles.deal_drug} onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragStart={(e) => dragStartHandler(e, stage, deal)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDrop={(e) => { dropHandler(e); }}
                    draggable={true}><Deal className={styles.deal}
                    dealName={deal.name} dealPrice={deal.price}/></div>
                )}
            </div>
            )}
        </div>
    )
}

export default Funnel