import { Channel, invoke } from "@tauri-apps/api/core";

export type WalkEvent =
  | {
      event: "started";
      data: {
        path: string;
        walk_id: string;
      };
    }
  | {
      event: "progress";
      data: {
        walk_id: string;
        file: FileInfo;
      };
    }
  | {
      event: "finished";
      data: {
        walk_id: string;
      };
    };

export type FileInfo = {
  path: string;
  size: number;
};

export const walk = async (
  path: string,
  handler: (event: WalkEvent) => void
) => {
  const onProgress = new Channel<WalkEvent>();
  onProgress.onmessage = handler;

  await invoke("walk", { path, onProgress });
};
