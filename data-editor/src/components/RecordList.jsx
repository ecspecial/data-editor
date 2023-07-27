import RecordCard from "./RecordCard";
import './style.css';

function RecordList({ records, recordsNumber, handleRecordChange }) {

  
    return (
        <div className="records-container">
            <ul className="record-list">
                {(recordsNumber ? records.slice(0, recordsNumber) : records).map((record) => (
                    <li key={record.name}>
                        <RecordCard record={record} handleRecordChange={handleRecordChange}/>
                    </li>
                ))}
            </ul>
      </div>
    );
}

export default RecordList;