import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";

import { NotesList } from "../component/notesList";
import { AddNoteModal } from "../component/addNoteModal";

export const Home = () => {

	const [updateNotes, setUpdateNotes] = useState(false);

    const handleNoteAdded = () => {
        setUpdateNotes(prev => !prev);
    };

	return (
		<div className="container mt-5">
			<h1 className="text-center mb-4">Notepad</h1>
			<div className="d-grid gap-2 mb-2">
				<button className="btn btn-outline-primary" type="button"  data-bs-toggle="modal" data-bs-target="#addNoteModal">Add Note</button>
			</div>
			<NotesList updateNotes={updateNotes} />
			<AddNoteModal onNoteAdded={handleNoteAdded} />
		</div>
	);
};
