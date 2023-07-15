import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Options from './Options/Options';
import Funnel from './Funnels/Funnel';

const Dashboard = (props) => {
  const Funnels = props.data;

  const { funnelID } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(funnelID || Funnels[0].funnelID);

  const funnel = Funnels.find((Funnel) => Funnel.funnelID === selectedOption);

  const Stages = funnel.funnel;

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    navigate(`/dashboard/${selectedValue}`); // Перенаправляем на выбранный маршрут
  };

  return (
    <div className={styles.dashboard__wrapper}>
      <Options
        stages={Stages}
        rerender={props.rerender}
        user={props.user}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
      />
      <Routes>
        {Funnels.map((el) => (
          <Route key={el.funnelID} path={`/${el.funnelID}`} element={<Funnel key={el.funnelID} stages={el.funnel} funnelID={el.funnelID} />} />
        ))}
      </Routes>
    </div>
  );
};

export default Dashboard;