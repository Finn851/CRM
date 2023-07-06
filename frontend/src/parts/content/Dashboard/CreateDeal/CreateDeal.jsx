import { useState, useEffect } from "react"

const CreateDeal = (props) => {

    let Stages = props.stages

    const [dealName, setDealName] = useState(null)
    const [dealPrice, setDealPrice] = useState(null)
    const [dealStage, setDealStage] = useState(Stages.length ? Stages[0].id : null)

    const [formDealSubmitted, setFormDealSubmitted] = useState(false);

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
        const formData = new URLSearchParams();
        formData.append('dealName', dealName)
        formData.append('dealPrice', dealPrice)
        formData.append('dealStage', dealStage)
        formData.append('stageNotificationText', 'Создана сделка')
        formData.append('stageNotificationDate', getCurrentTime() + ' ' + getCurrentDate())
        formData.append('userID', localStorage.getItem('userID'))

        fetch('/dashboard/postDeal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setFormDealSubmitted(true);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (formDealSubmitted) {
            props.rerender.RerenderEntireTree()
            window.location.reload()
            setFormDealSubmitted(false);
        }
    }, [formDealSubmitted]);
    return(
        <details className="createDeal">
            <summary>
                <div class="button">
                    Создать сделку
                </div>
                <div class="details-modal-overlay"></div>
            </summary>
            <div class="details-modal">
                <div class="details-modal-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                            fill="black" />
                    </svg>
                </div>
                <div class="details-modal-title">
                    <h1>Создать сделку</h1>
                </div>

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
        </details>
    )
}

export default CreateDeal