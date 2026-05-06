import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header.js';
import { DayCard } from '../components/DayCard.js';
import { DiarioDetails } from '../components/DiarioDetails.js';
import { theme } from '../styles/theme.js';
import { fetchAllDiarios, fetchDiarioById } from '../services/diarioService.js';
import { generatePDFFromDiario } from '../utils/pdfGenerator.js';

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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxl};
  font-size: 1.2vw;
  color: var(--accent-blue);

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm};
  border: 2px solid var(--light-blue);
  border-radius: ${theme.borderRadius.sm};
  font-size: 1vw;
  transition: ${theme.transitions.normal};

  &:focus {
    border-color: var(--accent-blue);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: var(--error-red);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.lg};
  border-left: 4px solid var(--error-red);
  font-size: 1vw;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

export default function Home() {
  const [diarios, setDiarios] = useState([]);
  const [filteredDiarios, setFilteredDiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDiario, setSelectedDiario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const loadDiarios = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllDiarios();
        setDiarios(data);
        setFilteredDiarios(data);
      } catch (err) {
        setError('Erro ao carregar os diários. Verifique sua conexão com Firebase.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDiarios();
  }, []);

  useEffect(() => {
    const filtered = diarios.filter(diario => {
      const searchLower = searchTerm.toLowerCase();
      return (
        diario.integrantes.toLowerCase().includes(searchLower) ||
        diario.objetivo.toLowerCase().includes(searchLower) ||
        new Date(diario.data).toLocaleDateString('pt-BR').includes(searchTerm)
      );
    });
    setFilteredDiarios(filtered);
  }, [searchTerm, diarios]);

  const handleViewDetails = async (diarioId) => {
    try {
      const diario = await fetchDiarioById(diarioId);
      setSelectedDiario(diario);
    } catch (err) {
      setError('Erro ao carregar detalhes do diário.');
      console.error(err);
    }
  };

  const handleDownloadPDF = async (diario) => {
    try {
      setIsGeneratingPDF(true);
      await generatePDFFromDiario(diario);
    } catch (err) {
      setError('Erro ao gerar PDF. Tente novamente.');
      console.error(err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SectionTitle>📋 Diários de Bordo</SectionTitle>

        <FilterContainer>
          <FilterInput
            type="text"
            placeholder="🔍 Buscar por integrantes, objetivo ou data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterContainer>

        {loading ? (
          <LoadingContainer>
            ⏳ Carregando diários...
          </LoadingContainer>
        ) : filteredDiarios.length > 0 ? (
          <GridContainer>
            {filteredDiarios.map((diario) => (
              <DayCard
                key={diario.id}
                diario={diario}
                onViewDetails={handleViewDetails}
                onDownloadPDF={handleDownloadPDF}
                isLoading={isGeneratingPDF}
              />
            ))}
          </GridContainer>
        ) : (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>
              {searchTerm ? 'Nenhum diário encontrado com essa busca.' : 'Nenhum diário preenchido ainda.'}
            </EmptyText>
          </EmptyState>
        )}

        {selectedDiario && (
          <DiarioDetails
            diario={selectedDiario}
            onClose={() => setSelectedDiario(null)}
          />
        )}
      </ContentWrapper>
    </Container>
  );
}
