import styled from 'styled-components';
import { theme } from '../styles/theme.js';

const Card = styled.div`
  background: var(--white);
  padding: ${theme.spacing.md};
  border-radius: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  border-left: 10px solid ${p => p.mod === 'artistica' ? 'var(--info-yellow)' : 'var(--error-red)'};
  `;

const Badge = styled.div`
  display: inline-block;
  padding: 0.25rem ${theme.spacing.xs};
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.xs};
  background: ${p => p.mod === 'artistica' ? '#fefcbf' : '#fed7d7'};
  color: ${p => p.mod === 'artistica' ? '#744210' : '#822727'};
`;

export const DayCard = ({ diario, onOpen, onPDF }) => {
  <Card mod={diario.modalidade}>
    <Badge mod={diario.modalidade}>{diario.modalidade.toUpperCase()}</Badge>
    <h3 style={{ margin: '0 0 10px 0'}}>📅 {new Date(diario.data).toLocaleDateString('pt-BR')}</h3>
    <p style={{ fontSize: '14px', color: 'var(--text-light)'}}>👥 {diario.integrantes}</p>
    <p style={{ fontSize: '14px', color: 'var(--text-light)'}}>📊 Taxa: <strong>{diario.taxa}</strong></p>
    <div style={{ display: 'flex', gap: '${theme.spacing.xs}', marginTop: '${theme.spacing.sm}'}}>
      
    </div>
  </Card>
};
