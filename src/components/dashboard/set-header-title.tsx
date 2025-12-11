"use client";

import { useHeaderTitle } from "@/context/adminHeaderContext";
import { useEffect } from "react";

export function SetHeaderTitle({ title }: { title: string }) {
  const setTitle = useHeaderTitle()!.setTitle;

  useEffect(() => {
    if (setTitle) {
      setTitle(title);
    }
  }, [title, setTitle]);

  return null;
}
