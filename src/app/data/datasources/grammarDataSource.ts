import { GrammarSection, QuestionType } from '../../core/models/models';

export const grammarDataSource: GrammarSection[] = [
  {
    id: 1,
    title: 'Basic Tenses & Comparisons (A1 - A2)',
    questions: [
      {
        id: 'q_grammar_101',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'My new car is ________ than my old one.',
        options: ['fast', 'faster', 'more fast', 'fastest'],
        answer: 'B',
        explanation: 'We use the comparative form "faster" to compare two things.',
        localExplanations: { tr: 'İki şeyi karşılaştırmak için karşılaştırma (comparative) yapısı olan "faster"ı kullanırız.' }
      },
      {
        id: 'q_grammar_102',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'This is the ________ (good) book I have ever read.',
        options: [],
        answer: 'best',
        explanation: 'The superlative form of the irregular adjective "good" is "best".',
        localExplanations: { tr: 'Düzensiz sıfat olan "good" (iyi) sıfatının en üstünlük (superlative) hali "best" (en iyi) şeklindedir.' }
      },
      {
        id: 'q_grammar_103',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Yesterday, they ________ to the cinema and watched a comedy movie.',
        options: ['go', 'went', 'gone', 'are going'],
        answer: 'B',
        explanation: 'Yesterday indicates a completed action in the past, so we use the Simple Past tense of "go", which is "went".',
        localExplanations: { tr: '"Yesterday" (dün) geçmişte tamamlanmış bir eylemi belirtir, bu nedenle "go" fiilinin Simple Past (Geçmiş Zaman) hali olan "went" kullanılır.' }
      },
      {
        id: 'q_grammar_104',
        type: QuestionType.TRUE_FALSE,
        prompt: 'The sentence "This exam is more easy than the last one" is grammatically correct.',
        options: ['True', 'False'],
        answer: 'B',
        explanation: 'Short adjectives like "easy" form comparatives by adding "-er" (easier), not "more easy".',
        localExplanations: { tr: '"Easy" gibi kısa sıfatlar karşılaştırma hallerini başlarına "more" alarak değil, sonlarına "-er" ekini alarak (easier) oluştururlar.' }
      },
      {
        id: 'q_grammar_105',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'I ________ (lose) my keys on my way to work this morning.',
        options: [],
        answer: 'lost',
        explanation: 'The simple past form of the irregular verb "lose" is "lost".',
        localExplanations: { tr: 'Düzensiz bir fiil olan "lose" (kaybetmek) fiilinin Simple Past (Geçmiş Zaman) hali "lost"tur.' }
      },
      {
        id: 'q_grammar_106',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'While I ________ dinner, the phone suddenly rang.',
        options: ['am cooking', 'cooked', 'was cooking', 'have cooked'],
        answer: 'C',
        explanation: 'We use the Past Continuous ("was cooking") for an action that was in progress in the past when another short action interrupted it ("rang").',
        localExplanations: { tr: 'Geçmişte devam eden bir eylem başka bir kısa eylemle bölündüğünde, devam eden eylem için Past Continuous ("was cooking") kullanırız.' }
      },
      {
        id: 'q_grammar_107',
        type: QuestionType.MULTIPLE_SELECT,
        prompt: 'Which of the following sentences use the correct comparative or superlative forms? (Select all that apply)',
        options: ['Mount Everest is the highest mountain in the world.', 'She is more taller than her sister.', 'This is the most interesting movie of the year.', 'Gold is expensiver than silver.'],
        answer: ['A', 'C'],
        explanation: '"Highest" and "most interesting" are correct. "More taller" has double comparison, and "expensiver" should be "more expensive".',
        localExplanations: { tr: '"Highest" ve "most interesting" doğrudur. "More taller" çift karşılaştırma içerir ve yanlıştır; "expensiver" ise "more expensive" olmalıdır.' }
      },
      {
        id: 'q_grammar_108',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'What is the past tense form of the verb "buy"?',
        answer: 'bought',
        explanation: 'The past tense form of "buy" is "bought".',
        localExplanations: { tr: '"Buy" (satın almak) fiilinin geçmiş zaman (past tense) hali "bought" şeklindedir.' }
      },
      {
        id: 'q_grammar_109',
        type: QuestionType.TRUE_FALSE,
        prompt: 'The superlative form of "bad" is "worst".',
        options: ['True', 'False'],
        answer: 'A',
        explanation: '"Bad" is irregular; its comparative is "worse" and its superlative is "worst".',
        localExplanations: { tr: '"Bad" (kötü) düzensiz bir sıfattır; karşılaştırma hali "worse", en üstünlük (superlative) hali ise "worst" şeklindedir.' }
      }
    ]
  },
  {
    id: 2,
    title: 'Used to, Modals & Relative Clauses (B1)',
    questions: [
      {
        id: 'q_grammar_201',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'When I was a child, I ________ play football in the street every day.',
        options: ['used to', 'got used to', 'am used to', 'was using to'],
        answer: 'A',
        explanation: 'We use "used to" to describe past habits or states that are no longer true.',
        localExplanations: { tr: 'Artık geçerli olmayan geçmişteki alışkanlıkları veya durumları tanımlamak için "used to" yapısını kullanırız.' }
      },
      {
        id: 'q_grammar_202',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'I live in London now, so I am used to ________ (drive) on the left side of the road.',
        options: [],
        answer: 'driving',
        explanation: 'The structure "be used to" is followed by a gerund (verb-ing) or a noun, meaning to be accustomed to something.',
        localExplanations: { tr: 'Bir şeye alışkın olmak anlamına gelen "be used to" yapısından sonra fiil "-ing" takısı alır (driving).' }
      },
      {
        id: 'q_grammar_203',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'It was hard at first, but she is slowly ________ to her new working environment.',
        options: ['used', 'getting used', 'used to', 'got used'],
        answer: 'B',
        explanation: '"Getting used to" refers to the process of becoming accustomed to something new.',
        localExplanations: { tr: '"Getting used to" (alışmaya başlamak), yeni bir duruma alışma sürecini ifade eder.' }
      },
      {
        id: 'q_grammar_204',
        type: QuestionType.TRUE_FALSE,
        prompt: 'In the sentence "The man who I met yesterday is a doctor", "who" can be replaced by "which".',
        options: ['True', 'False'],
        answer: 'B',
        explanation: 'We use "who" or "that" for people, and "which" for things. Since "the man" is a person, we cannot use "which".',
        localExplanations: { tr: 'İnsanlar için "who" veya "that", cansız varlıklar/hayvanlar için "which" kullanırız. "The man" insan olduğu için "which" kullanılamaz.' }
      },
      {
        id: 'q_grammar_205',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'The restaurant ________ we had dinner last night was very expensive. (Write the relative adverb of place)',
        options: [],
        answer: 'where',
        explanation: '"Where" is a relative adverb used to refer to a place.',
        localExplanations: { tr: '"Where", bir yere atıfta bulunmak için kullanılan bir ilgi belirtecidir.' }
      },
      {
        id: 'q_grammar_206',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'That is the girl ________ brother won the spelling bee competition last week.',
        options: ['who', 'whom', 'whose', 'which'],
        answer: 'C',
        explanation: '"Whose" is a possessive relative pronoun indicating that the brother belongs to the girl.',
        localExplanations: { tr: '"Whose", sahiplik bildiren ilgi zamiridir ve erkek kardeşin o kıza ait olduğunu gösterir.' }
      },
      {
        id: 'q_grammar_207',
        type: QuestionType.MATCHING,
        prompt: 'Match the structures on the left with their correct meaning or usage on the right:',
        options: [
          { left: 'used to + infinitive', right: 'past habits or states that no longer happen' },
          { left: 'be used to + -ing/noun', right: 'being accustomed to something' },
          { left: 'get used to + -ing/noun', right: 'the process of becoming accustomed to something' }
        ],
        answer: [
          'used to + infinitive-past habits or states that no longer happen',
          'be used to + -ing/noun-being accustomed to something',
          'get used to + -ing/noun-the process of becoming accustomed to something'
        ],
        explanation: 'These represent the correct structural mappings and meanings of the three expressions.',
        localExplanations: { tr: 'Bu eşleşmeler, her üç yapının doğru dilbilgisel kullanımlarını ve anlamlarını göstermektedir.' }
      },
      {
        id: 'q_grammar_208',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'Combine the sentences using a relative pronoun: "I know a man. He speaks six languages." (Start with "I know a man...")',
        answer: 'I know a man who speaks six languages.',
        explanation: 'We combine them by replacing the subject pronoun "He" with the relative pronoun "who" or "that".',
        localExplanations: { tr: 'İki cümleyi birleştirmek için özne zamiri olan "He" yerine ilgi zamiri olan "who" veya "that" yerleştirilir.' }
      }
    ]
  },
  {
    id: 3,
    title: 'Perfect Tenses & Advanced Structures (B2)',
    questions: [
      {
        id: 'q_grammar_301',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'She ________ in Paris for three years, and she still lives there today.',
        options: ['lived', 'has lived', 'had lived', 'lives'],
        answer: 'B',
        explanation: 'We use the Present Perfect tense ("has lived") for an action that started in the past and continues in the present.',
        localExplanations: { tr: 'Geçmişte başlayıp günümüzde de devam eden eylemler için Present Perfect tense ("has lived") kullanırız.' }
      },
      {
        id: 'q_grammar_302',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'When we arrived at the station, the train had already ________ (leave).',
        options: [],
        answer: 'left',
        explanation: 'We use the Past Perfect tense (had + past participle) to show that an action was completed before another action in the past. The past participle of "leave" is "left".',
        localExplanations: { tr: 'Geçmişteki başka bir eylemden önce gerçekleşmiş eylemler için Past Perfect (had + V3) kullanırız. "Leave" fiilinin 3. hali "left"tir.' }
      },
      {
        id: 'q_grammar_303',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'I ________ my keys this morning, so I couldn\'t open the office door.',
        options: ['lost', 'have lost', 'had lost', 'was losing'],
        answer: 'A',
        explanation: '"This morning" indicates a specific past time that is now over, so we use the Simple Past ("lost").',
        localExplanations: { tr: '"This morning" (bu sabah) geçmişte kalmış belirli bir zamanı ifade eder, bu nedenle Simple Past ("lost") kullanılır.' }
      },
      {
        id: 'q_grammar_304',
        type: QuestionType.TRUE_FALSE,
        prompt: 'In the sentence "He was tired because he had been working all day", the action of working happened before being tired.',
        options: ['True', 'False'],
        answer: 'A',
        explanation: 'The Past Perfect Continuous ("had been working") describes a continuous action in the past that completed before another past state or event and had a result.',
        localExplanations: { tr: 'Past Perfect Continuous ("had been working"), geçmişteki başka bir durumdan önce devam etmiş ve o durumu etkilemiş eylemleri açıklar.' }
      },
      {
        id: 'q_grammar_305',
        type: QuestionType.MULTIPLE_SELECT,
        prompt: 'Which of the following sentences correctly use the Present Perfect or Past Perfect tense? (Select all that apply)',
        options: ['I have finished my homework two hours ago.', 'She had never seen a glacier before she visited Iceland.', 'They have been married since ten years.', 'We have already seen that movie twice.'],
        answer: ['B', 'D'],
        explanation: 'A is wrong because "two hours ago" requires Simple Past. C is wrong because "since" should be "for" (for ten years). B and D are grammatically correct.',
        localExplanations: { tr: 'A yanlıştır çünkü "two hours ago" Simple Past gerektirir. C yanlıştır çünkü süreç bildirmek için "since" değil "for" kullanılmalıdır. B ve D doğrudur.' }
      },
      {
        id: 'q_grammar_306',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'The company, ________ CEO was recently interviewed on TV, is going public next month.',
        options: [],
        answer: 'whose',
        explanation: 'Whose is used as a possessive relative pronoun referencing "The company\'s CEO".',
        localExplanations: { tr: 'Şirketin CEO\'su anlamında sahiplik bildirmek için "whose" ilgi zamiri kullanılır.' }
      },
      {
        id: 'q_grammar_307',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'By the time the police arrived, the bank robbers ________.',
        options: ['escaped', 'were escaping', 'had escaped', 'have escaped'],
        answer: 'C',
        explanation: 'The robber\'s escape was completed before the police arrived, so the Past Perfect ("had escaped") is required.',
        localExplanations: { tr: 'Soyguncuların kaçması, polisin gelmesinden önce tamamlandığı için Past Perfect ("had escaped") kullanılması gerekir.' }
      },
      {
        id: 'q_grammar_308',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'What is the present perfect form of the verb "write" for the pronoun "he"? (Do not use contractions)',
        answer: 'has written',
        explanation: 'The present perfect form for "he" is "has" + past participle of "write" ("written").',
        localExplanations: { tr: '"He" öznesi için "write" fiilinin present perfect hali kısaltma kullanılmadan "has written" şeklindedir.' }
      }
    ]
  }
];
