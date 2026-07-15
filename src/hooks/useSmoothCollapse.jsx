// smoothcollapse
import { useState, useRef, useEffect } from "react";

const useSmoothCollapse = (isOpen = false) => {
  const [open, setOpen] = useState(isOpen);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  return { open, toggle, contentRef, height };
};

export default useSmoothCollapse;
