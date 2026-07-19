// filterNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { Filter } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { inputCls, selectCls, labelCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.customFilter;

export const FilterNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'Equals');
  const [value,    setValue]    = useState(data?.value    || '');

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left  },
    { id: `${id}-true`,  type: 'source', position: Position.Right },
    { id: `${id}-false`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} title="Filter" subtitle={subtitle} icon={Filter} accent={accent} handles={handles}>
      <label className={labelCls}>
        Condition
        <select value={operator} onChange={(e) => setOperator(e.target.value)} className={selectCls} aria-label="Filter condition">
          <option value="Equals">Equals</option>
          <option value="Contains">Contains</option>
          <option value="GT">Greater Than</option>
          <option value="LT">Less Than</option>
        </select>
      </label>
      <label className={labelCls}>
        Value
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value..." className={inputCls} aria-label="Filter value" />
      </label>
    </BaseNode>
  );
};
