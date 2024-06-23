import React, { useState, useEffect } from "react";

import { getNotes } from "../../client-API/backendAPI";
import { getCategories } from "../../client-API/backendAPI";

import { NoteCard } from "./noteCard";

export const NotesList = ({ updateNotes, updateCategories, filter }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [notesInfo, setNotesInfo] = useState(null);
    const [categories, setCategories] = useState();

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
            console.error(`Error fetching notes: `, error);
            setErrorMsg(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchesCategories();
    }, [updateCategories]);

    const fetchesCategories = async () => {
        setErrorMsg("");
        setIsLoading(true);

        try {
            const data = await getCategories();
            setCategories(data);
            setIsLoading(false);
        } catch (error) {
            console.error(`Error fetching categories: `, error);
            setErrorMsg(error.message);
            setIsLoading(false);
        }
    };

    const handleNoteDeleted = () => {
        fetchNotes();
    };

    const handleNoteUpdated = () => {
        fetchNotes();
    };

    const filterNotes = (notes) => {
        if (filter === 'all') return notes;
        return notes.filter(note => filter === 'active' ? note.is_active : !note.is_active);
    };

    const filteredNotes = notesInfo ? filterNotes(notesInfo.results) : [];

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : errorMsg ? (
                <p>Error: {errorMsg}</p>
            ) : (
                <div className="row">
                    {categories && filteredNotes.slice().reverse().map(note => (
                        <div className="col-lg-6 my-2" key={note.id}>
                            <NoteCard note={note} categories={categories.results} onNoteDeleted={handleNoteDeleted} onNoteUpdated={handleNoteUpdated}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}