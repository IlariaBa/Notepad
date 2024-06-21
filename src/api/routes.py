"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Note, Category, NoteCategory
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#Gets all notes
@api.route('/note', methods=['GET'])
def get_all_notes():
    notes = Note.query.all()
    serialized_notes = list(map(lambda item: item.serialize(), notes))
    return jsonify({'msg': 'Ok', 'results': serialized_notes}), 200

#Get a particular note from its id
@api.route('/note/<int:note_id>', methods=['GET'])
def get_particular_note(note_id):
    note = Note.query.get(note_id)
    if note is None:
        return ({'msg': 'The note with id {} does not exist'.format(note_id)}), 404
    serialized_note = note.serialize()
    return jsonify({'msg': 'Ok', 'results': serialized_note}), 200


@api.route('/note', methods=['POST'])
def add_new_note():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg" : "You must send information in the body"}), 400
    if "title" not in body:
        return jsonify({"msg" : "The title field is obligatory"}), 400
        
    title = body.get("title")
    content = body.get("content", "")
    is_active = body.get("is_active", True)
    category_ids = body.get("category_ids", [])

    new_note = Note(title=title, content=content, is_active=is_active)
    db.session.add(new_note)
    db.session.commit()

    for category_id in category_ids:
        category = Category.query.get(category_id)
        if category:
            note_category = NoteCategory(note_id=new_note.id, category_id=category.id)
            db.session.add(note_category)

    db.session.commit()

    serialized_note = new_note.serialize()
    return jsonify({'msg': 'Ok', 'results': serialized_note}), 200