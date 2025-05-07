import { useMobile } from "../../hooks/use-mobile";

interface HelpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function HelpModal({ isVisible, onClose }: HelpModalProps) {
  const isMobile = useMobile();
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl max-w-[90%] w-96">
        <h2 className="text-xl font-bold mb-3">How to Play</h2>
        
        {isMobile ? (
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Tap a cell to reveal it</li>
            <li>Long-press or use the 🚩 button to place/remove flags</li>
            <li>Use Flag Mode to easily place multiple flags</li>
            <li>Numbers show how many mines are adjacent</li>
            <li>Flag all mines to win!</li>
            <li>Tap on a numbered cell to reveal adjacent cells if the correct number of flags is placed</li>
          </ul>
        ) : (
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Click a cell to reveal it</li>
            <li>Right-click or use the 🚩 button to place flags</li>
            <li>Numbers show how many mines are adjacent</li>
            <li>Flag all mines to win!</li>
            <li>If you click on a numbered cell with the correct number of flags around it, all non-flagged adjacent cells will be revealed</li>
          </ul>
        )}
        <button 
          id="close-help" 
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
