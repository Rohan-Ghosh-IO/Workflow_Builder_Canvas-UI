// authNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { ShieldCheck } from 'lucide-react';
import { BaseNode } from './baseNode';
import { NODE_CONFIG } from '../nodeConfig';
import { inputCls, selectCls, labelCls } from '../fieldStyles';

const { accent, subtitle } = NODE_CONFIG.customAuth;

export const AuthNode = ({ id, data }) => {
  const [authType, setAuthType] = useState(data?.authType || 'API Key');
  const [token,    setToken]    = useState(data?.token    || '');

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left  },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} title="Authorization" subtitle={subtitle} icon={ShieldCheck} accent={accent} handles={handles}>
      <label className={labelCls}>
        Auth Type
        <select value={authType} onChange={(e) => setAuthType(e.target.value)} className={selectCls} aria-label="Authorization type">
          <option value="API Key">API Key</option>
          <option value="OAuth2">OAuth 2.0</option>
          <option value="Bearer">Bearer Token</option>
        </select>
      </label>
      <label className={labelCls}>
        Secret
        <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter secret..." className={inputCls} aria-label="Secret token" />
      </label>
    </BaseNode>
  );
};
