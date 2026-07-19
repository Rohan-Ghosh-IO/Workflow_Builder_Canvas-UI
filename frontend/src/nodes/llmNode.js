// llmNode.js
import React from 'react';
import { Position } from 'reactflow';
import { BrainCircuit } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';

const { accent, subtitle } = NODE_CONFIG.llm;

export const LLMNode = ({ id }) => {
  const handles = [
    { id: `${id}-system`,   type: 'target', position: Position.Left  },
    { id: `${id}-prompt`,   type: 'target', position: Position.Left  },
    { id: `${id}-response`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} title="LLM" subtitle={subtitle} icon={BrainCircuit} accent={accent} handles={handles} badge="AI">
      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-violet-50 border border-violet-100/80">
        <BrainCircuit size={13} className="text-violet-400 flex-shrink-0 mt-px" aria-hidden="true" />
        <div>
          <p className="text-[11px] font-semibold text-violet-700 leading-tight">Language Model</p>
          <p className="text-[10px] text-violet-500 leading-relaxed mt-0.5">
            Connect <strong>system</strong> &amp; <strong>prompt</strong> inputs on the left.
            <br /><strong>Response</strong> outputs on the right.
          </p>
        </div>
      </div>
    </BaseNode>
  );
};
