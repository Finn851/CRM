import styles from './Funnels.module.css'
import { useState, useEffect } from 'react'
import Deal from './Deal/Deal'

const Funnel = (props) => {
    const Stages = props.stages

    const [stages, setStages] = useState(Stages)
    const [currentStage, setCurrentStage] = useState(null)
    const [currentDeal, setCurrentDeal] = useState(null)

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
        postData(updatedStages); // Отправка данных после обновления состояния stages
        return updatedStages
    }

    async function postData(data) {
        const formData = new URLSearchParams();
        formData.append('data', JSON.stringify(data))
        formData.append('funnelID', props.funnelID)
        await fetch('/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
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
                {stage.deals.map(deal => <div onDragOver={(e) => dragOverHandler(e)}
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