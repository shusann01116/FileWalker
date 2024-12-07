import type { ColumnDef } from "@tanstack/react-table";

export type FileMetadata = {
  path: string;
  size: number;
};

export const columns: ColumnDef<FileMetadata>[] = [
  {
    header: "Path",
    accessorKey: "path",
  },
  {
    header: "Size",
    accessorKey: "size",
  },
];
