import RecordCard from "./RecordCard";
import './style.css';

// Define the RecordList component, which receives records, recordsNumber, and handleRecordChange as props
function RecordList({ records, recordsNumber, handleRecordChange }) {

  // Render the RecordList component
  return (
    <div className="records-container">
        <ul className="record-list">
            {/* 
              If recordsNumber is truthy, slice the records array to get only the first 'recordsNumber' records.
              Otherwise, use the entire 'records' array. Then, for each record:
            */}
            {(recordsNumber ? records.slice(0, recordsNumber) : records).map((record) => (
                // Create a new list item with a key of the record's name
                <li key={record.name}>
                    {/* Render a RecordCard for each record, passing the record and handleRecordChange as props */}
                    <RecordCard record={record} handleRecordChange={handleRecordChange}/>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default RecordList;