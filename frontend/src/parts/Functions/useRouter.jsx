import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useRouter = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    const handleRouteChange = () => {
      setPrevLocation(location);
    };

    const unlisten = () => {
      window.removeEventListener('popstate', handleRouteChange);
    };

    window.addEventListener('popstate', handleRouteChange);

    return unlisten;
  }, [location]);

  return {
    location,
    prevLocation,
  };
};

export default useRouter;