// CustomEdge.js
// A smoothstep edge that shows a delete button at its midpoint on hover/selection.

import React, { useState } from 'react';
import {
  getSmoothStepPath,
  EdgeLabelRenderer,
  useReactFlow,
} from 'reactflow';
import { X } from 'lucide-react';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  animated,
  style = {},
  markerEnd,
}) => {
  const [hovered, setHovered] = useState(false);
  const { deleteElements } = useReactFlow();

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  const showDelete = hovered || selected;

  return (
    <>
      {/* Invisible wide stroke for easier hover detection */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      />

      {/* Visible edge path */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        className={`react-flow__edge-path ${animated ? 'animated' : ''}`}
        style={{
          stroke: selected ? '#4f46e5' : '#6366f1',
          strokeWidth: selected ? 2.5 : 2,
          filter: selected
            ? 'drop-shadow(0 0 5px rgba(99,102,241,0.5))'
            : hovered
            ? 'drop-shadow(0 0 4px rgba(99,102,241,0.35))'
            : undefined,
          transition: 'stroke 0.15s, stroke-width 0.15s',
          ...style,
        }}
        markerEnd={markerEnd}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      {/* Delete button rendered outside the SVG via EdgeLabelRenderer */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {showDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteElements({ edges: [{ id }] });
              }}
              aria-label="Delete connection"
              title="Delete connection"
              className="
                w-5 h-5 rounded-full bg-white border border-slate-300
                flex items-center justify-center
                text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500
                shadow-md transition-all duration-150 cursor-pointer
              "
            >
              <X size={10} strokeWidth={3} />
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
