/**
 * Suprime errores conocidos de la consola en desarrollo
 * que no afectan la funcionalidad de la aplicación
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Interceptar errores de React DevTools y semver
  const originalError = console.error;
  const originalWarn = console.warn;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any[]) => {
    const errorMessage = args[0]?.toString() || '';
    
    const suppressPatterns = [
      'React instrumentation encountered an error',
      'Invalid argument not valid semver',
      'not valid semver',
      'validateAndParse',
      'registerRendererInterface',
    ];
    
    const shouldSuppress = suppressPatterns.some(pattern => 
      errorMessage.includes(pattern)
    );
    
    if (!shouldSuppress) {
      originalError.apply(console, args);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.warn = (...args: any[]) => {
    const warnMessage = args[0]?.toString() || '';
    
    const suppressPatterns = [
      'not valid semver',
      'Invalid argument',
    ];
    
    const shouldSuppress = suppressPatterns.some(pattern => 
      warnMessage.includes(pattern)
    );
    
    if (!shouldSuppress) {
      originalWarn.apply(console, args);
    }
  };

  // Interceptar errores no capturados de React DevTools
  window.addEventListener('error', (event) => {
    const errorMessage = event.message || '';
    
    if (
      errorMessage.includes('not valid semver') ||
      errorMessage.includes('Invalid argument') ||
      errorMessage.includes('validateAndParse') ||
      errorMessage.includes('registerRendererInterface')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  // Interceptar promesas rechazadas relacionadas con React DevTools
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || '';
    
    if (
      reason.includes('not valid semver') ||
      reason.includes('Invalid argument') ||
      reason.includes('validateAndParse')
    ) {
      event.preventDefault();
    }
  });
}

export {};
