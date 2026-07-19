// inputNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { FileInput } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { inputCls, selectCls, labelCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.customInput;

export const InputNode = ({ id, data }) => {
  const [name, setName]   = useState(data?.inputName  || id.replace('customInput-', 'input_'));
  const [type, setType]   = useState(data?.inputType  || 'Text');

  const handles = [{ id: `${id}-value`, type: 'source', position: Position.Right }];

  return (
    <BaseNode id={id} title="Input" subtitle={subtitle} icon={FileInput} accent={accent} handles={handles}>
      <label className={labelCls}>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} aria-label="Input node name" />
      </label>
      <label className={labelCls}>
        Type
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls} aria-label="Input data type">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
