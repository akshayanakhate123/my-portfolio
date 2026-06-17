"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
