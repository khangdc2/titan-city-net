import React from "react";

export default function ZoomIndicator({ zoom }: { zoom: number }) {
  return (
    <div className="absolute bottom-4 right-4 text-xs bg-black/60 px-2 py-1 rounded text-yellow-300 z-50">
      🔍 Zoom: {zoom}% (phím + / -)
    </div>
  );
}
