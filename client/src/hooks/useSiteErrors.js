import { useState, useEffect } from "react";

export default function useSiteErrors() {
  const [siteErrors, setSiteErrors] = useState();
  const [showSiteError, setShowSiteError] = useState(false);

  useEffect(() => {
    setShowSiteError(siteErrors !== undefined);
  }, [siteErrors]);
  return [siteErrors, showSiteError, setSiteErrors, setShowSiteError];
}