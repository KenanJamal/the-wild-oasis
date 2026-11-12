import { useEffect, useRef } from "react";
export default function useClickOutside<T extends HTMLElement>(
  handler: () => void,
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handler]);
  return ref;
}
