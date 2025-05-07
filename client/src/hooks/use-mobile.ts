import { useState, useEffect } from 'react';

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Проверка, является ли устройство мобильным
    const checkMobile = () => {
      // Проверяем, запущено ли приложение в Telegram Web App
      if (window.Telegram?.WebApp) {
        return true;
      }
      
      // Проверяем размер экрана
      const mobileWidth = 768;
      return window.innerWidth < mobileWidth;
    };

    // Устанавливаем начальное значение
    setIsMobile(checkMobile());

    // Добавляем слушатель изменения размера окна
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);

    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}
