import { useEffect } from "react";

const NOT_FOUND_ID = "not-found";

function useHashNavigation() {
  useEffect(() => {
    const onHashChange = () => {
      const toggle = document.getElementById("nav-toggle");
      if (toggle) toggle.checked = false;

      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && !document.getElementById(id)) {
        window.location.replace(`#${NOT_FOUND_ID}`);
      }
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
}

export default useHashNavigation;
