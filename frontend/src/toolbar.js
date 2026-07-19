import React from 'react';
import { DraggableNode } from './draggableNode';

const NODES = [
  { type: 'customInput',    label: 'Input'    },
  { type: 'llm',            label: 'LLM'      },
  { type: 'customOutput',   label: 'Output'   },
  { type: 'text',           label: 'Text'     },
  { type: 'customNote',     label: 'Note'     },
  { type: 'customFilter',   label: 'Filter'   },
  { type: 'customAuth',     label: 'Auth'     },
  { type: 'customDatabase', label: 'Database' },
  { type: 'customDelay',    label: 'Delay'    },
];

export const PipelineToolbar = () => (
  <nav
    className="bg-white border-b border-slate-200/60 px-5 py-2 flex items-center gap-2 flex-wrap flex-shrink-0 shadow-sm z-10"
    aria-label="Node palette — drag items onto the canvas"
  >
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 select-none flex-shrink-0">
      Nodes
    </span>
    <div className="w-px h-4 bg-slate-200 mr-1 flex-shrink-0" aria-hidden="true" />
    {NODES.map(({ type, label }) => (
      <DraggableNode key={type} type={type} label={label} />
    ))}
  </nav>
);
