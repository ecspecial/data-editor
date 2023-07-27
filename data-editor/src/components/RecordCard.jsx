import { useState, useEffect, useRef } from "react";
import { Alert } from "./Alert";
import './style.css';

// Define RecordCard functional component, which receives record and handleRecordChange as props
function RecordCard({ record, handleRecordChange }) {
    // Initialize state variables and refs
    const [isEditing, setIsEditing] = useState(false); // A boolean to track if the record is being edited
    const [value, setValue] = useState(record.value); // The current value of the record
    const [input, setInput] = useState(""); // The user input in the edit area
    const [isSaveHovered, setIsSaveHovered] = useState(false); // A boolean to track if the save button is hovered
    const [isCancelHovered, setIsCancelHovered] = useState(false); // A boolean to track if the cancel button is hovered
    const [errorText, setErrorText] = useState(""); // The error message
    const editDiv = useRef(null); // Reference to the outer div of the record
    const textAreaRef = useRef(null); // Reference to the textarea element

    // Handle click on the edit button
    const handleEditClick = (e) => {
        e.stopPropagation(); // Prevent triggering of any parent's onClick handlers
        setErrorText(""); // Reset error message
        setInput(value); // Set the input to be the current value of the record
        setIsEditing(true); // Set the isEditing state to true

        // Set the height of the textarea to fit its content after a delay to ensure that the textAreaRef.current is available
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "0px";
                const scrollHeight = textAreaRef.current.scrollHeight;
                textAreaRef.current.style.height = scrollHeight + "px";
            }
        }, 0);
    }

    // Handle click on the cancel button
    const handleCancelClick = (e) => {
        e.stopPropagation(); // Prevent triggering of any parent's onClick handlers
        setErrorText(""); // Reset error message
        setIsEditing(false); // Set the isEditing state to false
    }

    // Handle change in the textarea
    const handleChange = (e) => {
        const newInput = e.target.value; // Get the new input
        // Check if the new input is empty
        if (newInput === "") {
            setErrorText("Input can't be empty!"); // If empty, set the error message
        } else {
            setErrorText(""); // If not empty, reset the error message
        }

        setInput(newInput); // Set the input state to the new input
        // Adjust the height of the textarea to fit its content
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + "px";
        }
    };

    // Handle click on the save button
    const handleSaveClick = () => {
        if (errorText) {
            return; // If there's an error, do nothing
        }
        setValue(input); // Set the value state to the input
        handleRecordChange(record.name, input); // Update the record in the parent component
        setIsEditing(false); // Set the isEditing state to false
    }

    // Render the RecordCard component
    return (
        <div className="record" ref={editDiv}>
            <div>
            <h2>{record.name}</h2>
            {/* If there's an error message, display it */}
            {errorText && (
                <div className="error-text">
                    <Alert text={errorText}/>
                </div>
            )}
            </div>
            {/* If isEditing state is true, display the edit area and save/cancel buttons */}
            {isEditing ? (
                <div className="record-card">
                    <div className="textarea-wrapper">
                        <textarea className="edit-area" ref={textAreaRef} value={input} onChange={handleChange}/>
                    </div>
                    <div className="option-buttons">
                        <button 
                            className="save-button" 
                            onClick={handleSaveClick} 
                            onTouchStart={() => setIsSaveHovered(true)}
                            onTouchEnd={() => setIsSaveHovered(false)}
                            style={isSaveHovered ? {backgroundColor: "#0056b3"} : {}}
                        >
                            Save
                        </button>
                        <button 
                            className="cancel-button" 
                            onClick={handleCancelClick} 
                            onTouchStart={() => setIsCancelHovered(true)}
                            onTouchEnd={() => setIsCancelHovered(false)}
                            style={isCancelHovered ? {backgroundColor: "#6c757d", color: "white"} : {}}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                /* Otherwise, display the record value and edit button */
                <div className="record-card">
                    <div className="saved-div">
                        <div className="record-text">{value}</div>
                    </div>
                    <div className="edit-button-wrapper">
                    <button className="edit-button" onClick={handleEditClick}>
                        <svg className="edit-svg" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                </path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecordCard;