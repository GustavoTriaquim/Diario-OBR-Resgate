import styled from "styled-components";
import { useState } from "react";
import { Header } from '../components/Header';
import { DayCard } from '../components/DayCard';
import { theme } from '../styles/theme';

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--light-blue);
  padding-bottom: ${theme.spacing.xxl};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const SectionTitle = styled.h2`
  color: var(--primary-blue);
  font-size: 2vw;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: ${theme.spacing.xl} 0 ${theme.spacing.lg} 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: reapeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
  background-color: var(--white);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.md};
`;

const EmptyText = styled.p`
  color: var(--text-light);
  font-size: 1.1vw;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const mockDays = [
  {
    id: 1,
    date: '2026-05-01',
    members: 'João, Maria, Pedro, Ana',
  },
  {
    id: 2,
    date: '2026-05-02',
    members: 'João, Maria, Carlos',
  },
  {
    id: 3,
    date: '2026-04-30',
    members: 'Maria, Pedro, Ana, Lucas',
  },
];

export default function Home() {
  const [days] = useState(mockDays);

  const handleDownloadPDF = (dayId, date) => {
    alert(`Download do PDF para o dia ${date}.`);
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <SectionTitle>📋 Selecione um Dia</SectionTitle>

        {days.length > 0 ? (
          <GridContainer>
            {days.map((day) => (
              <DayCard
                key={day.id}
                date={day.date}
                members={day.members}
                onDownload={() => handleDownloadPDF(day.id, day.date)}
              />
            ))}
          </GridContainer>
        ) : (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>Nenhum diário preenchido ainda.</EmptyText>
          </EmptyState>
        )}
      </ContentWrapper>
    </Container>
  );
}
