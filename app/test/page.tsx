"use client";

import * as React from "react";
import { useEdgeStore } from "@/app/lib/edgeStore";

export default function Page() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                console.log(progress);
              },
            });
            console.log(res);
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}
