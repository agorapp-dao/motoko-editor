import styled from 'styled-components';

export const LessonTitle = styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  
  h2 {
    font-size: 1rem;
    color: ${p => p.theme.intenseText};
    font-weight: 600;
    flex: 1 1 auto;
  }
  
  span {
    font-size: 0.8rem;
  }
`;
