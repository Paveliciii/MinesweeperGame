import { useMobile } from "../../hooks/use-mobile";

interface HelpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function HelpModal({ isVisible, onClose }: HelpModalProps) {
  const isMobile = useMobile();
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-[#23272f] border border-white/10 rounded-xl p-4 max-w-xs w-full text-white text-sm shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span>Как играть</span>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {isMobile ? (
            <>
              <li>Тапните по ячейке, чтобы открыть</li>
              <li>Долгое нажатие или 🚩 — поставить флаг</li>
              <li>Флагами отмечайте мины</li>
              <li>Откройте все безопасные клетки для победы</li>
            </>
          ) : (
            <>
              <li>Кликните по ячейке, чтобы открыть</li>
              <li>Правый клик или 🚩 — поставить флаг</li>
              <li>Флагами отмечайте мины</li>
              <li>Откройте все безопасные клетки для победы</li>
            </>
          )}
        </ul>
        <button 
          className="mt-4 w-full py-1.5 rounded-md bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
          onClick={onClose}
        >
          Ок
        </button>
      </div>
    </div>
  );
}
