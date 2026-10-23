"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Require a successful login before showing notes
  useEffect(() => {
    if (localStorage.getItem("notepadLoggedIn") !== "true") {
      router.replace("/");
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  // Load notes and theme
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Save theme
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Add / Update note
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    // UPDATE NOTE
    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title,
                description,
                date: new Date().toLocaleString(),
              }
            : note
        )
      );

      setEditingId(null);
    } 
    
    // ADD NOTE
    else {
      const newNote = {
        id: Date.now(),
        title,
        description,
        date: new Date().toLocaleString(),
      };

      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setDescription("");
  };

  // Delete
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Edit
  const editNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
  };

  // Cancel
  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("notepadLoggedIn");
    router.replace("/");
  };

  if (!authenticated) return null;

  return (
    <main className={darkMode ? "container dark" : "container"}>

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>
            Note<span>Pad</span>
          </h1>

          <p className="subtitle">
            Keep your ideas and reminders organized.
          </p>
        </div>

        <div className="header-right">

          <button className="logout-button" onClick={handleLogout}>Log out ↗</button>

          {/* NIGHT MODE */}
          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Day" : "🌙 Night"}
          </button>

          {/* NOTE COUNTER */}
          <div className="counter">
            <strong>{notes.length}</strong>
            <span>Notes</span>
          </div>

        </div>
      </header>


      {/* CREATE / EDIT NOTE */}
      <section className="form-card">

        <h2>
          {editingId !== null ? "Edit Note" : "Create a Note"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="buttons">

            <button
              type="submit"
              className="add-button"
            >
              {editingId !== null ? "Update Note" : "Add Note"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>


      {/* NOTES */}
      <section>

        <div className="notes-header">
          <h2>My Notes</h2>
          <span>{notes.length} total</span>
        </div>


        {notes.length === 0 ? (

          /* EMPTY STATE */
          <div className="empty">

            <div className="empty-icon">
              📝
            </div>

            <h3>
              No notes yet
            </h3>

            <p>
              Create your first note above.
            </p>

          </div>

        ) : (

          /* NOTES GRID */
          <div className="notes-grid">

            {notes.map((note) => (

              <article
                className="note-card"
                key={note.id}
              >

                <h3>
                  {note.title}
                </h3>

                <p>
                  {note.description}
                </p>

                {/* DATE AND TIME */}
                <small className="note-date">
                  🕒 {note.date}
                </small>

                {/* ACTIONS */}
                <div className="note-actions">

                  <button
                    className="edit-button"
                    onClick={() => editNote(note)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}