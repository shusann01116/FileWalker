import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import "./App.css";

function App() {
  const [fib, setFib] = useState(0);
  const [n, setN] = useState(0);

  async function calc() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setFib(await invoke("calc_fib", { n: n }));
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-primary-foreground bg-primary">Hello World</h1>
    </main>
  );
}

export default App;
