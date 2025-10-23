/**
 * Parche para React DevTools con React 19
 * Soluciona el error: "Invalid argument not valid semver"
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalHook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
  
  if (originalHook) {
    // Parchear el método inject si existe
    if (originalHook.inject) {
      const originalInject = originalHook.inject;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      originalHook.inject = function(...args: any[]) {
        try {
          return originalInject.apply(this, args);
        } catch (error) {
          // Suprimir errores de semver
          const errorMessage = (error as Error).message || '';
          if (!errorMessage.includes('semver')) {
            throw error;
          }
        }
      };
    }
  }

  // Parchear window.onerror para capturar errores de React DevTools
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    const msg = message?.toString() || '';
    
    // Ignorar errores de semver de React DevTools
    if (
      msg.includes('not valid semver') ||
      msg.includes('Invalid argument') ||
      (source && source.includes('react_devtools'))
    ) {
      return true; // Prevenir que el error se propague
    }
    
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };
}

export {};
