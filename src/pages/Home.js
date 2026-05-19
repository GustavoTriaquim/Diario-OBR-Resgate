import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header.js';
import { DayCard } from '../components/DayCard.js';
import { DiarioDetails } from '../components/DiarioDetails.js';
import { theme } from '../styles/theme.js';
import { fetchAllDiarios } from '../services/diarioService.js';
import { generatePDFFromDiario } from '../utils/pdfGenerator.js';

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--light-blue);
  padding-bottom: ${theme.spacing.xxl};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Title = styled.h2`
  text-align: center;
  color: var(--primary-blue);
  margin: ${theme.spacing.lg} 0;
  text-transform: uppercase;
`;

const Filters = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
  justify-content: center;
`;

const FilterBtn = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  border: 2px solid var(--accent-blue);
  cursor: pointer;
  font-weight: bold;
  background: ${p => p.active ? 'var(--accent-blue)' : 'var(--white)'};
  color: ${p => p.active ? 'var(--white)' : 'var(--accent-blue)'};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

export default function Home() {
  const [diarios, setDiarios] = useState([]);
  const [mod, setMod] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchAllDiarios(mod).then(setDiarios); }, [mod]);

  return (
    <Container>
      <Header />
      <Content>
        <Title>📋 Diários de Bordo OBR</Title>
        <Filters>
          <FilterBtn active={mod === null} onClick={() => setMod(null)}>Todos</FilterBtn>
          <FilterBtn active={mod === 'artistica'} onClick={() => setMod('artistica')}>🎨 Artística</FilterBtn>
          <FilterBtn active={mod === 'resgate'} onClick={() => setMod('resgate')}>🚨 Resgate</FilterBtn>
        </Filters>
        <Grid>
          {diarios.map(d => (
            <DayCard key={d.id.modalidade} diario={d} onOpen={() => setSelected(d)} onPDF={generatePDFFromDiario} />
          ))}
        </Grid>
        {selected && <DiarioDetails diario={selected} onClose={() => setSelected(null)} />}
      </Content>
    </Container>
  );
}
