export enum ETopic {
  SOLIDITY = 'solidity',
  SMARTPY = 'smartpy',
  FUNC = 'func',
  LISK = 'lisk',
  MOTOKO = 'motoko',
  MARKDOWN = 'markdown',
  JAVASCRIPT = 'javascript',
}

export function parseTopic(str: string): ETopic {
  if (!Object.values(ETopic).includes(str as ETopic)) {
    throw new Error(`Invalid topic: ${str}`);
  }
  return str as ETopic;
}
