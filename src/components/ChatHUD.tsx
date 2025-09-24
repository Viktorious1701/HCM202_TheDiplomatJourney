import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { useRoomChannel } from '@/hooks/useRoomChannel';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import clsx from 'clsx';

// This component handles all room management and chat functionality.
export function ChatHUD() {
  const roomId = useGameStore(s => s.roomId);
  const playerId = useGameStore(s => s.playerId);
  const playerName = useGameStore(s => s.playerName);
  const leaveRoom = useGameStore(s => s.leaveRoom);

  const { online, chat, postChat, setTyping, typingDetails } = useRoomChannel({ roomId: roomId || undefined, playerId, playerName });
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [msg, setMsg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [roomId, chat, typingDetails]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const copyCode = async () => {
    try {
      if (roomId) {
        await navigator.clipboard.writeText(roomId);
        setCopied(true);
      }
    } catch { }
  };

  // The outer Card component is removed to make the component more modular for the sidebar.
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold flex items-center gap-2">
          <span className="text-muted-foreground">Room</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted border border-border text-foreground" title="Room code">{roomId}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={copyCode} title="Copy code">
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => leaveRoom()} className="text-xs">Leave</Button>
        </div>
      </div>
      {copied && <div className="mb-2 text-[10px] text-primary uppercase tracking-wide">Copied</div>}

      <section>
        <h4 className="font-semibold text-xs mb-1 tracking-wide text-muted-foreground">Online ({online.length})</h4>
        <div className="flex flex-wrap gap-1.5">
          {online.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
          {online.map(name => (
            <span key={name} className="px-2 py-0.5 rounded-full bg-muted/60 border border-border/60 text-[11px] flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-primary/20 text-[9px] flex items-center justify-center text-primary font-medium">
                {name.slice(0, 1).toUpperCase()}
              </span>
              <span className="max-w-[70px] truncate" title={name}>{name}</span>
              {name === playerName && <span className="text-[8px] uppercase text-primary/80">You</span>}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h4 className="font-semibold text-xs mb-1 tracking-wide text-muted-foreground flex items-center gap-2">Chat {typingDetails.length > 0 && <span className="text-[9px] text-primary/70">• {typingDetails.length} typing</span>}</h4>
        <div ref={chatRef} className="h-40 overflow-auto rounded border border-border/60 bg-background/70 p-2 space-y-1">
          {chat.length === 0 && <div className="text-muted-foreground text-[11px]">No messages</div>}
          {chat.map((c, i) => {
            const self = c.playerId === playerId;
            const rel = formatRelativeTime(c.ts);
            return (
              <div key={i} className={clsx('rounded px-2 py-1 text-[11px] leading-snug', c.system ? 'italic text-muted-foreground bg-transparent text-center' : self ? 'bg-primary text-primary-foreground ml-auto max-w-[75%]' : 'bg-muted/70 max-w-[75%]')}>
                {c.system ? c.content : <><span className="text-[9px] font-semibold opacity-70 mr-1">{c.playerName || c.playerId.slice(0, 6)}</span>{c.content}</>}
                <span className="block text-[9px] opacity-50 mt-0.5 text-right font-mono">{rel}</span>
              </div>
            );
          })}
          {typingDetails.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {typingDetails.map(t => (
                <span key={t.playerId} className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
                  {t.playerName}
                  <DotAnimation />
                </span>
              ))}
            </div>
          )}
        </div>
        <form className="mt-2 flex gap-1" onSubmit={e => { e.preventDefault(); if (!msg.trim()) return; postChat(msg.trim()); setMsg(''); }}>
          <input
            className="flex-1 border rounded px-2 py-1 text-[11px] bg-background/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
            value={msg}
            onChange={e => { const v = e.target.value; setMsg(v); setTyping(!!v); }}
            onBlur={() => setTyping(false)}
            placeholder="Message..."
          />
          <Button size="sm" type="submit" className="text-[11px] px-3">Send</Button>
        </form>
      </section>
    </div>
  );
}

function formatRelativeTime(ts: number): string {
  const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (diffSec < 5) return 'now';
  if (diffSec < 60) return diffSec + 's';
  const m = Math.floor(diffSec / 60);
  if (m < 60) return m + 'm';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h';
  const d = Math.floor(h / 24);
  return d + 'd';
}

function DotAnimation() {
  return (
    <span className="flex gap-[2px]">
      <span className="w-1 h-1 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0ms' }} />
      <span className="w-1 h-1 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '150ms' }} />
      <span className="w-1 h-1 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '300ms' }} />
    </span>
  );
}
