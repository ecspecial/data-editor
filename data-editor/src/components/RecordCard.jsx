import { useState, useEffect, useRef } from "react";
import { Alert } from "./Alert";
import './style.css';

function RecordCard({ record, handleRecordChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(record.value);
    const [input, setInput] = useState("");
    const [isSaveHovered, setIsSaveHovered] = useState(false);
    const [isCancelHovered, setIsCancelHovered] = useState(false);
    const [errorText, setErrorText] = useState("");
    const editDiv = useRef(null);
    const textAreaRef = useRef(null);

    const handleEditClick = (e) => {
        e.stopPropagation();
        setErrorText("");
        setInput(value);
        setIsEditing(true);

        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "0px";
                const scrollHeight = textAreaRef.current.scrollHeight;
                textAreaRef.current.style.height = scrollHeight + "px";
            }
        }, 0);
    }

    const handleCancelClick = (e) => {
        e.stopPropagation();
        setErrorText("");
        setIsEditing(false);
    }

    const handleChange = (e) => {
        // Check input validity directly when typing
        const newInput = e.target.value;
        if (newInput === "") {
            setErrorText("Input can't be empty!");
        } else {
            setErrorText("");
        }

        setInput(newInput);
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + "px";
        }
    };

    const handleSaveClick = () => {
        if (errorText) {
            return;
        }
        setValue(input);
        handleRecordChange(record.name, input);
        setIsEditing(false);
    }

    // useEffect(() => {
    //     const clickListener = (e) => {
    //         if (isEditing && editDiv.current && !editDiv.current.contains(e.target)) {
    //             handleCancelClick(e);
    //         }
    //     }

    //     document.addEventListener('click', clickListener);
        
    //     return () => {
    //         document.removeEventListener('click', clickListener);
    //     }
    // }, [isEditing]);

    return (
        <div className="record" ref={editDiv}>
            <div>
            <h2>{record.name}</h2>
            {errorText && (
                <div className="error-text">
                    <Alert text={errorText}/>
                </div>
            )}
            </div>
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