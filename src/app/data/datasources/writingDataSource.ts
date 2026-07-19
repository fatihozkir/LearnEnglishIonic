import { WritingSection, QuestionType } from '../../core/models/models';

export const writingDataSource: WritingSection[] = [
  {
    id: 1,
    title: 'Academic & Professional Writing Tasks',
    questions: [
      {
        id: 'q_writing_101',
        type: QuestionType.WRITING,
        prompt: 'Some people believe that remote work benefits both employers and employees. Others argue it harms productivity and communication. Write an argumentative essay (250-300 words) presenting your opinion.',
        answer: '',
        explanation: 'A good essay should have an introduction with a clear thesis statement, two body paragraphs representing opposing views, and a balanced conclusion.',
        localExplanations: { tr: 'İyi bir kompozisyon; net bir tez cümlesi içeren giriş bölümü, karşıt görüşleri sunan iki gelişme paragrafı ve dengeli bir sonuç bölümünden oluşmalıdır.' }
      },
      {
        id: 'q_writing_102',
        type: QuestionType.WRITING,
        prompt: 'You recently dined at a local restaurant and experienced terrible customer service and cold food. Write a formal letter of complaint (150-200 words) to the manager demanding a refund.',
        answer: '',
        explanation: 'Use formal salutations (Dear Manager), specify the date/time of dining, clearly explain the issues, and state the desired resolution.',
        localExplanations: { tr: 'Resmi bir hitap kullanın (Sayın Müdür), yemek yediğiniz tarih ve saati belirtin, sorunları net bir şekilde açıklayın ve talep ettiğiniz çözümü yazın.' }
      },
      {
        id: 'q_writing_103',
        type: QuestionType.WRITING,
        prompt: 'Describe a life-changing decision you had to make in your life. Detail the challenges you faced and how that decision shaped your current future (200-250 words).',
        answer: '',
        explanation: 'Use descriptive vocabulary, past tenses (Simple Past, Past Continuous), and structures expressing cause and effect.',
        localExplanations: { tr: 'Betimleyici sözcükler, geçmiş zaman yapıları (Simple Past, Past Continuous) ve neden-sonuç belirten ifadeler kullanın.' }
      },
      {
        id: 'q_writing_104',
        type: QuestionType.WRITING,
        prompt: 'What is the most significant technological innovation of the 21st century? Explain its impact on daily life and human relationships (200-250 words).',
        answer: '',
        explanation: 'Select one technology (e.g. smartphones, AI). Provide concrete examples of impact on work, socialization, and communication.',
        localExplanations: { tr: 'Tek bir teknoloji seçin (örn. akıllı telefonlar, yapay zeka). İş, sosyal hayat ve iletişim üzerindeki etkilerine dair somut örnekler sunun.' }
      },
      {
        id: 'q_writing_105',
        type: QuestionType.WRITING,
        prompt: 'Write a brief critique of a book you have read or a movie you have watched recently. Explain what you liked, what you disliked, and if you would recommend it (150-200 words).',
        answer: '',
        explanation: 'Provide a quick plot summary without spoilers. Critique aspects like acting/writing, and close with a star rating or recommendation.',
        localExplanations: { tr: 'Sürprizbozan (spoiler) vermeden kısa bir özet sunun. Oyunculuk/yazım gibi unsurları eleştirin ve bir öneriyle tamamlayın.' }
      }
    ]
  }
];
