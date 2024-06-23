import React, { useState, useEffect } from "react";

import { getNotes } from "../../client-API/backendAPI";

import { NoteCard } from "./noteCard";

export const NotesList = ({ updateNotes }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [notesInfo, setNotesInfo] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, [updateNotes]);

    const fetchNotes = async () => {
        setErrorMsg("");
        setIsLoading(true);

        try {
            const data = await getNotes();
            setNotesInfo(data);
            setIsLoading(false);
        } catch (error) {
            console.error(`Error fetching user by id: `, error);
            setErrorMsg(error.message);
            setIsLoading(false);
        }
    }

    const handleNoteDeleted = () => {
        fetchNotes();
    };

    const handleNoteUpdated = () => {
        fetchNotes();
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : errorMsg ? (
                <p>Error: {errorMsg}</p>
            ) : (
                <div className="row">
                    {notesInfo && notesInfo.results && notesInfo.results.slice().reverse().map(note => (
                        <div className="col-lg-6 my-2" key={note.id}>
                            <NoteCard note={note} onNoteDeleted={handleNoteDeleted} onNoteUpdated={handleNoteUpdated}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}