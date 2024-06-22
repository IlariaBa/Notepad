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
        const response = await fetch(`${apiUrlBase}/note/${note_id}`, {
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
