interface TelegramWebApp {
  expand: () => void;
  showAlert: (message: string) => void;
  platform: string;
  backgroundColor?: string;
  textColor?: string;
  sendData: (data: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}