import { SpeakingSection, QuestionType } from '../../core/models/models';

export const speakingDataSource: SpeakingSection[] = [
  {
    id: 1,
    title: 'Speaking Prompts & Audio Scenarios',
    questions: [
      {
        id: 'q_speaking_101',
        type: QuestionType.SPEAKING,
        prompt: 'Introduce yourself to the examiner. Describe your background, family, and your favorite hobbies. Speak for 1-2 minutes.',
        answer: '',
        explanation: 'Try to speak continuously. Use transition words like "besides", "as well as", and give specific details about your hobbies.',
        localExplanations: { tr: 'Sürekli konuşmaya çalışın. "besides" (bunun yanı sıra), "as well as" (gibi) bağlaçlarını kullanın ve hobileriniz hakkında detaylar verin.' }
      },
      {
        id: 'q_speaking_102',
        type: QuestionType.SPEAKING,
        prompt: 'Do you believe governments are doing enough to protect the environment? State your opinion and give examples. Speak for 1-2 minutes.',
        answer: '',
        explanation: 'State your stance clearly. Use expressions like "From my perspective", "To support this argument", and offer examples of green policies.',
        localExplanations: { tr: 'Görüşünüzü netçe belirtin. "From my perspective" (Benim açımdan), "To support this" (Bunu desteklemek için) gibi ifadeler kullanın.' }
      },
      {
        id: 'q_speaking_103',
        type: QuestionType.SPEAKING,
        prompt: 'Tell a short, funny story or describe a funny incident that happened to you or someone you know recently. Speak for 1-2 minutes.',
        answer: '',
        explanation: 'Use dynamic pacing and voice modulation. Use narrative words like "All of a sudden", "Out of nowhere", "It turned out that".',
        localExplanations: { tr: 'Dinamik tonlama kullanın. "All of a sudden" (Aniden), "Out of nowhere" (Durup dururken) gibi hikaye anlatımı bağlaçlarını kullanın.' }
      },
      {
        id: 'q_speaking_104',
        type: QuestionType.SPEAKING,
        prompt: 'Compare life in a crowded metropolitan city with life in a quiet rural countryside. Which would you prefer and why? Speak for 1-2 minutes.',
        answer: '',
        explanation: 'Use comparison connectors: "On the one hand", "Conversely", "While city life offers...", "rural areas provide...".',
        localExplanations: { tr: 'Karşılaştırma bağlaçları kullanın: "On the one hand" (Bir yandan), "Conversely" (Aksine) ve "While..." (iken) kalıplarını kullanın.' }
      },
      {
        id: 'q_speaking_105',
        type: QuestionType.SPEAKING,
        prompt: 'Describe a famous historical figure you admire. Explain who they were, what they achieved, and why they inspire you. Speak for 1-2 minutes.',
        answer: '',
        explanation: 'Outline their historical achievements using strong adjectives: "influential", "courageous", "visionary", "revolutionized".',
        localExplanations: { tr: 'Tarihsel başarılarını güçlü sıfatlarla ("influential" - etkileyici, "visionary" - vizyoner) özetleyin.' }
      }
    ]
  }
];
