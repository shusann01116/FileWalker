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
      <section className="flex gap-x-4 items-center p-4">
        <form
          className="border rounded-2xl border-zinc-200 p-4 flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            calc();
          }}
        >
          <section className="flex gap-x-4 items-center">
            <input
              className="max-w-12 border-b-2 border-zinc-200 focus:border-sky-300"
              type="number"
              onChange={(e) => setN(Number.parseInt(e.currentTarget.value))}
              placeholder="Enter a number..."
            />
            <h1 className="text-4xl font-mono font-extrabold">{fib}</h1>
          </section>
          <button
            className="bg-sky-300 text-white py-1 px-2 rounded-lg"
            type="submit"
          >
            Calc
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
