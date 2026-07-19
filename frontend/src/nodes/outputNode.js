// outputNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { SendHorizontal } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { inputCls, selectCls, labelCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.customOutput;

export const OutputNode = ({ id, data }) => {
  const [name, setName]   = useState(data?.outputName  || id.replace('customOutput-', 'output_'));
  const [type, setType]   = useState(data?.outputType  || 'Text');

  const handles = [{ id: `${id}-value`, type: 'target', position: Position.Left }];

  return (
    <BaseNode id={id} title="Output" subtitle={subtitle} icon={SendHorizontal} accent={accent} handles={handles}>
      <label className={labelCls}>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} aria-label="Output node name" />
      </label>
      <label className={labelCls}>
        Type
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls} aria-label="Output data type">
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
