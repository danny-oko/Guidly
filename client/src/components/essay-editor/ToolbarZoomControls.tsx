import { Minus, Plus } from 'lucide-react';

interface ToolbarZoomControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export default function ToolbarZoomControls({
  zoom,
  onZoomChange,
}: ToolbarZoomControlsProps) {
  return (
    <div className="doc-editor__zoom">
      <button
        type="button"
        className="doc-editor__tool"
        aria-label="Zoom out"
        onClick={() => onZoomChange(Math.max(0.75, zoom - 0.1))}
      >
        <Minus size={15} strokeWidth={2} />
      </button>
      <span className="doc-editor__zoom-value">{Math.round(zoom * 100)}%</span>
      <button
        type="button"
        className="doc-editor__tool"
        aria-label="Zoom in"
        onClick={() => onZoomChange(Math.min(1.5, zoom + 0.1))}
      >
        <Plus size={15} strokeWidth={2} />
      </button>
    </div>
  );
}
