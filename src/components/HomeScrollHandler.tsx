"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomeScrollHandler = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#waitlist") {
      router.replace("/download");
    }
  }, [router]);

  return null;
};

export default HomeScrollHandler;
