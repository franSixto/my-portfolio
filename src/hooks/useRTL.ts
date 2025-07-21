import { useLanguage } from '@/contexts/LanguageContext';

export function useRTL() {
  const { isRTL, direction } = useLanguage();

  // Función para intercambiar clases left/right automáticamente
  const rtlClass = (ltrClass: string, rtlClass?: string) => {
    if (!isRTL) return ltrClass;
    
    if (rtlClass) return rtlClass;

    // Auto-intercambio de clases comunes, preservando center
    return ltrClass
      .replace(/\bleft-/g, 'temp-left-')
      .replace(/\bright-/g, 'left-')
      .replace(/\btemp-left-/g, 'right-')
      .replace(/\bml-/g, 'temp-ml-')
      .replace(/\bmr-/g, 'ml-')
      .replace(/\btemp-ml-/g, 'mr-')
      .replace(/\bpl-/g, 'temp-pl-')
      .replace(/\bpr-/g, 'pl-')
      .replace(/\btemp-pl-/g, 'pr-')
      .replace(/\btext-left\b/g, 'text-right')
      .replace(/\btext-right\b/g, 'text-left')
      // NO intercambiar text-center, justify-center, items-center
      .replace(/\bjustify-start\b/g, 'justify-end')
      .replace(/\bjustify-end\b/g, 'justify-start')
      .replace(/\bitems-start\b/g, 'items-end')
      .replace(/\bitems-end\b/g, 'items-start')
      .replace(/\brounded-l\b/g, 'rounded-r')
      .replace(/\brounded-r\b/g, 'rounded-l')
      .replace(/\bborder-l\b/g, 'border-r')
      .replace(/\bborder-r\b/g, 'border-l');
  };

  // Función para obtener clases de espaciado RTL-aware
  const spacing = {
    marginLeft: (size: string) => rtlClass(`ml-${size}`),
    marginRight: (size: string) => rtlClass(`mr-${size}`),
    paddingLeft: (size: string) => rtlClass(`pl-${size}`),
    paddingRight: (size: string) => rtlClass(`pr-${size}`),
    spaceX: (size: string) => rtlClass(`space-x-${size}`),
  };

  // Función para obtener clases de posicionamiento RTL-aware
  const positioning = {
    left: (size: string) => rtlClass(`left-${size}`),
    right: (size: string) => rtlClass(`right-${size}`),
    textAlign: (align: 'left' | 'right' | 'center') => {
      if (align === 'center') return 'text-center';
      return rtlClass(`text-${align}`);
    },
    justify: (align: 'start' | 'end' | 'center') => {
      if (align === 'center') return 'justify-center';
      return rtlClass(`justify-${align}`);
    },
    items: (align: 'start' | 'end' | 'center') => {
      if (align === 'center') return 'items-center';
      return rtlClass(`items-${align}`);
    },
  };

  // Función para iconos que necesitan ser volteados en RTL
  const flipIcon = (className: string = '') => {
    return isRTL ? `${className} rtl-flip` : className;
  };

  return {
    isRTL,
    direction,
    rtlClass,
    spacing,
    positioning,
    flipIcon,
  };
}
