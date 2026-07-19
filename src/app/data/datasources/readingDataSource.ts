import { ReadingSection, QuestionType } from '../../core/models/models';

export const readingDataSource: ReadingSection[] = [
  {
    id: 1,
    title: 'Giovanni Giorgio',
    passage: `
      <p>When I was fifteen, sixteen, when I really started to play guitar, I definitely wanted to become a musician. It was almost impossible because—it was—the dream was so big that I didn't see any chance because I was living in a little town; was studying. And when I finally broke away from school and became a musician, I thought, "Well, now I may have a little bit of a chance" because all I really wanted to do is music, and not only play music, but compose music.</p>
      <p>At that time, in Germany, in '69, '70, they had already discotheques. So, I would take my car, would go to a discotheque, sing maybe thirty minutes. I think I had about seven, eight songs. I would partially sleep in the car because I didn't want to drive home and that helped me for about almost two years to survive in the beginning.</p>
      <p>I wanted to do an album with the sounds of the '50s, the sounds of the '60s, of the '70s, and then have a sound of the future. And I said, "Wait a second, I know the synthesizer, why don't I use the synthesizer which is the sound of the future?" And I didn't have any idea what to do, but I knew I needed a click, so we put a click on the 24-track which then was synced to the Moog Modular. I knew that could be a sound of the future, but I didn't realize how much the impact would be. My name is Giovanni Giorgio, but everybody calls me Giorgio.</p>
    `,
    questions: [
      {
        id: 'q_reading_101',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'How old was the speaker when he really started playing the guitar?',
        options: ['Around ten or eleven', 'Fifteen or sixteen', 'In his early twenties', 'In \'69 or \'70'],
        answer: 'B',
        explanation: 'The speaker mentions, "When I was fifteen, sixteen, when I really started to play guitar..."',
        localExplanations: { tr: 'Konuşmacı, "On beş, on altı yaşlarındayken, gitara gerçekten başladığımda..." demektedir.' }
      },
      {
        id: 'q_reading_102',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Living in a little town made the speaker\'s dream of becoming a musician feel easy and achievable.',
        options: ['True', 'False'],
        answer: 'B',
        explanation: 'The speaker says it was "almost impossible" because the dream was so big and he lived in a little town.',
        localExplanations: { tr: 'Konuşmacı, küçük bir kasabada yaşadığı ve rüyası çok büyük olduğu için bunun "neredeyse imkansız" olduğunu söylemektedir.' }
      },
      {
        id: 'q_reading_103',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'The speaker wanted to not only play music, but also ________ music.',
        options: [],
        answer: 'compose',
        explanation: 'The speaker states: "all I really wanted to do is music / And not only play music, but compose music."',
        localExplanations: { tr: 'Konuşmacı sadece müzik çalmak değil, aynı zamanda müzik bestelemek (compose) istediğini belirtmektedir.' }
      },
      {
        id: 'q_reading_104',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'In which country was the speaker performing in discotheques around \'69 and \'70?',
        options: ['United States', 'Germany', 'England', 'France'],
        answer: 'B',
        explanation: 'The speaker mentions, "At that time, in Germany, in \'69, \'70, they had already discotheques."',
        localExplanations: { tr: 'Konuşmacı, "O zamanlar, Almanya\'da, \'69, \'70\'te, zaten diskotekler vardı" ifadesini kullanmaktadır.' }
      },
      {
        id: 'q_reading_105',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'Where did the speaker partially sleep during his early career to avoid driving home?',
        answer: 'car',
        explanation: 'The text says: "I would partially sleep in the car Because I didn\'t want to drive home."',
        localExplanations: { tr: 'Metin, eve gitmek istemediği için arabasında (car) uyuduğunu söylemektedir.' }
      },
      {
        id: 'q_reading_106',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Sleeping in his car helped the speaker survive for almost two years in the beginning.',
        options: ['True', 'False'],
        answer: 'A',
        explanation: 'The speaker states that sleeping in the car helped him for about "almost two years to survive in the beginning."',
        localExplanations: { tr: 'Konuşmacı, arabada uyumanın başlangıçta hayatta kalmasına yaklaşık "neredeyse iki yıl" yardımcı olduğunu söylemektedir.' }
      },
      {
        id: 'q_reading_107',
        type: QuestionType.MULTIPLE_SELECT,
        prompt: 'Which of the following decades did the speaker want to include in his album\'s sounds? (Select all that apply)',
        options: ['The \'50s', 'The \'60s', 'The \'70s', 'The \'80s'],
        answer: ['A', 'B', 'C'],
        explanation: 'The speaker states: "I wanted to do an album with the sounds of the \'50s, the sounds of the \'60s, of the \'70s..."',
        localExplanations: { tr: 'Konuşmacı "50\'lerin, 60\'ların, 70\'lerin sesleriyle bir albüm yapmak istedim..." ifadesini kullanmaktadır.' }
      },
      {
        id: 'q_reading_108',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'What instrument did the speaker decide to use as "the sound of the future"?',
        options: ['Moog Modular', 'A 24-track recorder', 'Synthesizer', 'Guitar'],
        answer: 'C',
        explanation: 'The speaker says: "Why don\'t I use the synthesizer which is the sound of the future?"',
        localExplanations: { tr: 'Konuşmacı "Geleceğin sesi olan sentezleyiciyi (synthesizer) neden kullanmıyorum?" demektedir.' }
      },
      {
        id: 'q_reading_109',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'To synchronize the Moog Modular, the speaker put a ________ on the 24-track.',
        options: [],
        answer: 'click',
        explanation: 'The speaker states: "but I knew I needed a click, so we put a click on the 24-track Which then was synced to the Moog Modular."',
        localExplanations: { tr: 'Konuşmacı, Moog Modüler\'i senkronize etmek için 24 kanallı banda bir "click" (metronom tıklaması) yerleştirdiklerini belirtmektedir.' }
      },
      {
        id: 'q_reading_110',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'What is the speaker\'s first name?',
        answer: 'Giovanni',
        explanation: 'The speaker introduces himself: "My name is Giovanni Giorgio, but everybody calls me Giorgio."',
        localExplanations: { tr: 'Konuşmacı kendini tanıtmaktadır: "Adım Giovanni Giorgio..." dolayısıyla ilk adı Giovanni\'dir.' }
      }
    ]
  },
  {
    id: 2,
    title: 'American Inventors: Rocket Scientist Robert Goddard',
    passage: `
      <p>Today rocket launches and space missions are common. But in the early 1900s, space travel seemed like a dream. One of the most influential people in the field of rocket science was American Robert Goddard. The American space agency NASA describes Goddard as "the father of modern rocket propulsion." Robert Goddard once said that "the dream of yesterday is the hope of today and the reality of tomorrow." His scientific work gave hope to many dreams about space travel. He turned some of those dreams into reality.</p>
      <p>More than one hundred years ago, Goddard carried out studies and tests of rocket engines. He developed and flew many rockets that got their power from solid fuels: chemicals that formed a hard substance. In 1925, he made and tested the first rocket engine using a soft chemical fuel. The next year, he successfully launched the world's first liquid-fuel rocket. Many historians consider liquid-fuel rocket flight to be as important as the first airplane flight by the American brothers Orville and Wilbur Wright. Goddard's work proved that machines could travel outside of Earth's atmosphere and into space.</p>
      <p>During his early research, he received money and support from the U.S. Smithsonian Institution. The Smithsonian published several reports about his efforts. One publication, called "A Method of Reaching Extreme Altitudes," wrote about his search for ways to send weather recording instruments higher than balloons could fly. It described how he developed the mathematical theories for rocket flight. In that report, Goddard also suggested the possibility of a rocket someday reaching the moon. At the time, there was a big dispute in the press about this claim. Many people thought he was foolish for suggesting something that seemed so impossible. Many of Goddard's ideas are still used in rocket development. So, in a way, every rocket that flies today could be considered a Goddard rocket.</p>
    `,
    questions: [
      {
        id: 'q_reading_201',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'How does NASA describe Robert Goddard?',
        options: ['The first man on the moon', 'The inventor of the weather balloon', 'The father of modern rocket propulsion', 'The designer of the first airplane'],
        answer: 'C',
        explanation: 'The passage states: "NASA describes Goddard as \'the father of modern rocket propulsion.\'"',
        localExplanations: { tr: 'Metinde, "NASA, Goddard\'ı \'modern roket itkisinin babası\' olarak tanımlamaktadır" ifadesi yer alır.' }
      },
      {
        id: 'q_reading_202',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Space travel was already a very common and normal activity in the early 1900s.',
        options: ['True', 'False'],
        answer: 'B',
        explanation: 'The passage says: "But in the early 1900s, space travel seemed like a dream."',
        localExplanations: { tr: 'Metin, 1900\'lerin başında uzay seyahatinin bir rüya gibi göründüğünü belirtir.' }
      },
      {
        id: 'q_reading_203',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Goddard successfully launched the world\'s first ________-fuel rocket in 1926.',
        options: [],
        answer: 'liquid',
        explanation: 'The text says: "The next year [1926], he successfully launched the world\'s first liquid-fuel rocket."',
        localExplanations: { tr: 'Metinde, 1926 yılında dünyanın ilk sıvı yakıtlı (liquid-fuel) roketini başarıyla fırlattığı belirtilmektedir.' }
      },
      {
        id: 'q_reading_204',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Historians compare the importance of the liquid-fuel rocket flight to which milestone?',
        options: ['The invention of the steam engine', 'The first airplane flight of Orville and Wilbur Wright', 'The launch of weather balloons', 'The discovery of electricity'],
        answer: 'B',
        explanation: 'The passage says: "Many historians consider liquid-fuel rocket flight to be as important as the first airplane flight by the American brothers Orville and Wilbur Wright."',
        localExplanations: { tr: 'Tarihçiler sıvı yakıtlı roket uçuşunu, Wright kardeşlerin ilk uçak uçuşu kadar önemli görmektedir.' }
      },
      {
        id: 'q_reading_205',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'Which U.S. institution provided Goddard with funding and support during his early research?',
        answer: 'Smithsonian Institution',
        explanation: 'The text mentions: "During his early research, he received money and support from the U.S. Smithsonian Institution."',
        localExplanations: { tr: 'Metinde, erken araştırmaları sırasında ABD Smithsonian Enstitüsü\'nden para ve destek aldığı belirtilmektedir.' }
      },
      {
        id: 'q_reading_206',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Goddard\'s publication "A Method of Reaching Extreme Altitudes" discussed sending weather recording instruments higher than balloons could fly.',
        options: ['True', 'False'],
        answer: 'A',
        explanation: 'The text states the publication "wrote about his search for ways to send weather recording instruments higher than balloons could fly."',
        localExplanations: { tr: 'Yayın, hava durumu kayıt cihazlarını balonlardan daha yükseğe gönderme yollarını ele almıştır.' }
      },
      {
        id: 'q_reading_207',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'What did Goddard suggest in his report that caused a dispute in the press?',
        options: ['Reaching the moon with a rocket', 'Replacing solid fuels entirely', 'Flying weather balloons to space', 'Working with NASA'],
        answer: 'A',
        explanation: 'The text says: "Goddard also suggested the possibility of a rocket someday reaching the moon. At the time, there was a big dispute in the press about this claim."',
        localExplanations: { tr: 'Raporda bir roketin bir gün aya ulaşma olasılığını önermiş ve bu iddia basında büyük tartışmalara yol açmıştır.' }
      },
      {
        id: 'q_reading_208',
        type: QuestionType.MULTIPLE_SELECT,
        prompt: 'According to the passage, what types of fuel did Goddard use or test in his rocket engines? (Select all that apply)',
        options: ['Solid fuels', 'Soft chemical fuel', 'Liquid fuel', 'Solar power'],
        answer: ['A', 'B', 'C'],
        explanation: 'The text mentions he flew rockets powered by "solid fuels", tested an engine using "soft chemical fuel" in 1925, and launched a "liquid-fuel rocket" in 1926.',
        localExplanations: { tr: 'Metin, katı yakıtlar (solid fuels), yumuşak kimyasal yakıt (soft chemical fuel) ve sıvı yakıt (liquid fuel) kullandığını belirtmektedir.' }
      },
      {
        id: 'q_reading_209',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Goddard\'s early rockets got their power from ________ fuels, which formed a hard substance.',
        options: [],
        answer: 'solid',
        explanation: 'The text mentions: "...rockets that got their power from solid fuels: chemicals that formed a hard substance."',
        localExplanations: { tr: 'İlk roketler, sert bir madde oluşturan katı yakıtlardan (solid fuels) güç almıştır.' }
      },
      {
        id: 'q_reading_210',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'Complete the quote by Robert Goddard: "The dream of yesterday is the hope of today and the ________ of tomorrow."',
        answer: 'reality',
        explanation: 'Robert Goddard once said that "the dream of yesterday is the hope of today and the reality of tomorrow."',
        localExplanations: { tr: 'Goddard\'ın sözü: "Dünün rüyası bugünün umudu ve yarının gerçeğidir (reality)."' }
      }
    ]
  }
];
