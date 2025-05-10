import { useMobile } from "../../hooks/use-mobile";
import { Flag, Bomb, Target } from 'lucide-react';

interface HelpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function HelpModal({ isVisible, onClose }: HelpModalProps) {
  const isMobile = useMobile();
  if (!isVisible) return null;
  return (    
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gradient-glass backdrop-blur-glass border border-white/10 rounded-xl p-6 max-w-xs w-full text-tg-text text-sm shadow-glass animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-5 h-5 text-tg-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span className="text-lg font-medium">Как играть</span>
        </div>        
        <ul className="space-y-3 mb-6">
          {isMobile ? (
            <>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  👆
                </div>
                <span>Тапните по ячейке, чтобы открыть</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  <Flag size={24} />
                </div>
                <span>Долгое нажатие, чтобы поставить флаг</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  <Bomb size={24} />
                </div>
                <span>Флагами отмечайте мины</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  <Target size={24} />
                </div>
                <span>Откройте все безопасные клетки</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  🖱️
                </div>
                <span>Кликните по ячейке, чтобы открыть</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  <Flag size={24} />
                </div>
                <span>Правый клик, чтобы поставить флаг</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  <Bomb size={24} />
                </div>
                <span>Флагами отмечайте мины</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-glass shadow-glass border border-white/10">
                  <Target size={24} />
                </div>
                <span>Откройте все безопасные клетки</span>
              </li>
            </>
          )}
        </ul>
        <button 
          className="w-full py-3 rounded-xl bg-gradient-button text-tg-button-text font-medium shadow-button hover:shadow-button-hover active:opacity-90 transition-all duration-200 animate-slide-up"
          onClick={onClose}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
