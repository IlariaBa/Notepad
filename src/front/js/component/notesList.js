import React, { useState, useEffect } from "react";

import { getNotes } from "../../client-API/backendAPI";

export const NotesList = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [notesInfo, setNotesInfo] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

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

    return (
        <div className="container">
            {isLoading ? (
                <p>Loading...</p>
            ) : errorMsg ? (
                <p>Error: {errorMsg}</p>
            ) : (
                <div>
                    {/* Renderiza tus notas aquí */}
                    {notesInfo && notesInfo.results && notesInfo.results.map(note => (
                        <div key={note.id}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}