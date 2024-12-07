import { invoke } from "@tauri-apps/api/core";

export const exists = async (path: string) => {
  const result = await invoke<string>("exists", { path });
  return result;
};
