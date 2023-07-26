import { useState, useEffect } from "react"
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import nextId from "react-id-generator";

const CreateDeal = (props) => {

    let Stages = props.stages

    Stages.forEach(el => {
        if(!el.deals){
            el.deals = []
        }
    });

    const [dealName, setDealName] = useState(null)
    const [dealPrice, setDealPrice] = useState(null)
    const [dealStage, setDealStage] = useState(Stages.length ? Stages[0].id : null)

    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    
    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;
    };

    function dealNameChange(ev) {
        setDealName(ev.target.value);
    }
    function dealPriceChange(ev) {
        setDealPrice(ev.target.value);
    }
    function dealStageChange(ev) {
        setDealStage(ev.target.value);
    }

    function postDeal(e) {
        e.preventDefault();

        //Create deal
        const database = firebase.database();
        const ref = database.ref('/data');
        const d = props.data
        d.forEach(el => {
            if(el.funnelID === localStorage.getItem('selectedOption')){
                el.funnel.forEach(element => {
                    if(element.id === dealStage){
                        element.deals.push({
                            id: nextId('deal'),
                            name: dealName,
                            price: dealPrice
                        })
                        el.dealsSum += dealPrice
                    }
                });
            }
        });
        ref.set(d)

        const formData = new URLSearchParams();
        formData.append('stageNotificationText', 'Создана сделка')
        formData.append('stageNotificationDate', getCurrentTime() + ' ' + getCurrentDate())
        formData.append('userID', localStorage.getItem('userID'))
        formData.append('funnelID', localStorage.getItem('selectedOption'))

        fetch('/dashboard/postDeal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error(error);
            });
    }

    const openModal = () => {
        const modal = document.getElementById('modal1');
        const dealDrugs = document.querySelectorAll('.deal-drug')
        modal.style.display = 'block';
        dealDrugs.forEach(dd => {
            dd.style.zIndex = -1
        })
      }

      const closeModal = () => {
        const modal = document.getElementById('modal1');
        const dealDrugs = document.querySelectorAll('.deal-drug')
        modal.style.display = 'block';
        dealDrugs.forEach(dd => {
            dd.style.zIndex = 1
        })
        modal.style.display = 'none';
      }

    useEffect(() => {
        const modal = document.getElementById('modal1');
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                const dealDrugs = document.querySelectorAll('.deal-drug')
                modal.style.display = 'block';
                dealDrugs.forEach(dd => {
                    dd.style.zIndex = 1
                })
                modal.style.display = 'none';
            }
        });
    }, [window])

    return(
        <div className="createDeal">
            <div id="openModalButton" onClick={openModal} class="button">Создать сделку</div>
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <span class="close" id="closeModalButton" onClick={closeModal}>&times;</span>
                    <form onSubmit={postDeal} class="details-modal-content">
                        <div>
                            <label for="title">Название сделки</label>
                            <input id="title" value={dealName} name="title" type="text" onChange={(e) => dealNameChange(e)} />
                        </div>
                        <div>
                            <label for="price">Цена сделки</label>
                            <input id="price" value={dealPrice} name="price" type="number" onChange={(e) => dealPriceChange(e)} />
                        </div>
                        <div>
                            <label for="stage">Этап сделки</label>
                            <select id="stage" name="stage" onChange={(e) => dealStageChange(e)}>
                                {Stages.map(stage => <option value={stage.id}>{stage.name}</option>)}
                            </select>
                        </div>
                        <button type='submit' class="details-modal-title">Создать сделку</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateDeal