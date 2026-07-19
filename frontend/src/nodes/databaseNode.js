// databaseNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { Database } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { inputCls, labelCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.customDatabase;

export const DatabaseNode = ({ id, data }) => {
  const [table, setTable] = useState(data?.tableName || '');
  const [query, setQuery] = useState(data?.query     || '');

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left  },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} title="Database" subtitle={subtitle} icon={Database} accent={accent} handles={handles}>
      <label className={labelCls}>
        Table Name
        <input type="text" value={table} onChange={(e) => setTable(e.target.value)} placeholder="e.g. users_table" className={inputCls} aria-label="Table name" />
      </label>
      <label className={labelCls}>
        SQL Query
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SELECT * FROM users..." className={inputCls} aria-label="SQL query" />
      </label>
    </BaseNode>
  );
};
