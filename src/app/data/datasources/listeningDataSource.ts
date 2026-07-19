import { ListeningSection, QuestionType } from '../../core/models/models';

export const listeningDataSource: ListeningSection[] = [
  {
    id: 1,
    title: 'Weight loss drugs — BBC 6 Minute English',
    videoId: 'Af4kqQ8hdhE',
    questions: [
      {
        id: 'q_listening_101',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'According to the program, what is estimated to be the percentage of British adults who are overweight?',
        options: ['Around 45%', 'Around 55%', 'Around 65%', 'Around 75%'],
        answer: 'C',
        explanation: 'Georgie mentions that around 65% of British adults are estimated to be overweight.',
        localExplanations: { tr: 'Georgie, İngiliz yetişkinlerin yaklaşık %65\'inin fazla kilolu olduğunun tahmin edildiğini belirtmektedir.' }
      },
      {
        id: 'q_listening_102',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Weight loss drugs like Ozempic and Mounjaro are modified versions of natural hormones.',
        options: ['True', 'False'],
        answer: 'A',
        explanation: 'The drugs are modified versions of natural hormones which make us feel full when released into the body.',
        localExplanations: { tr: 'Bu ilaçlar, vücuda salgılandığında tokluk hissi veren doğal hormonların değiştirilmiş versiyonlarıdır.' }
      },
      {
        id: 'q_listening_103',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'The measurement used by doctors to estimate if someone is at a healthy weight is called ________.',
        options: [],
        answer: 'BMI',
        explanation: 'The measurement is called BMI, which stands for Body Mass Index.',
        localExplanations: { tr: 'Doktorlar tarafından bir kişinin sağlıklı kiloda olup olmadığını tahmin etmek için kullanılan ölçüme BMI (Vücut Kitle Endeksi) denir.' }
      },
      {
        id: 'q_listening_104',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'How much weight did Lynne Massey-Davis lose in six months using the drug Mounjaro?',
        options: ['10 kg', '20 kg', '30 kg', '40 kg'],
        answer: 'B',
        explanation: 'The transcript states that Lynne lost 20kg in six months using Mounjaro.',
        localExplanations: { tr: 'Metin, Lynne\'in Mounjaro kullanarak altı ayda 20 kg verdiğini belirtmektedir.' }
      },
      {
        id: 'q_listening_105',
        type: QuestionType.SHORT_ANSWER,
        prompt: 'What term is used to describe intrusive and unwanted thoughts about food?',
        answer: 'food noise',
        explanation: 'Lynne uses the term "food noise" to describe the constant conflict and intrusive thoughts about food.',
        localExplanations: { tr: 'Lynne, yemekle ilgili rahatsız edici ve istenmeyen düşünceleri tanımlamak için "food noise" (yemek gürültüsü) terimini kullanmaktadır.' }
      },
      {
        id: 'q_listening_106',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Weight loss drugs were originally invented specifically for people trying to lose weight.',
        options: ['True', 'False'],
        answer: 'B',
        explanation: 'The host explains that they were originally designed for diabetes, and the weight loss effect was noticed later as a side effect.',
        localExplanations: { tr: 'Sunucu, bu ilaçların başlangıçta diyabet (şeker hastalığı) için tasarlandığını, kilo verme etkisinin ise daha sonra bir yan etki olarak fark edildiğini açıklıyor.' }
      },
      {
        id: 'q_listening_107',
        type: QuestionType.MULTIPLE_SELECT,
        prompt: 'What does Lynne mean when she says her unwanted food noise has gone "into the ether"? (Select all that apply)',
        options: ['It has completely disappeared', 'It has gone away', 'It has become louder', 'It has stayed the same'],
        answer: ['A', 'B'],
        explanation: '"Into the ether" means it has completely disappeared or gone away.',
        localExplanations: { tr: '"Into the ether" ifadesi, tamamen ortadan kalktığı veya yok olduğu anlamına gelir.' }
      },
      {
        id: 'q_listening_108',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'An unexpected, secondary effect of a drug or medicine is called a ________ effect.',
        options: [],
        answer: 'side',
        explanation: 'A side effect is an unexpected, secondary effect of a drug or medicine.',
        localExplanations: { tr: 'Bir ilacın veya tedavinin beklenmeyen, ikincil etkisine "side effect" (yan etki) denir.' }
      },
      {
        id: 'q_listening_109',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'What does it mean when a product is "on the market"?',
        options: ['It is being recalled by the company', 'It is available for sale', 'It is under scientific testing', 'It is completely free'],
        answer: 'B',
        explanation: 'When something is "on the market", it is available for sale.',
        localExplanations: { tr: 'Bir ürünün "on the market" (piyasada) olması, satışa sunulmuş olması anlamına gelir.' }
      },
      {
        id: 'q_listening_110',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Lynne describes her personal dilemma using the idiom: "an ________ on one shoulder and a devil on the other."',
        options: [],
        answer: 'angel',
        explanation: 'The idiom is "an angel on one shoulder and a devil on the other."',
        localExplanations: { tr: 'Tereddüt veya ikilem durumlarını tanımlamak için kullanılan deyim "an angel on one shoulder and a devil on the other" (bir omuzda melek, diğerinde şeytan) şeklindedir.' }
      }
    ]
  },
  {
    id: 2,
    title: 'Are we getting more allergic to things? — BBC 6 Minute English',
    videoId: 'H5BVbrZ64bQ',
    questions: [
      {
        id: 'q_listening_201',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'What is Beth allergic to?',
        options: ['Peanuts', 'Pollen', 'Dairy', 'Gluten'],
        answer: 'C',
        explanation: 'Beth states: "I am actually allergic to dairy, so I can\'t have anything with milk."',
        localExplanations: { tr: 'Beth, "Aslında süte (dairy) alerjim var, bu yüzden sütlü hiçbir şey tüketemiyorum" demektedir.' }
      },
      {
        id: 'q_listening_202',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Neil has a dairy allergy that makes him physically sick.',
        options: ['True', 'False'],
        answer: 'B',
        explanation: 'Neil explains that his dairy issue is an intolerance, which makes him feel bad but doesn\'t make him actually sick.',
        localExplanations: { tr: 'Neil, süt ürünlerine karşı hassasiyetinin bir alerji değil intolerans (intolerance) olduğunu, kendisini kötü hissettirdiğini ama hasta etmediğini söyler.' }
      },
      {
        id: 'q_listening_203',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Neil has hay fever, which means he is allergic to ________.',
        options: [],
        answer: 'pollen',
        explanation: 'Neil says: "I do have hay fever, so I\'m allergic to pollen."',
        localExplanations: { tr: 'Neil, saman nezlesi (hay fever) olduğunu ve polene (pollen) karşı alerjisi olduğunu belirtir.' }
      },
      {
        id: 'q_listening_204',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'According to the show, what is the most common allergy in the world?',
        options: ['Peanuts', 'Pollen', 'Dairy'],
        answer: 'B',
        explanation: 'The program reveals that pollen is the most common allergy in the world.',
        localExplanations: { tr: 'Program, dünyadaki en yaygın alerjinin polen (pollen) olduğunu ortaya koyuyor.' }
      },
      {
        id: 'q_listening_205',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Mia Silverman lives with over ________ different allergies.',
        options: [],
        answer: '50',
        explanation: 'The transcript mentions Mia has "50 plus allergies".',
        localExplanations: { tr: 'Metin, Mia\'nın 50\'den fazla (50 plus) alerjisi olduğunu belirtmektedir.' }
      },
      {
        id: 'q_listening_206',
        type: QuestionType.TRUE_FALSE,
        prompt: 'Mia has to call restaurants ahead of time to make sure they can accommodate her.',
        options: ['True', 'False'],
        answer: 'A',
        explanation: 'Mia says: "when it comes to going to restaurants, having to call ahead of time... to make sure that the restaurant can accommodate me".',
        localExplanations: { tr: 'Mia, restoranlara gitmeden önce arayıp (call ahead of time) kendisini ağırlayabileceklerinden (accommodate) emin olması gerektiğini belirtiyor.' }
      },
      {
        id: 'q_listening_207',
        type: QuestionType.FILL_IN_BLANK,
        prompt: 'Rules or procedures for doing something properly are called ________.',
        options: [],
        answer: 'protocols',
        explanation: 'Rules or procedures for doing something properly are called protocols.',
        localExplanations: { tr: 'Bir sürecin düzgün yapılmasını sağlamak için belirlenmiş kurallar dizisine "protocols" (protokoller) denir.' }
      },
      {
        id: 'q_listening_208',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Which country is known as the "allergy capital of the world"?',
        options: ['United Kingdom', 'Australia', 'United States', 'Finland'],
        answer: 'B',
        explanation: 'Australia is termed the "allergy capital of the world" because of its very high rate of allergies.',
        localExplanations: { tr: 'Avustralya, çok yüksek alerji oranı nedeniyle "dünyanın alerji başkenti" (allergy capital of the world) olarak adlandırılır.' }
      },
      {
        id: 'q_listening_209',
        type: QuestionType.MULTIPLE_SELECT,
        prompt: 'What happens to the rate of allergies in Australia as children get older? (Select all that apply)',
        options: ['It drops off', 'It gets lower', 'It increases significantly', 'It stays exactly the same'],
        answer: ['A', 'B'],
        explanation: 'Frances explains that the numbers drop off (get lower) as children get older, from about 10% in infants to 6% at age six, and 3% in adults.',
        localExplanations: { tr: 'Frances, çocukların yaşı büyüdükçe alerji oranlarının düştüğünü (drop off / get lower) açıklamaktadır.' }
      },
      {
        id: 'q_listening_210',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'What technique involves giving children tiny amounts of the allergen to build up their tolerance?',
        options: ['Chemotherapy', 'Immunotherapy', 'Acupuncture', 'Homeopathy'],
        answer: 'B',
        explanation: 'The program mentions "immunotherapy" as a technique that involves giving children tiny amounts of the allergen to build up tolerance.',
        localExplanations: { tr: 'Program, çocukların toleransını artırmak için onlara çok az miktarda alerjen vermeyi içeren "immunotherapy" (bağışıklık terapisi) tekniğinden bahsetmektedir.' }
      }
    ]
  }
];
