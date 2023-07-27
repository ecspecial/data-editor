import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { mockData } from './mock-data';
import RecordList from './components/RecordList';
import RecordSearch from './components/RecordSearch';

function App() {

    const storedRecords = JSON.parse(localStorage.getItem('records'));
    const initialRecords = storedRecords || mockData;
    const [selectedRecordNames, setSelectedRecordNames] = useState([]);

    const [state, setState] = useState({
        records: initialRecords,
        recordNames: [],
        recordsNumber: storedRecords.length,
    });

    const updateRecordsNumber = (recordsNumber) => {
        setState(prevState => ({ ...prevState, recordsNumber }));
        localStorage.setItem('recordsNumber', recordsNumber.toString());
    };

    const handleSelectRecordName = (newSelectedNames) => {
        setSelectedRecordNames(newSelectedNames);
        const newRecordsNumber = newSelectedNames.length;
        updateRecordsNumber(newRecordsNumber);
    };
    
      const filterRecords = () => {
        if (selectedRecordNames.length > 0) {
          return state.records.filter(record => selectedRecordNames.includes(record.name));
        } else {
          return state.records;
        }
      }

    const handleRecordChange = (name, newValue) => {
        const updatedRecords = state.records.map(record => {
            if (record.name === name) {
                return {...record, value: newValue};
            }
            return record;
        });
        setState(prevState => ({ ...prevState, records: updatedRecords }));
        localStorage.setItem('records', JSON.stringify(updatedRecords));
    };

    useEffect(() => {
        if (!storedRecords) {
            localStorage.setItem('records', JSON.stringify(mockData));
        }
        const recordNames = initialRecords.map(record => record.name);
        setState(prevState => ({ ...prevState, recordNames }));
    },[]);
  
    return (
        <div className="App">
        <RecordSearch records = {state.records} onSelectRecordName={handleSelectRecordName} selectedRecordNames={selectedRecordNames}/>
        <RecordList records = {filterRecords()} recordsNumber={state.recordsNumber} handleRecordChange={handleRecordChange}/>
      </div>
    );
}

export default App;