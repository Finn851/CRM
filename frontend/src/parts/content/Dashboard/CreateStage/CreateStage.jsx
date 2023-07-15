import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


const CreateStage = (props) => {

    

    const [formStageSubmitted, setFormStageSubmitted] = useState(false);
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
        const formData = new URLSearchParams();
        var date = new Date();
        formData.append('stageName', stageName)
        formData.append('stageColor', getRandomColor())
        formData.append('stageNotificationText', 'Создан этап')
        formData.append('stageNotificationDate', getCurrentTime() + ' ' + getCurrentDate())
        formData.append('userID', localStorage.getItem('userID'))

        fetch('/dashboard/postStage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData
        })
        .then(response => response.json())
        .then(data => {
            setFormStageSubmitted(true);
        })
        .catch(error => {
          console.error(error);
        });
      }
    useEffect(() => {
        if (formStageSubmitted) {
            props.rerender()
            window.location.reload()
            setFormStageSubmitted(false);
        }
      }, [formStageSubmitted]);
    return(
        <details className='createStage'>
            <summary>
                <div class="button">
                    Создать этап
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
                    <h1>Создать этап</h1>
                </div>

                <form class="details-modal-content" id="nameForm" onSubmit={postStage}>
                    <div>
                        <label for="title">Название этапа</label>
                        <input id="title" value={stageName} name="title" type="text" onChange={(e) => stageNameChange(e)} />
                    </div>
                    <button type='submit' class="details-modal-title">Создать Этап</button>
                </form>
            </div>
        </details>
    )
}

export default CreateStage