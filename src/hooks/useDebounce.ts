"use client";
import { useState, useEffect } from "react";

export default function useDebounce(
  callback: () => void,
  triggerValues: any[] = [],
  delay: number = 300
) {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(callback, delay));
  }, [...triggerValues]);
}
