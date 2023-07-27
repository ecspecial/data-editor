import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { mockData } from './mock-data';
import RecordList from './components/RecordList';
import RecordSearch from './components/RecordSearch';

// Main App function component
function App() {

    // Get records from localStorage, if it doesn't exist, use mockData
    const storedRecords = JSON.parse(localStorage.getItem('records'));
    const initialRecords = storedRecords || mockData;

    // Use useState hook for managing the selected record names
    const [selectedRecordNames, setSelectedRecordNames] = useState([]);

    // Use useState hook for managing the state including records, record names and the number of records
    const [state, setState] = useState({
        records: initialRecords,
        recordNames: [],
        recordsNumber: storedRecords.length,
    });

    // Function for updating the number of records
    const updateRecordsNumber = (recordsNumber) => {
        // Update the state with the new number of records
        setState(prevState => ({ ...prevState, recordsNumber }));
        // Update the localStorage with the new number of records
        localStorage.setItem('recordsNumber', recordsNumber.toString());
    };

    // Handle when a record name is selected
    const handleSelectRecordName = (newSelectedNames) => {
        // Update the selected record names
        setSelectedRecordNames(newSelectedNames);
        // Update the number of records
        const newRecordsNumber = newSelectedNames.length;
        updateRecordsNumber(newRecordsNumber);
    };
    
    // Filter records based on selected record names
    const filterRecords = () => {
        // If there are selected record names, filter the records
        if (selectedRecordNames.length > 0) {
          return state.records.filter(record => selectedRecordNames.includes(record.name));
        } else {
          // Otherwise, return all records
          return state.records;
        }
    }

    // Handle when a record is changed
    const handleRecordChange = (name, newValue) => {
        // Map through records, update the record with matching name
        const updatedRecords = state.records.map(record => {
            if (record.name === name) {
                return {...record, value: newValue};
            }
            return record;
        });
        // Update state with updated records
        setState(prevState => ({ ...prevState, records: updatedRecords }));
        // Update localStorage with updated records
        localStorage.setItem('records', JSON.stringify(updatedRecords));
    };

    // useEffect hook to run once when the component mounts
    useEffect(() => {
        // If storedRecords does not exist, set localStorage with mockData
        if (!storedRecords) {
            localStorage.setItem('records', JSON.stringify(mockData));
        }
        // Get all record names from initialRecords
        const recordNames = initialRecords.map(record => record.name);
        // Update state with record names
        setState(prevState => ({ ...prevState, recordNames }));
    },[]);

    // Render App
    return (
        <div className="App">
          <RecordSearch 
            records={state.records} 
            onSelectRecordName={handleSelectRecordName} 
            selectedRecordNames={selectedRecordNames}
          />
          <RecordList 
            records={filterRecords()} 
            recordsNumber={state.recordsNumber} 
            handleRecordChange={handleRecordChange}
          />
        </div>
    );
}

export default App;