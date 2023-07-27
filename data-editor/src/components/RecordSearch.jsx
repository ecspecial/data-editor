import React from 'react';
import Select from 'react-dropdown-select';
import './style.css';

// Define the RecordSearch component, passing props for records, onSelectRecordName and selectedRecordNames
function RecordSearch({ records, onSelectRecordName, selectedRecordNames }) {
  
  // Map over records to create options for the Select component, with each option having a value and a label
  const options = records.map(record => ({ value: record.name, label: record.name }));

  // Define a function to handle changes in the selected options in the Select component
  const handleSelectedChange = (selectedOptions) => {
    // Map over selected options to get an array of the selected record names
    const newSelectedNames = selectedOptions.map(option => option.value);
    
    // Call onSelectRecordName, passing the array of new selected names
    onSelectRecordName(newSelectedNames);
  };

  // Render the RecordSearch component
  return (
    <div className="recordSearch">
      <h2>Search Records</h2>
      <Select
        // Pass options to the Select component
        options={options}
        
        // When the selected options change, call handleSelectedChange
        onChange={handleSelectedChange}
        
        // Set the current values of the Select component to be the selected record names
        values={selectedRecordNames.map(name => ({ value: name, label: name }))}
        
        // Allow multiple options to be selected
        multi
        
        // Allow selected options to be cleared
        clearable
        
        // Style the Select component
        style={{
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      />
    </div>
  );
}

export default RecordSearch;