"use client";

import { useEffect } from "react";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const HomeScrollHandler = () => {
  const { scrollToElement } = useScrollToElement();

  useEffect(() => {
    if (window.location.hash === "#waitlist") {
      setTimeout(() => {
        scrollToElement("waitlist", { center: true });
      }, 100);
    }
  }, [scrollToElement]);

  return null;
};

export default HomeScrollHandler;
