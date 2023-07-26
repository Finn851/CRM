import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import nextId from "react-id-generator";

const CreateStage = (props) => {
    const [stageName, setStageName] = useState(null)

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

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function stageNameChange(ev) {
        setStageName(ev.target.value);
    }

    function postStage(e){
        e.preventDefault();

        //Create stage
        const database = firebase.database();
        const ref = database.ref('/data');
        const d = props.data
        d.forEach(el => {
            console.log(props.funnelID)
            if(el.funnelID === localStorage.getItem('selectedOption')){
                el.funnel.push({
                    id: nextId(),
                    name: stageName,
                    deals: [],
                    dealsSum: 0,
                    color: getRandomColor()
                })
            }
        });
        console.log(d)
        ref.set(d)

        //Notification
        const formData = new URLSearchParams();
        formData.append('stageNotificationText', 'Создан этап')
        formData.append('stageNotificationDate', getCurrentTime() + ' ' + getCurrentDate())
        formData.append('userID', localStorage.getItem('userID'))
        formData.append('funnelID', localStorage.getItem('selectedOption'))



        fetch('/dashboard/postStage', {
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
        const modal = document.getElementById('modal');
        const dealDrugs = document.querySelectorAll('.deal-drug')
        modal.style.display = 'block';
        dealDrugs.forEach(dd => {
            dd.style.zIndex = -1
        })
      }

      const closeModal = () => {
        const modal = document.getElementById('modal');
        const dealDrugs = document.querySelectorAll('.deal-drug')
        modal.style.display = 'block';
        dealDrugs.forEach(dd => {
            dd.style.zIndex = 1
        })
        modal.style.display = 'none';
      }

    useEffect(() => {
        const modal = document.getElementById('modal');
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
        <div className='createStage'>
            <div id="openModalButton" onClick={openModal} class="button">Создать этап</div>
            <div id="modal" class="modal">
                <div class="modal-content">
                    <span class="close" id="closeModalButton" onClick={closeModal}>&times;</span>
                    <form class="details-modal-content" id="nameForm" onSubmit={postStage}>
                        <div>
                            <label for="title">Название этапа</label>
                            <input id="title" value={stageName} name="title" type="text" onChange={(e) => stageNameChange(e)} />
                        </div>
                        <button type='submit' class="details-modal-title">Создать Этап</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateStage