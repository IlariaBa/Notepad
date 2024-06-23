const apiUrlBase = process.env.BACKEND_URL;

/////////////////////////////////////////////////////
//Notes

//Get all notes
export const getNotes = async() => {
    try {
        const response = await fetch(`${apiUrlBase}/api/note`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json()
        return data;

    } catch (error) {
        console.error('Error on getting notes: ', error);
        throw error;
    }
}

//Get note by id
export const getNote = async (note_id) => {
    try {
        const response = await fetch(`${apiUrlBase}/api/note/${note_id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error on getting note:', error);
        throw error;
    }
}

//Add new note
export const addNote = async (formData) => {
    try {
        const response = await fetch(`${apiUrlBase}/api/note`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
            const errorData = data;
            throw new Error(errorData.msg);
        }

        // Returns the new note
        return data.result;

    } catch (error) {
        console.error('Error trying to add a new note', error);
        throw error;
    }
}

//Delete note
export const deleteNote = async (note_id) => {
    try {
        const response = await fetch(`${apiUrlBase}/api/note/${note_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            const errorData = data;
            throw new Error(errorData.msg);
        }

        return true;

    } catch (error) {
        console.error('Error trying to delete a note', error);
        throw error;
    }
}