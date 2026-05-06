import styled from "styled-components";
import { theme } from '../styles/theme';

const HeaderContainer = styled.header`
  background-color: var(--white);
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  animation: slideInLeft 0.4s ease;

  @media (max-width: 768px) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--primary-blue);
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color: var(--primary-blue);
  font-size: 2.5vw;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 5vw;
  }

  @media (max-width: 480px) {
    font-size: 4vw;
  }
`;

const Subtitle = styled.p`
  color: var(--accent-blue);
  font-size: 1.2vw;
  margin: 0.5rem 0 0 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 3vw;
  }

  @media (max-width: 480px) {
    font-size: 2.5vw;
  }
`;

export const Header = ({ logoUrl = 'https://i.ibb.co/zVvYRGpm/Logo.jpg' } ) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <img src={logoUrl} alt="Capivaras Robóticas" />
        </LogoContainer>
        <TitleContainer>
          <Title>📘 Menu do Professor</Title>
          <Subtitle>Diário de Bordo - OBR Resgate 2026</Subtitle>
        </TitleContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}
