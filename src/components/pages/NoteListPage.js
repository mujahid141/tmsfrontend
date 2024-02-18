import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import AddButton from "./AddButton";
const NoteListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    try {
      let response = await fetch("/api/notes/");
      let data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="note-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={note.id} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NoteListPage;
