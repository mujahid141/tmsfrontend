import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, []); // Added dependency array to run the effect once on mount

  let handleSubmit = () => {
    if (id !== "new" && note.body === "") {
      deleteNote();
    } else if (id !== "new") {
      upDate();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    // eslint-disable-next-line no-restricted-globals
    history.back(); // Using history.push for navigation
  };

  let upDate = async () => {
    fetch(`/api/note/${id}/update/`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let getNote = async () => {
    try {
      if (id === "new") return;
      let response = await fetch(`/api/note/${id}/`);
      let data = await response.json();
      setNote(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  let deleteNote = async () => {
    fetch(`/api/note/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    });
    // eslint-disable-next-line no-restricted-globals
    history.back();
  };

  let createNote = async () => {
    fetch(`/api/note/create/`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
