import { useState } from "react";
import "./App.css";
import Walk from "./components/pages/walk";
import Ready from "./components/pages/ready";
import { walk, type WalkEvent, type FileInfo } from "./lib/tauri/walker";

type Page = "ready" | "walk";

function App() {
  const [page, setPage] = useState<Page>("ready");
  const [path, setPath] = useState("");
  const [files, setFiles] = useState<FileInfo[]>([]);

  const onWalkEvent = (event: WalkEvent) => {
    switch (event.event) {
      case "started":
        console.log(event.data.path);
        break;
      case "progress":
        setFiles((files) => [...files, event.data.file]);
        break;
      case "finished":
        console.log("finished");
        break;
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      {page === "ready" && (
        <Ready
          setPath={setPath}
          onStart={() => {
            // initiate walk here, invoke tauri command
            walk(path, onWalkEvent);

            setPage("walk");
          }}
        />
      )}
      {page === "walk" && (
        <Walk onCancel={() => setPage("ready")} files={files} />
      )}
    </main>
  );
}

export default App;
