import { QUESTIONS } from '../data/questions.ts';
import { AssessmentPayload, OptionId } from '../types.ts';

// Webhook endpoint for n8n integration
export const WEBHOOK_URL = 'https://dnaworkia-n8n.vkfaze.easypanel.host/webhook/testecomportamental';

const UTM_SOURCE_MAX_LENGTH = 100;

/**
 * Reads utm_source from the landing URL.
 * Example: https://formulario.dnawork.ai/?utm_source=instagram
 */
export function readUtmSource(search: string): string | null {
  const raw = new URLSearchParams(search).get('utm_source');
  if (!raw) return null;

  const value = raw.trim().replace(/[\u0000-\u001F\u007F]/g, '').slice(0, UTM_SOURCE_MAX_LENGTH);
  return value || null;
}

/**
 * Builds the structured payload according to DNAWork n8n specification
 */
export function buildAssessmentPayload(
  answersMap: Record<number, OptionId>,
  utmSource: string | null
): AssessmentPayload {
  return {
    source: "DNAWork - Teste Comportamental",
    utm_source: utmSource,
    submittedAt: new Date().toISOString(),
    answers: QUESTIONS.map((question) => {
      const selectedOptionId = answersMap[question.id];
      const selectedOption = question.options.find(
        (option) => option.id === selectedOptionId
      );

      return {
        questionId: question.id,
        question: question.question,
        optionId: selectedOption?.id || null,
        answer: selectedOption?.text || null
      };
    })
  };
}

/**
 * Submits the completed assessment to the n8n webhook
 */
export async function submitAssessment(
  answersMap: Record<number, OptionId>,
  utmSource: string | null = readUtmSource(typeof window !== 'undefined' ? window.location.search : '')
): Promise<boolean> {
  const payload = buildAssessmentPayload(answersMap, utmSource);

  // Safe developer logging
  console.log('[DNAWork] Enviando avaliação para webhook:', WEBHOOK_URL);
  console.log('[DNAWork] Payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP no envio da avaliação: ${response.status} ${response.statusText}`);
    }

    console.log('[DNAWork] Avaliação enviada com sucesso ao webhook!');
    return true;
  } catch (error) {
    console.error('[DNAWork] Falha ao enviar avaliação para webhook:', error);
    throw error;
  }
}
