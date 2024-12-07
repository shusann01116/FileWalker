import { homeDir } from "@tauri-apps/api/path";

export const Home = async () => {
  return await homeDir();
};
