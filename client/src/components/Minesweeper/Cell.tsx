import { memo, useState, useEffect } from "react";
import { useMobile } from "../../hooks/use-mobile";
import type { CellProps } from "../../types/game";

// Ensure the Telegram Web App API is defined
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        showAlert: (message: string) => void;
        platform: string;
        sendData?: (data: string) => void;
        backgroundColor?: string;
        textColor?: string;
        buttonColor?: string;
        buttonTextColor?: string;
        initData?: string;
      };
    };
  }
}

// Initialize Telegram Web App if available
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.expand();
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

  let content = "";
  let cellClass = "cell";

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (gameOver) return;

    const timeout = window.setTimeout(() => {
      setIsLongPress(true);
      if ((isFlagged || !isRevealed) && onRightClick) {
        onRightClick({} as React.MouseEvent);
      }
    }, 500);

    setLongPressTimeout(timeout);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }

    if (!isLongPress && !gameOver) {
      onClick();
    }

    setIsLongPress(false);
  };

  useEffect(() => {
    return () => {
      if (longPressTimeout) {
        clearTimeout(longPressTimeout);
      }
    };
  }, [longPressTimeout]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isRevealed || isFlagged) {
      onRightClick(e);
    }
  };

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

  if (gameOver && isMine && !isFlagged) {
    content = "💣";
    cellClass = "cell mine revealed";
  }

  const mobileProps = isMobile ? {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  } : {};

  return (
    <div
      className={cellClass}
      data-x={x}
      data-y={y}
      onClick={isMobile ? undefined : onClick}
      onContextMenu={handleRightClick}
      {...mobileProps}
    >
      {content}
    </div>
  );
}

export default memo(Cell);
