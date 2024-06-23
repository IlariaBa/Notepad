import React, { useState } from "react";

import { deleteNote } from "../../client-API/backendAPI";

import { EditNoteModal } from "./editNoteModal";

export const NoteCard = ({ note, onNoteDeleted, onNoteUpdated }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [noteDelete, setNoteDelete] = useState();
    const [noteEdit, setNoteEdit] = useState();

    const updateNoteDelete = (noteToDelete) => {
        setShowConfirmModal(true);
        setNoteDelete(noteToDelete);
    }

    const onDelete = async (data) => {
        setErrorMsg("");
        setIsLoading(true);

        try {
            const response = await deleteNote(noteDelete.id);
            setIsLoading(false);
            setShowConfirmModal(false);
            onNoteDeleted();  // Llamar a la función para actualizar la lista de notas
        } catch (error) {
            console.error("Error on note deleting: ", error);
            setErrorMsg(error.message);
            setIsLoading(false);
        }
    }

    const [updateNotes, setUpdateNotes] = useState(false);

    if (!note) {
        return null;
    }

    return (
        <div className="h-100">
            <div className="card h-100">
                <div className="card-header d-flex align-items-center">
                    {note.categories.length > 0 ? (
                        <div>
                            {note.categories.map((category) => (
                                <div key={category.id}>{category.category_name}</div>
                            ))}
                        </div>
                    ) : (
                        <div className="fst-italic">No categories</div>
                    )}
                    <button type="button" className="btn btn-outline-primary ms-auto rounded-circle">
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                </div>
                <div className="card-footer d-flex">
                    <button type="button" className="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#editNoteModal" onClick={() => setNoteEdit(note)}>
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-danger ms-2" onClick={() => updateNoteDelete(note)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
            {noteEdit && <EditNoteModal noteToEdit={noteEdit} onNoteUpdated={onNoteUpdated} />}

            {/* Modal that asks for confirmation to delete the record*/}
            {noteDelete && 
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showConfirmModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowConfirmModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <h5 className="text-center mb-3">Are you sure you want to delete this note?</h5>
                            <h6>{noteDelete.title}</h6>
                            <p>{noteDelete.content}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    onDelete();
                                    setShowConfirmModal(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }

        </div>
    )
}