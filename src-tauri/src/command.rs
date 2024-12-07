use std::fs;

use serde::Serialize;
use tauri::{ipc::Channel, AppHandle};

#[tauri::command]
pub fn exists(path: String) -> bool {
    fs::read_dir(path).is_ok()
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase", tag = "event", content = "data")]
pub enum WalkEvent<'a> {
    #[serde(rename_all = "camelCase")]
    Started { path: &'a str, walk_id: &'a str },
    #[serde(rename_all = "camelCase")]
    Progress { walk_id: &'a str, file: File<'a> },
    #[serde(rename_all = "camelCase")]
    Finished { walk_id: &'a str },
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct File<'a> {
    path: &'a str,
    size: u64,
}

#[tauri::command]
pub fn walk(_app: AppHandle, path: String, on_progress: Channel<WalkEvent>) -> Result<(), String> {
    let walk_id = "1";
    let path = path.as_str();
    on_progress
        .send(WalkEvent::Started { path, walk_id })
        .unwrap();

    let files = fs::read_dir(path).unwrap();
    for file in files {
        let file = file.unwrap();
        let path = file.path();
        let size = file.metadata().unwrap().len();
        on_progress
            .send(WalkEvent::Progress {
                walk_id,
                file: File {
                    path: path.to_str().unwrap(),
                    size,
                },
            })
            .unwrap();
    }
    on_progress.send(WalkEvent::Finished { walk_id }).unwrap();

    Ok(())
}
