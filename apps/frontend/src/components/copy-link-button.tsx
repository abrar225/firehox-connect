'use client';

import { useState } from 'react';
import { Copy, Check, Link } from 'lucide-react';

interface CopyLinkButtonProps {
  roomId: string;
  variant?: 'full' | 'compact';
}

export function CopyLinkButton({ roomId, variant = 'full' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/room/${roomId}/lobby`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleCopy}
        className="control-btn"
        title="Copy room link"
        aria-label="Copy room link"
      >
        {copied ? (
          <Check className="w-5 h-5 text-fh-success" />
        ) : (
          <Link className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`btn-secondary flex items-center gap-2 w-full justify-center transition-all duration-fh-default
                  ${copied ? 'border-fh-success text-fh-success' : ''}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy Invite Link</span>
        </>
      )}
    </button>
  );
}
