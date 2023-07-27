import React from 'react';
import Select from 'react-dropdown-select';
import './style.css';

function RecordSearch({ records, onSelectRecordName, selectedRecordNames }) {
  const options = records.map(record => ({ value: record.name, label: record.name }));

  const handleSelectedChange = (selectedOptions) => {
    const newSelectedNames = selectedOptions.map(option => option.value);
    onSelectRecordName(newSelectedNames);
  };

  return (
    <div className="recordSearch">
      <h2>Search Records</h2>
      <Select
        options={options}
        onChange={handleSelectedChange}
        values={selectedRecordNames.map(name => ({ value: name, label: name }))}
        multi
        clearable
        style={{
            borderRadius: '10px',
            backgroundColor: 'white',
          }}
      />
    </div>
  );
}

export default RecordSearch;