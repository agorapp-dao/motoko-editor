import React from 'react';
import ReactMarkdown from 'react-markdown';
import * as S from './Markdown.styled';
import { MonacoCodeSnippet } from '@/app/Editor/Monaco/MonacoCodeSnippet';

type TProps = {
  children: string;
};

export const Markdown: React.FC<TProps> = ({ children }: TProps) => (
  <S.Wrapper>
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          return (
            <MonacoCodeSnippet
              code={String(children).replace(/\n$/, '')}
              language={language}
              inline={inline}
            />
          );
        },
        h2({ children }) {
          return (
            <S.H2>
              {children}
            </S.H2>
          );
        },
        p({ children }) {
          return (
            <S.P>
              {children}
            </S.P>
          );
        },
        // a({ href, children }) {
        //   return (
        //     // eslint-disable-next-line react/jsx-no-useless-fragment
        //     <>
        //       {href
        //       && (
        //       <ExternalLink href={href}>
        //         {String(children)}
        //       </ExternalLink>
        //       ) }
        //     </>
        //   );
        // },
      }}
    >
      {children}
    </ReactMarkdown>
  </S.Wrapper>
);
