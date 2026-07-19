// noteNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { StickyNote } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { textareaCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.customNote;

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left  },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];
  return (
    <BaseNode id={id} title="Note" subtitle={subtitle} icon={StickyNote} accent={accent} handles={handles}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a canvas annotation..."
        rows={3}
        className={textareaCls}
        aria-label="Note content"
      />
    </BaseNode>
  );
};
