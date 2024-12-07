import type { FileInfo } from "@/lib/tauri/walker";
import { Button } from "../ui/button";
import { DataTable } from "./walk/data-table";
import { columns } from "./walk/columns";

const Walk = ({
  onCancel,
  files,
}: {
  onCancel: () => void;
  files: FileInfo[];
}) => {
  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col gap-8 py-8">
      <section className="px-8">
        <DataTable data={files} columns={columns} />
      </section>
      <section className="flex justify-end gap-2 px-8">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive">Delete</Button>
      </section>
    </div>
  );
};

export default Walk;
