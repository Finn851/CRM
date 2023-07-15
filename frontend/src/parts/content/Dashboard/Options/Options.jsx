import React, { useState, useEffect } from 'react';
import styles from './Options.module.css';
import CreateStage from '../CreateStage/CreateStage';
import CreateDeal from '../CreateDeal/CreateDeal';

const Options = (props) => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem('selectedOption') || '1'
  );

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    props.handleOptionChange(event, selectedValue);
  };

  return (
    <div className={styles.dashboard__options}>
      <select
        className={styles.dashboard__selections}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="1">Воронка 1</option>
        <option value="2">Воронка 2</option>
        <option value="3">Воронка 3</option>
      </select>
      <CreateStage rerender={props.rerender} user={props.user} />
      <CreateDeal stages={props.stages} rerender={props.rerender} />
    </div>
  );
};

export default Options;
