// textNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { textareaCls, labelCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.text;

const extractVars = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (!vars.includes(m[1])) vars.push(m[1]);
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const vars = extractVars(text);

  const handles = [
    ...vars.map((v) => ({ id: `${id}-${v}`,    type: 'target', position: Position.Left  })),
    {                    id: `${id}-output`,    type: 'source', position: Position.Right },
  ];

  const lines   = text.split('\n');
  const rows    = Math.max(2, Math.min(10, lines.length));
  const cols    = Math.max(25, Math.min(50, lines.reduce((m, l) => Math.max(m, l.length), 0)));

  return (
    <BaseNode id={id} title="Text" subtitle={subtitle} icon={FileText} accent={accent} handles={handles}>
      <label className={labelCls}>
        Content
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={rows}
          cols={cols}
          placeholder="Type {{variable}} to create dynamic handles"
          className={textareaCls}
          aria-label="Text node content"
        />
      </label>

      <AnimatePresence>
        {vars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-1 overflow-hidden"
          >
            {vars.map((v) => (
              <motion.span
                key={v}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[10px] font-bold border border-orange-200"
                title={`Variable: {{${v}}}`}
              >
                <span className="opacity-50">{'{{'}</span>{v}<span className="opacity-50">{'}}'}</span>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </BaseNode>
  );
};
