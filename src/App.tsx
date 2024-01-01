import { useEffect, useState } from "react";
import Note from "./components/Note";
import { BiMessageSquareAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [noteInput, setNoteInput] = useState("");

  type Task = {
    description: string;
    id: string;
    color: string;
  };

  const task = {
    description: "",
    id: "0",
    color: "#ffff",
  };

  const [noteList, setNoteList] = useState<Task[]>(() => {
    const storedIdeas = localStorage.getItem("ideas");
    return storedIdeas ? JSON.parse(storedIdeas) : [task];
  });

  const noteColors = [
    "#554994",
    "#7a4994",
    "#495e94",
    "#499460",
    "#946f49",
    "#946f49",
    "#499460",
  ];

  const HandleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNoteList([
      ...noteList,
      {
        description: noteInput,
        id: uuidv4(),
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
      },
    ]);
    console.log(noteInput);
    setNoteInput("");
  };

  const HandleDelete = (current: Task) => {
    setNoteList(noteList.filter((note) => note.id !== current.id));
  };

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(noteList));
  }, [noteList]);

  return (
    <>
      <h1 className="title">QuickQuill</h1>
      <h2 className="motto">
        Ignite Your Imagination, Illuminate Your Inspiration.
      </h2>
      <div className="note-form-container">
        <form className="note-form" onSubmit={(e) => HandleSubmission(e)}>
          <input
            onChange={(e) => setNoteInput(e.currentTarget.value)}
            value={noteInput}
            className="note-input"
            type="text"
            placeholder="Swiftly ink your thoughts..."
          />
          <button className="note-submit" type="submit">
            <BiMessageSquareAdd size="27" />
          </button>
        </form>
        <div className="note-list">
          {noteList.map(
            (current) =>
              current.description.trim() !== "" && (
                <Note
                  onDelete={() => HandleDelete(current)}
                  key={current.id}
                  description={current.description}
                  randomColor={current.color}
                />
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
