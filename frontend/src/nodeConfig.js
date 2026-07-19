// nodeConfig.js
// Central accent color config for all node types.
// One file to change colors across the entire app.

export const NODE_CONFIG = {
  customInput: {
    label: 'Input',
    subtitle: 'Receive initial data',
    accent: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'bg-blue-500',
      text: 'text-blue-600',
    },
  },
  llm: {
    label: 'LLM',
    subtitle: 'Language model inference',
    accent: {
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      icon: 'bg-violet-500',
      text: 'text-violet-600',
    },
  },
  customOutput: {
    label: 'Output',
    subtitle: 'Export pipeline result',
    accent: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: 'bg-emerald-500',
      text: 'text-emerald-600',
    },
  },
  text: {
    label: 'Text',
    subtitle: 'Template with variables',
    accent: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      icon: 'bg-orange-500',
      text: 'text-orange-600',
    },
  },
  customNote: {
    label: 'Note',
    subtitle: 'Canvas annotation',
    accent: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'bg-amber-500',
      text: 'text-amber-600',
    },
  },
  customFilter: {
    label: 'Filter',
    subtitle: 'Conditional routing',
    accent: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      icon: 'bg-pink-500',
      text: 'text-pink-600',
    },
  },
  customAuth: {
    label: 'Auth',
    subtitle: 'Manage credentials',
    accent: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'bg-green-500',
      text: 'text-green-600',
    },
  },
  customDatabase: {
    label: 'Database',
    subtitle: 'Query data store',
    accent: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      icon: 'bg-cyan-500',
      text: 'text-cyan-600',
    },
  },
  customDelay: {
    label: 'Delay',
    subtitle: 'Wait before proceeding',
    accent: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'bg-yellow-500',
      text: 'text-yellow-600',
    },
  },
};
