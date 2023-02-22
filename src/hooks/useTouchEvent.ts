import { useState } from "react";

const useTouchEvent = () => {
  const [touchStart, setTouchStart] = useState({
    x: 0,
    y: 0,
  });
  const [touchEnd, setTouchEnd] = useState({
    x: 0,
    y: 0,
  });

  const handleTouchStart = (e) => {
    const touch = e.changedTouches[0] || {};
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0] || {};
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  return { touchStart, touchEnd, handleTouchStart, handleTouchEnd };
};

export default useTouchEvent;
