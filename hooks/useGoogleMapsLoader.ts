import { useEffect, useState } from "react";

export default function useGoogleMapsLoader(
  apiKey: string,
  libraries: string[] = []
) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com/maps/api/js"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => setLoaded(true));
      return;
    }

    const libParam = libraries.length
      ? `&libraries=${libraries.join(",")}`
      : "";
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${libParam}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("Google Maps failed to load");

    document.head.appendChild(script);
  }, [apiKey, libraries]);

  return loaded;
}
