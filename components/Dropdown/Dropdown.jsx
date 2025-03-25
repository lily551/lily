import React, { useState } from 'react';

function Dropdown({ label, options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onSelect(newValue);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown" className="dropdown-label">
        { label }
      </label>
      <select id="dropdown" value={ selectedOption } onChange={ handleChange } className="dropdown-select">
        { options.map((option, index) => (
          <option key={ index } value={ option }>
            { option }
          </option>
        )) }
      </select>
    </div>
  );
}

export default Dropdown;
