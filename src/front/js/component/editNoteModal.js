import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { editNote } from "../../client-API/backendAPI";

export const EditNoteModal = ({ noteToEdit, onNoteUpdated }) => {

    const form = useForm({
        defaultValues: {
          title: noteToEdit.title,
          content: noteToEdit.content,
        },
        mode: "onBlur"
      });

    const { register, handleSubmit, reset } = form;

    const [editNoteError, setEditNoteError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        try {
            setEditNoteError("");
            setIsSubmitting(true);

            await editNote(noteToEdit.id, data);

            reset(); // Reset form after editing the new note
            onNoteUpdated(); //Call onNoteUpdated to update the notes list

            //Close modal
            const myModalEl = document.getElementById('editNoteModal');
            const modal = window.bootstrap.Modal.getInstance(myModalEl);
            modal.hide();

            setIsSubmitting(false);

        } catch (error) {
            setEditNoteError(error.message);
            setIsSubmitting(false);
        }
      };

    console.log(noteToEdit)
    return (

        <div class="modal fade" id="editNoteModal" tabindex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editNoteModalLabel">Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {editNoteError && <div className="alert alert-danger">{editNoteError}</div>}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="noteTitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="noteTitle" {...register("title", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="noteContent" className="form-label">Content</label>
                                <textarea className="form-control" id="noteContent" rows="3" {...register("content")} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}