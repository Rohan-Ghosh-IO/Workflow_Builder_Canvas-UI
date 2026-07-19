// delayNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { Clock3 } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { inputCls, labelCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.customDelay;

export const DelayNode = ({ id, data }) => {
  const [ms, setMs] = useState(data?.delayMs ?? 1000);

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left  },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  const onChange = (e) => {
    const v = parseInt(e.target.value, 10);
    setMs(isNaN(v) ? 0 : v);
  };

  return (
    <BaseNode id={id} title="Delay" subtitle={subtitle} icon={Clock3} accent={accent} handles={handles}>
      <label className={labelCls}>
        Wait Duration (ms)
        <input type="number" value={ms} onChange={onChange} min={0} step={100} className={inputCls} aria-label="Delay duration in milliseconds" />
      </label>
      <p className="text-[10px] text-slate-400 font-semibold tabular-nums" aria-live="polite">
        {(ms / 1000).toFixed(2)}s delay
      </p>
    </BaseNode>
  );
};
