"use client";

import { useEffect } from 'react';

export default function Logger() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('logging is working');
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return null; // This component does not render anything
}
