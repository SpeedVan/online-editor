import { useEffect } from 'preact/hooks';

/**
 * dynamic import script file
 * @param {} url 
 */
const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;