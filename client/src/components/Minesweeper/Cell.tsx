import { memo, useState, useEffect } from "react";
import { useMobile } from "../../hooks/use-mobile";

// Ensure the Telegram Web App API is defined
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        expand: () => void;
        showAlert: (message: string) => void;
        platform: string;
      };
    };
  }
}

// Initialize Telegram Web App if available
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.expand();
}

interface CellProps {
  x: number;
  y: number;
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  mineCount: number;
  gameOver: boolean;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

function Cell({
  x,
  y,
  isRevealed,
  isMine,
  isFlagged,
  mineCount,
  gameOver,
  onClick,
  onRightClick,
}: CellProps) {
  const isMobile = useMobile();
  const [longPressTimeout, setLongPressTimeout] = useState<number | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  // Determine cell content and classes
  let content = "";
  let cellClass = "cell";

  // Mobile touch handlers
  const handleTouchStart = () => {
    if (gameOver) return;

    // Start long press timer
    const timeout = window.setTimeout(() => {
      setIsLongPress(true);
      // Simulate right click for flag placement
      if ((isFlagged || !isRevealed) && onRightClick) {
        onRightClick({} as React.MouseEvent);
      }
    }, 500); // 500ms long press

    setLongPressTimeout(timeout);
  };

  const handleTouchEnd = () => {
    // Clear the timeout
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }

    // Only trigger click if it was not a long press
    if (!isLongPress && !gameOver) {
      onClick();
    }

    // Reset long press state
    setIsLongPress(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (longPressTimeout) {
        clearTimeout(longPressTimeout);
      }
    };
  }, [longPressTimeout]);

  // Handle right click
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Don't allow flagging revealed cells, but always allow removing flags
    if ((isFlagged || !isRevealed) && onRightClick) {
      onRightClick(e);
    }
  };

  // Styling logic
  if (isFlagged) {
    content = "🚩";
    cellClass += " flagged";
  } else if (isRevealed) {
    cellClass += " revealed";
    if (isMine) {
      content = "💣";
      cellClass += " mine";
    } else if (mineCount > 0) {
      content = mineCount.toString();
      cellClass += ` cell-${mineCount}`;
    }
  }

  // Show mines at game over
  if (gameOver && isMine && !isFlagged) {
    content = "💣";
    cellClass = "cell mine revealed";
  }

  // Add mobile specific props
  const mobileProps = isMobile ? {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: () => {}, // Prevent scrolling issues
  } : {};

  // Add instruction for mobile users
  let titleText = '';
  if (isRevealed && mineCount > 0) {
    titleText = 'Click to reveal adjacent cells if enough flags are placed';
  } else if (isRevealed) {
    titleText = 'Cannot flag revealed cells';
  } else if (isMobile) {
    titleText = 'Long press to place/remove flag';
  }

  return (
    <div
      className={cellClass}
      data-x={x}
      data-y={y}
      onClick={isMobile ? undefined : onClick} // Disable normal click on mobile
      onContextMenu={handleRightClick}
      title={titleText}
      {...mobileProps}
    >
      {content}
    </div>
  );
}

export default memo(Cell);
