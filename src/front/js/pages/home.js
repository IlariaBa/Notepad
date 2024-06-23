import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";

import { NotesList } from "../component/notesList";
import { AddNoteModal } from "../component/addNoteModal";
import { AddCategoryModal } from "../component/addCategoryModal";

export const Home = () => {

	const [updateNotes, setUpdateNotes] = useState(false);
	const [updateCategories, setUpdateCategories] = useState(false);
	const [filter, setFilter] = useState('active'); // 'all', 'active', 'archived'

	const handleNoteAdded = () => {
		setUpdateNotes(prev => !prev);
	};

	const handleCategoriesAdded = () => {
		setUpdateCategories(prev => !prev);
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center mb-4">Notepad</h1>
			<div className="d-grid gap-2 mb-2">
				<button
					className="btn btn-outline-primary"
					type="button"
					data-bs-toggle="modal"
					data-bs-target="#addNoteModal">
					Add Note
				</button>
			</div>
			<div className="d-flex">
				<div className="dropdown mb-4 me-2">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						id="filterDropdown"
						data-bs-toggle="dropdown"
						aria-expanded="false">
						Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
					</button>
					<ul className="dropdown-menu" aria-labelledby="filterDropdown">
						<li>
							<button className="dropdown-item" onClick={() => setFilter("all")}>All</button>
						</li>
						<li>
							<button className="dropdown-item" onClick={() => setFilter("active")}>Active</button>
						</li>
						<li>
							<button className="dropdown-item" onClick={() => setFilter("archived")}>Archived</button>
						</li>
					</ul>
				</div>
				<div>
					<button
						className="btn btn-outline-primary"
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#addCategoryModal">
						Add new category
					</button>
				</div>
			</div>

			<NotesList updateNotes={updateNotes} updateCategories={updateCategories} filter={filter} />
			<AddNoteModal onNoteAdded={handleNoteAdded} />
			<AddCategoryModal onCategoryAdded={handleCategoriesAdded} />
		</div>
	);
};
