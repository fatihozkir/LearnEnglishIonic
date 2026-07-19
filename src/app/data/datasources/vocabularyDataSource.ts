import { VocabularySection, QuestionType } from '../../core/models/models';

export const vocabularyDataSource: VocabularySection[] = [
  {
    id: 1,
    title: 'Essential Vocabulary (A1 - B1)',
    questions: [
      {
        id: 'q_vocab_101',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'She has a great ________ to paint beautiful landscapes.',
        options: ['ability', 'skill', 'job', 'tool'],
        answer: 'A',
        explanation: '"Ability" means the physical or mental power or skill needed to do something.',
        localExplanations: { tr: '"Ability" (yetenek/beceri), bir şeyi yapmak için gereken fiziksel veya zihinsel güç veya beceri anlamına gelir.' }
      },
      {
        id: 'q_vocab_102',
        type: QuestionType.TRUE_FALSE,
        prompt: 'In English, "avoid" means to stay away from someone or something.',
        options: ['True', 'False'],
        answer: 'A',
        explanation: '"To avoid" means to keep away from or stop oneself from doing something.',
        localExplanations: { tr: '"Avoid" (kaçınmak), birinden veya bir şeyden uzak durmak veya bir şeyi yapmaktan kendini alıkoymak anlamına gelir.' }
      },
      {
        id: 'q_vocab_103',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Learning how to manage your time is an important ________ for university students.',
        options: [],
        answer: 'skill',
        explanation: '"Skill" is the ability to do something well, usually gained through training or experience.',
        localExplanations: { tr: '"Skill" (beceri/yetenek), genellikle eğitim veya deneyim yoluyla kazanılan bir şeyi iyi yapma yeteneğidir.' }
      },
      {
        id: 'q_vocab_104',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'To stay healthy, you should ________ eating too much fast food.',
        options: ['avoid', 'enjoy', 'prefer', 'continue'],
        answer: 'A',
        explanation: '"Avoid" is used here to mean keeping away from or preventing eating unhealthy food.',
        localExplanations: { tr: 'Sağlıklı kalmak için çok fazla hazır yemek yemekten "kaçınmalısınız" (avoid).' }
      },
      {
        id: 'q_vocab_105',
        type: QuestionType.MULTIPLE_SELECT,
        prompt: 'Which of the following words are synonyms or closely related to the concept of "talent" or "capacity"? (Select all that apply)',
        options: ['ability', 'skill', 'hesitation', 'ambiguity'],
        answer: ['A', 'B'],
        explanation: '"Ability" (the power to do something) and "skill" (expertise) are closely related to talent/capacity.',
        localExplanations: { tr: '"Ability" (yetenek) ve "skill" (beceri), yetenek veya kapasite kavramıyla yakından ilişkilidir.' }
      },
      {
        id: 'q_vocab_106',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'He is a very ________ (skill) worker; he can fix any machine in a few minutes. (Use the adjective form)',
        options: [],
        answer: 'skilled',
        explanation: '"Skilled" is the adjective form of "skill", meaning having or showing the knowledge, ability, or training to perform a certain activity well.',
        localExplanations: { tr: '"Skilled" (nitelikli/becerikli), bir faaliyeti iyi gerçekleştirmek için gereken bilgi veya eğitime sahip olma durumunu niteleyen sıfattır.' }
      },
      {
        id: 'q_vocab_107',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'When the police officer asked him for his ID, he answered without any ________.',
        options: ['hesitation', 'ambiguity', 'ability', 'avoidance'],
        answer: 'A',
        explanation: '"Hesitation" means pausing before saying or doing something, usually because of uncertainty.',
        localExplanations: { tr: '"Hesitation" (tereddüt), genellikle belirsizlik nedeniyle bir şeyi söylemeden veya yapmadan önce duraksamak anlamına gelir.' }
      },
      {
        id: 'q_vocab_108',
        type: QuestionType.TRUE_FALSE,
        prompt: '"Ability" is always something you are born with, while a "skill" is always learned.',
        options: ['True', 'False'],
        answer: 'B',
        explanation: 'While they differ slightly, "ability" can also be developed, and the division is not so absolute.',
        localExplanations: { tr: '"Ability" (yetenek) sonradan da geliştirilebilir, bu nedenle ayrım bu kadar kesin değildir.' }
      }
    ]
  },
  {
    id: 2,
    title: 'Intermediate & Advanced Vocabulary (B1 - B2)',
    questions: [
      {
        id: 'q_vocab_201',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'The instructions were so ________ that none of the students knew what they were supposed to do.',
        options: ['ambiguous', 'inevitable', 'avoidable', 'skilled'],
        answer: 'A',
        explanation: '"Ambiguous" means open to more than one interpretation; not having one obvious meaning.',
        localExplanations: { tr: '"Ambiguous" (belirsiz/iki anlamlı), birden fazla yoruma açık olan ve tek bir net anlamı olmayan durumlar için kullanılır.' }
      },
      {
        id: 'q_vocab_202',
        type: QuestionType.TRUE_FALSE,
        prompt: 'If an event is described as "inevitable", it means it can be easily prevented.',
        options: ['True', 'False'],
        answer: 'B',
        explanation: '"Inevitable" means certain to happen and impossible to avoid or prevent.',
        localExplanations: { tr: '"Inevitable" (kaçınılmaz), gerçekleşmesi kesin olan ve engellenmesi ya da kaçınılması imkansız olan durumlar için kullanılır.' }
      },
      {
        id: 'q_vocab_203',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Many accidents on the highway are completely ________ if drivers just pay attention to the speed limits.',
        options: [],
        answer: 'avoidable',
        explanation: '"Avoidable" is the adjective form meaning able to be avoided or prevented.',
        localExplanations: { tr: '"Avoidable" (kaçınılabilir/önlenebilir), önlenmesi veya kaçınılması mümkün olan durumları tanımlar.' }
      },
      {
        id: 'q_vocab_204',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Because of the heavy snowfall and freezing temperatures, a delay in the flights was ________.',
        options: ['inevitable', 'avoidable', 'ambiguous', 'hesitant'],
        answer: 'A',
        explanation: '"Inevitable" fits here because the weather conditions made the flight delays certain to happen.',
        localExplanations: { tr: 'Hava koşulları nedeniyle uçuş gecikmelerinin gerçekleşmesi kesin olduğundan "inevitable" (kaçınılmaz) doğru cevaptır.' }
      },
      {
        id: 'q_vocab_205',
        type: QuestionType.MATCHING,
        prompt: 'Match the words on the left with their correct definitions on the right:',
        options: [
          { left: 'Ambiguous', right: 'Unclear or having double meaning' },
          { left: 'Inevitable', right: 'Unavoidable or certain to happen' },
          { left: 'Avoidable', right: 'Possible to prevent or escape' }
        ],
        answer: [
          'Ambiguous-Unclear or having double meaning',
          'Inevitable-Unavoidable or certain to happen',
          'Avoidable-Possible to prevent or escape'
        ],
        explanation: 'These are correct definitions of the adjectives: ambiguous (unclear), inevitable (unavoidable), and avoidable (preventable).',
        localExplanations: { tr: 'Bunlar kelimelerin doğru tanımlarıdır: ambiguous (belirsiz), inevitable (kaçınılmaz) ve avoidable (kaçınılabilir).' }
      },
      {
        id: 'q_vocab_206',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'Write the noun form of the verb "hesitate".',
        answer: 'hesitation',
        explanation: 'The noun form of "hesitate" is "hesitation".',
        localExplanations: { tr: '"Hesitate" (tereddüt etmek) fiilinin isim hali "hesitation" (tereddüt) şeklindedir.' }
      },
      {
        id: 'q_vocab_207',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'His explanation was quite ________; it could be interpreted in two completely different ways.',
        options: ['ambiguous', 'inevitable', 'avoidable', 'skilled'],
        answer: 'A',
        explanation: 'An explanation that can be interpreted in multiple ways is "ambiguous".',
        localExplanations: { tr: 'Birden fazla şekilde yorumlanabilen bir açıklama "ambiguous" (belirsiz/muğlak) olarak nitelendirilir.' }
      }
    ]
  }
];
