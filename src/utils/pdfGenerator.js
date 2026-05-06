import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDFFromDiario = async (diario) => {
  try {
    // Criar elemento temporário (não adicionar ao DOM)
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    element.style.width = '800px';
    element.style.backgroundColor = 'white';

    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #004a99; text-align: center; margin-bottom: 20px;">
          📘 Resumo Diário de Bordo - OBR 2026
        </h1>

        <hr style="border: 1px solid #004a99; margin: 20px 0;">

        <div style="margin-bottom: 20px;">
          <h3 style="color: #004a99; border-bottom: 2px solid #e3f2fd; padding-bottom: 10px;">
            👤 IDENTIFICAÇÃO
          </h3>
          <p><strong>Data:</strong> ${new Date(diario.data).toLocaleDateString('pt-BR')}</p>
          <p><strong>Integrantes:</strong> ${diario.integrantes}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #004a99; border-bottom: 2px solid #e3f2fd; padding-bottom: 10px;">
            🎯 O QUE FIZEMOS HOJE?
          </h3>
          <p><strong>Objetivo:</strong> ${diario.objetivo}</p>
          <p><strong>Atividade:</strong> ${diario.atividade}</p>
          <p><strong>Desafios:</strong> ${Array.isArray(diario.desafios) ? diario.desafios.join(', ') : diario.desafios}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #004a99; border-bottom: 2px solid #e3f2fd; padding-bottom: 10px;">
            📊 DESEMPENHO
          </h3>
          <p><strong>Tentativas:</strong> ${diario.tentativas}</p>
          <p><strong>Acertos:</strong> ${diario.acertos}</p>
          <p><strong>Taxa de Sucesso:</strong> ${diario.tentativas > 0 ? ((diario.acertos / diario.tentativas) * 100).toFixed(2) : 0}%</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #004a99; border-bottom: 2px solid #e3f2fd; padding-bottom: 10px;">
            ❎ PROBLEMAS E SOLUÇÕES
          </h3>
          <p><strong>Problema:</strong> ${diario.problema}</p>
          <p><strong>Hipótese:</strong> ${diario.hipotese}</p>
          <p><strong>Solução:</strong> ${diario.solucao}</p>
          <p><strong>Funcionou?</strong> ${diario.resultado}</p>
        </div>

        ${diario.trabalhouResgate === 'Sim' ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #004a99; border-bottom: 2px solid #e3f2fd; padding-bottom: 10px;">
              🚨 RESGATE
            </h3>
            <p><strong>Capturou Vítima?</strong> ${diario.capturouVitima}</p>
            <p><strong>Identificou Vítima?</strong> ${diario.identificouVitima}</p>
            <p><strong>Posicionou Vítima?</strong> ${diario.posicionouVitima}</p>
          </div>
        ` : ''}

        <div style="margin-bottom: 20px;">
          <h3 style="color: #004a99; border-bottom: 2px solid #e3f2fd; padding-bottom: 10px;">
            🔚 FECHAMENTO
          </h3>
          <p><strong>Aprendizado:</strong> ${diario.aprendizado}</p>
          <p><strong>Próximos Passos:</strong> ${diario.proximosPassos}</p>
          <p><strong>Observações:</strong> ${diario.observacoes || '-'}</p>
        </div>

        ${diario.anexos && diario.anexos !== '-' ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #004a99; border-bottom: 2px solid #e3f2fd; padding-bottom: 10px;">
              🔗 ANEXOS E LINKS
            </h3>
            <p><strong>Links:</strong> ${diario.anexos}</p>
          </div>
        ` : ''}

        <hr style="border: 1px solid #004a99; margin: 20px 0;">
        <footer style="text-align: center; font-size: 10px; color: #666; margin-top: 20px;">
          <p>Gerado automaticamente pelo App Diário de Bordo OBR 2026</p>
          <p>Data de geração: ${new Date().toLocaleDateString('pt-BR')}</p>
        </footer>
      </div>
    `;

    // Adicionar ao DOM temporariamente
    document.body.appendChild(element);

    // Gerar canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Remover do DOM
    document.body.removeChild(element);

    // Criar PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `Resumo_OBR_${diario.data}.pdf`;
    pdf.save(fileName);

    return fileName;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};
