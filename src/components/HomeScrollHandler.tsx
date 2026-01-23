"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const HomeScrollHandler = () => {
  const searchParams = useSearchParams();
  const { scrollToElement } = useScrollToElement();

  useEffect(() => {
    if (searchParams.get("scrollTo") === "waitlist") {
      setTimeout(() => {
        scrollToElement("waitlist", { center: true });
      }, 100);
    }
  }, [searchParams, scrollToElement]);

  return null;
};

export default HomeScrollHandler;
