import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { exists } from "@/lib/tauri/fs";
import { cn } from "@/lib/utils";

const Ready = ({
  setPath,
  onStart: onClick,
}: {
  setPath: (path: string) => void;
  onStart: () => void;
}) => {
  const [valid, setValid] = useState(false);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // check if the path is valid
    const inputpath = e.target.value;
    const fileExists = await exists(inputpath);
    if (inputpath.length > 0 && fileExists) {
      setValid(true);
      setPath(inputpath);
    } else {
      setValid(false);
    }
  };

  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col">
      <section className="flex flex-1 flex-col items-center justify-center">
        <div className="flex min-w-80 flex-col gap-4">
          <Label className="flex flex-col gap-3">
            <span>Input a directory</span>
            <Input
              className={cn(
                valid
                  ? "border-accent ring-accent"
                  : "border-destructive ring-destructive focus-visible:ring-destructive"
              )}
              onChange={(e) => onChange(e)}
              type="text"
            />
          </Label>
          <Button disabled={!valid} className="w-fit" onClick={onClick}>
            Start
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Ready;
