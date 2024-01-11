import React, { useEffect } from "react";
type CursorProps = {
  UserImage: string;
};

const Cursor = ({ UserImage }: CursorProps) => {
  const cursorRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };
    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      style={{ zIndex: 10000 }} // cursor should always be visible
      ref={cursorRef}
      className="fixed w-6 h-6 p-[3px] bg-pink-500 shadow rounded-bl-none rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-full"
    >
      <img
        src={UserImage}
        alt="Cursor"
        className="w-full h-full object-cover rounded-full rounded-bl-none"
      />
    </div>
  );
};

export default Cursor;
