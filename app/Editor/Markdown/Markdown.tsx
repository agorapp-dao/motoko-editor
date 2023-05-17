import React from 'react';
import ReactMarkdown from 'react-markdown';
import * as S from './Markdown.styled';
import {Underline} from "@/app/Editor/Markdown/Underline/Underline";
import {CodeSnippet} from "@/app/Editor/Markdown/CodeSnippet/CodeSnippet";

type TProps = {
  children: string;
};

export const Markdown: React.FC<TProps> = ({ children }: TProps) => (
  <S.Wrapper>
    <ReactMarkdown
      components={{
        code({
          node, inline, className, children, ...props
        }) {
          return (<CodeSnippet code={String(children).replace(/\n$/, '')} />);
        },
        h6({
          node, className, children, ...props
        }) {
          return (
            <>
              <S.CenteredText>{children}</S.CenteredText>
              <Underline />
            </>
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
