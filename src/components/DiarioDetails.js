import styled from 'styled-components';
import { theme } from '../styles/theme.js';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: var(--white);
  border-radius: ${theme.borderRadius.lg};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  animation: slideInRight 0.4s ease;

  @media (max-width: 768px) {
    max-width: 95vw;
    padding: ${theme.spacing.lg};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--primary-blue);
  transition: ${theme.transitions.normal};

  &:hover {
    transform: scale(1.2);
  }
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid var(--light-blue);

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  color: var(--primary-blue);
  font-size: 1.5vw;
  margin: 0 0 ${theme.spacing.md} 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.label`
  color: var(--text-light);
  font-size: 0.9vw;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const InfoValue = styled.p`
  color: var(--primary-blue);
  font-size: 1vw;
  margin: 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const ChallengesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: 0.5rem;
`;

const ChallengeBadge = styled.span`
  background-color: var(--accent-blue);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9vw;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2vw;
  }
`;

export const DiarioDetails = ({ diario, onClose }) => {
  if (!diario) return null;

  const successRate = diario.tentativas > 0
    ? ((diario.acertos / diario.tentativas) * 100).toFixed(2)
    : 0;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>

        <Section>
          <SectionTitle>👤 Identificação</SectionTitle>
          <InfoRow>
            <InfoItem>
              <InfoLabel>Data</InfoLabel>
              <InfoValue>{new Date(diario.data).toLocaleDateString('pt-BR')}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Integrantes</InfoLabel>
              <InfoValue>{diario.integrantes}</InfoValue>
            </InfoItem>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>🎯 O que fizemos hoje?</SectionTitle>
          <InfoItem>
            <InfoLabel>Objetivo</InfoLabel>
            <InfoValue>{diario.objetivo}</InfoValue>
          </InfoItem>
          <InfoItem style={{ marginTop: '1rem' }}>
            <InfoLabel>Atividade</InfoLabel>
            <InfoValue>{diario.atividade}</InfoValue>
          </InfoItem>
          <InfoItem style={{ marginTop: '1rem' }}>
            <InfoLabel>Desafios</InfoLabel>
            <ChallengesList>
              {Array.isArray(diario.desafios) ? (
                diario.desafios.map((desafio, idx) => (
                  <ChallengeBadge key={idx}>{desafio}</ChallengeBadge>
                ))
              ) : (
                <ChallengeBadge>{diario.desafios}</ChallengeBadge>
              )}
            </ChallengesList>
          </InfoItem>
        </Section>

        <Section>
          <SectionTitle>📊 Desempenho</SectionTitle>
          <InfoRow>
            <InfoItem>
              <InfoLabel>Tentativas</InfoLabel>
              <InfoValue>{diario.tentativas}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Acertos</InfoLabel>
              <InfoValue>{diario.acertos}</InfoValue>
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem>
              <InfoLabel>Taxa de Sucesso</InfoLabel>
              <InfoValue>{successRate}%</InfoValue>
            </InfoItem>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>❎ Problemas e Soluções</SectionTitle>
          <InfoItem>
            <InfoLabel>Problema</InfoLabel>
            <InfoValue>{diario.problema}</InfoValue>
          </InfoItem>
          <InfoItem style={{ marginTop: '1rem' }}>
            <InfoLabel>Hipótese</InfoLabel>
            <InfoValue>{diario.hipotese}</InfoValue>
          </InfoItem>
          <InfoItem style={{ marginTop: '1rem' }}>
            <InfoLabel>Solução</InfoLabel>
            <InfoValue>{diario.solucao}</InfoValue>
          </InfoItem>
          <InfoItem style={{ marginTop: '1rem' }}>
            <InfoLabel>Funcionou?</InfoLabel>
            <InfoValue>{diario.resultado}</InfoValue>
          </InfoItem>
        </Section>

        {diario.trabalhouResgate === 'Sim' && (
          <Section>
            <SectionTitle>🚨 Resgate</SectionTitle>
            <InfoRow>
              <InfoItem>
                <InfoLabel>Capturou Vítima?</InfoLabel>
                <InfoValue>{diario.capturouVitima}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Identificou Vítima?</InfoLabel>
                <InfoValue>{diario.identificouVitima}</InfoValue>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>Posicionou Vítima?</InfoLabel>
                <InfoValue>{diario.posicionouVitima}</InfoValue>
              </InfoItem>
            </InfoRow>
          </Section>
        )}

        <Section>
          <SectionTitle>🔚 Fechamento</SectionTitle>
          <InfoItem>
            <InfoLabel>Aprendizado</InfoLabel>
            <InfoValue>{diario.aprendizado}</InfoValue>
          </InfoItem>
          <InfoItem style={{ marginTop: '1rem' }}>
            <InfoLabel>Próximos Passos</InfoLabel>
            <InfoValue>{diario.proximosPassos}</InfoValue>
          </InfoItem>
          <InfoItem style={{ marginTop: '1rem' }}>
            <InfoLabel>Observações</InfoLabel>
            <InfoValue>{diario.observacoes || '-'}</InfoValue>
          </InfoItem>
        </Section>

        {diario.anexos && diario.anexos !== '-' && (
          <Section>
            <SectionTitle>🔗 Anexos e Links</SectionTitle>
            <InfoItem>
              <InfoLabel>Links</InfoLabel>
              <InfoValue>
                <a href={diario.anexos} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>
                  {diario.anexos}
                </a>
              </InfoValue>
            </InfoItem>
          </Section>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}
