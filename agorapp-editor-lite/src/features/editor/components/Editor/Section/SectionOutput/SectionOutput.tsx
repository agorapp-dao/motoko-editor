import React from 'react';

type TProps = {
  output: string;
};

export const SectionOutput: React.FC<TProps> = ({ output }: TProps) => {
  return <pre>{output}</pre>;
};
