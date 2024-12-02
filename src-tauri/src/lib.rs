#[tauri::command]
fn calc_fib(n: u64) -> u64 {
    fib(0, 1, n)
}

fn fib(a: u64, b: u64, n: u64) -> u64 {
    if n == 0 {
        a
    } else if n == 1 {
        b
    } else {
        fib(b, a + b, n - 1)
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![calc_fib])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
