import styled from "styled-components";
import { theme } from '../styles/theme';

const CardContainer = styled.div`
  background-color: var(--white);
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.normal};
  cursor: pointer;
  animation: fadeIn 0.4 ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const DateIcon = styled.span`
  font-size: 2rem;
`;

const DateInfo = styled.div`
  flex: 1;
`;

const DateLabel = styled.p`
  color: var(--text-light);
  font-size: 0.9vw;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const DateValue = styled.h3`
  color: var(--primary-blue);
  font-size: 1.8vw;
  margin: 0.25rem 0 0 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const Members = styled.div`
  margin: ${theme.spacing.md} 0;
  padding: ${theme.spacing.md};
  background-color: var(--gray);
  border-radius: ${theme.borderRadius.sm};
  border-left: 4px solid var(--accent-blue);
`;

const MembersLabel = styled.p`
  color: var(--text-light);
  font-size: 0.85vw;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 2vw;
  }
`;

const MembersText = styled.p`
  color: var(--primary-blue);
  font-size: 1vw;
  margin: 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const DownloadButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--success-green);
  color: var(--white);
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1vw;
  font-weight: 700;
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 2.5vw;
    padding: 0.8rem;
  }
`;

export const DayCard = ({ date, members, onDownload }) => {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <CardContainer>
      <DateDisplay>
        <DateIcon>📅</DateIcon>
        <DateInfo>
          <DateLabel>Data do Diário</DateLabel>
          <DateValue>{formattedDate}</DateValue>
        </DateInfo>
      </DateDisplay>

      <Members>
        <MembersLabel>👥 Integrantes Presentes</MembersLabel>
        <MembersText>{members}</MembersText>
      </Members>

      <DownloadButton onClick={onDownload}>
        📥 Baixar Resumo em PDF
      </DownloadButton>
    </CardContainer>
  )
}
