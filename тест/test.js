'use strict';

const TOTAL_QUESTIONS = 35;
const LETTERS = ['A', 'B', 'C', 'D'];
const REGIONS = {
  восток: 'Дальний Восток',
  кавказ: 'Кавказ',
  поволжье: 'Поволжье',
  северные: 'Европейский Север',
  сибирь: 'Сибирь',
  урал: 'Урал',
  центральный: 'Центральная Россия'
};

const questions = [
  {
    id: 'east-seasonal-routes',
    source: 'восток',
    question: 'Как менялись сезонные стоянки ительменов в течение года?',
    options: [
      'Весной и летом шли вверх по рекам к нерестилищам лосося, осенью возвращались к морю',
      'Зимой уходили в тундру, а летом переселялись в горные степи',
      'Весной собирались у моря, а осенью уходили к пастбищам в тайге',
      'Круглый год оставались в одном поселении у крупных озёр'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'east-kuth',
    source: 'восток',
    question: 'Кто такой Кутх в мифах ительменов?',
    options: [
      'Медведь — покровитель лесных охотников',
      'Ворон — главное божество и прародитель',
      'Лосось — хранитель речных нерестилищ',
      'Морской орёл — защитник дальних путешествий'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'east-nanai-clothing',
    source: 'восток',
    question: 'Из чего нанайцы шили одежду, давшую народу прозвище «люди с рыбьей кожей»?',
    options: [
      'Из оленьих шкур, вымоченных в речной воде',
      'Из коры деревьев, сплетённой в плотное полотно',
      'Из рыбьей кожи, которую высушивали, размягчали и сшивали',
      'Из шерсти домашних овец и растительных волокон'
    ],
    correctAnswers: [2],
    multiple: false
  },
  {
    id: 'east-nivkh-language',
    source: 'восток',
    question: 'Какой особенностью языка нивхов выделяет его исходный материал?',
    options: [
      'Он относится к тюркской языковой семье',
      'Он является разновидностью нанайского языка',
      'Он принадлежит к финно-угорской группе',
      'Он изолирован и не входит ни в одну известную языковую семью'
    ],
    correctAnswers: [3],
    multiple: false
  },
  {
    id: 'east-itelmen-occupations',
    source: 'восток',
    question: 'Какие два занятия прямо названы среди традиционных занятий ительменов?',
    options: [
      'Рыболовство, в том числе промысел морских китов',
      'Оленеводство и разведение домашних стад',
      'Охота и собирательство',
      'Земледелие и обработка руд'
    ],
    correctAnswers: [0, 2],
    multiple: true
  },
  {
    id: 'caucasus-tukhum',
    source: 'кавказ',
    question: 'Что в описании дагестанских народов означает «тухум»?',
    options: [
      'Сельскую общину, где решения принимал сход старейшин',
      'Кровнородственный союз, помогавший своим членам в трудную минуту',
      'Праздничный танец, изображающий орла и лебедя',
      'Свод неписаных обычаев и нравственных норм'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'caucasus-lezginka',
    source: 'кавказ',
    question: 'Какие два образа передают партии лезгинки?',
    options: [
      'Мужская партия — орёл',
      'Женская партия — лебедь',
      'Мужская партия — конь',
      'Женская партия — горная река'
    ],
    correctAnswers: [0, 1],
    multiple: true
  },
  {
    id: 'caucasus-konakhalla',
    source: 'кавказ',
    question: 'Какой принцип лежит в основе чеченского кодекса чести къонахалла?',
    options: [
      'Соблюдать только правила ведения хозяйства',
      'Передавать решения о поведении человека старейшине рода',
      'Хранить слово, уважать старших и гостя, защищать слабого',
      'Сохранять традиции исключительно внутри своей семьи'
    ],
    correctAnswers: [2],
    multiple: false
  },
  {
    id: 'caucasus-yaran-suwar',
    source: 'кавказ',
    question: 'Как переводится название лезгинского праздника Яран Сувар?',
    options: [
      'Праздник окончания полевых работ',
      'Праздник первого снега',
      'Праздник летнего солнцестояния',
      'Праздник равноденствия'
    ],
    correctAnswers: [3],
    multiple: false
  },
  {
    id: 'caucasus-mountains',
    source: 'кавказ',
    question: 'Между какими морями расположена Кавказская горная система согласно материалу?',
    options: [
      'Между Чёрным и Каспийским морями',
      'Между Балтийским и Белым морями',
      'Между Баренцевым и Карским морями',
      'Между Японским и Охотским морями'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'volga-sabantuy',
    source: 'поволжье',
    question: 'Какой этап сельскохозяйственного цикла отмечает Сабантуй?',
    options: [
      'Начало весеннего сева',
      'Окончание весенних полевых работ',
      'Первый сбор осеннего урожая',
      'Подготовку хозяйства к зимовке скота'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'volga-akashka',
    source: 'поволжье',
    question: 'Какое действие совершал старейший мужчина деревни во время обряда Акашка?',
    options: [
      'Символически проводил первую борозду на поле',
      'Зажигал огонь в родовой молельне',
      'Раздавал участникам осенний урожай',
      'Провожал гостей к полевым воротам'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'volga-nardugan',
    source: 'поволжье',
    question: 'Когда отмечали Нардуган у татар-кряшен?',
    options: [
      'В день весеннего равноденствия',
      'В конце февраля — начале марта',
      'С 25 декабря по 7 января',
      'В период цветения лугов перед сенокосом'
    ],
    correctAnswers: [2],
    multiple: false
  },
  {
    id: 'volga-akashka-ritual',
    source: 'поволжье',
    question: 'Какие два действия описаны как часть обряда Акашка?',
    options: [
      'Перед началом сева пекли обрядовый хлеб',
      'Старейший мужчина проводил первую борозду',
      'После уборки урожая ставили обетный крест',
      'Зимой обходили дома в костюмах животных'
    ],
    correctAnswers: [0, 1],
    multiple: true
  },
  {
    id: 'volga-udmurt-embroidery',
    source: 'поволжье',
    question: 'Какой вариант вышивки описан как характерный для удмуртского костюма?',
    options: [
      'Чёрная шерсть на синем бархате',
      'Золотые нити и растительный орнамент на коже',
      'Белая ткань с красным геометрическим узором',
      'Серебряные нити на зелёном сукне'
    ],
    correctAnswers: [2],
    multiple: false
  },
  {
    id: 'north-yoik',
    source: 'северные',
    question: 'Чем в материале выделен саамский йойк?',
    options: [
      'Это протяжный эпос, исполняемый только хором',
      'Это особое пение без привычных слов, мелодия которого «рисует» образ',
      'Это танцевальная песня, сопровождающая летний хоровод',
      'Это речитатив, которым рассказывают о военных походах'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'north-seids',
    source: 'северные',
    question: 'Что такое сейды в традиции саамов?',
    options: [
      'Священные камни и утёсы, где, по верованиям, обитали духи природы и промыслов',
      'Длинные эпические песни, исполняемые на праздниках',
      'Обрядовые костры, которые разводили в день летнего солнцестояния',
      'Особые жилища для сезонных стоянок оленеводов'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'north-kalevala',
    source: 'северные',
    question: 'Из чего Элиас Лённрот собрал эпос «Калевала»?',
    options: [
      'Из саамских йойков о природе',
      'Из сказаний о поморских мореходах',
      'Из карельских эпических рун',
      'Из коми свадебных песен'
    ],
    correctAnswers: [2],
    multiple: false
  },
  {
    id: 'north-yuhannus',
    source: 'северные',
    question: 'С каким временем года связан карельский праздник Юханнус?',
    options: [
      'С началом весеннего сева',
      'С летним солнцестоянием',
      'С окончанием осенних полевых работ',
      'С зимним солнцестоянием'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'north-lembi',
    source: 'северные',
    question: 'Какие два утверждения о карельском лемби верны согласно материалу?',
    options: [
      'Так называли особую притягательность девушки или юноши',
      'Обряд «поднять лемби» должен был помочь найти пару',
      'Так называли осенний праздник благодарности за урожай',
      'Это был обряд проводов льда перед выходом в море'
    ],
    correctAnswers: [0, 1],
    multiple: true
  },
  {
    id: 'siberia-evenki',
    source: 'сибирь',
    question: 'К какой языковой и народной группе материал относит эвенков?',
    options: [
      'К финно-угорским народам',
      'К тюркским народам',
      'К картвельским народам',
      'К тунгусо-маньчжурским народам'
    ],
    correctAnswers: [3],
    multiple: false
  },
  {
    id: 'siberia-even-migration',
    source: 'сибирь',
    question: 'Почему эвены вели кочевой образ жизни?',
    options: [
      'Чтобы следовать за сезонными пастбищами оленей и местами охоты',
      'Чтобы ежегодно переселяться из тайги на морское побережье',
      'Чтобы сопровождать стада скота к земледельческим угодьям',
      'Чтобы менять зимние поселения на летние города'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'siberia-animism',
    source: 'сибирь',
    question: 'Как материал объясняет анимистический взгляд на мир у коренных народов Сибири?',
    options: [
      'Вера в то, что у каждого элемента природы есть свой дух',
      'Почитание только духов предков, без связи с природой',
      'Представление, что животные не встречаются в мифах',
      'Убеждение, что природные явления не влияют на быт'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'siberia-folklore-animals',
    source: 'сибирь',
    question: 'Какую роль, согласно материалу, могут играть животные в сказках коренных народов Сибири?',
    options: [
      'Тотемных предков или помощников',
      'Только противников человека',
      'Исключительно хранителей домашнего очага',
      'Посланников соседних земледельческих народов'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'siberia-nanai-name',
    source: 'сибирь',
    question: 'Как переводится китайское название нанайцев «юпи-дацзы»?',
    options: [
      'Люди большой реки',
      'Люди с рыбьей кожей',
      'Хранители таёжного огня',
      'Кочевники северной тайги'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'ural-length',
    source: 'урал',
    question: 'Какова протяжённость Уральских гор с севера на юг по материалу?',
    options: [
      'Около 700 километров',
      'Около 1 100 километров',
      'Более 2 500 километров',
      'Около 4 500 километров'
    ],
    correctAnswers: [2],
    multiple: false
  },
  {
    id: 'ural-ob-ugrians',
    source: 'урал',
    question: 'Какие два народа вместе названы обскими уграми?',
    options: [
      'Ненцы и коми',
      'Удмурты и коми-пермяки',
      'Ханты и манси',
      'Эвенки и эвены'
    ],
    correctAnswers: [2],
    multiple: false
  },
  {
    id: 'ural-reindeer-day',
    source: 'урал',
    question: 'Когда ненцы отмечают День оленевода?',
    options: [
      'В конце февраля — начале марта',
      'В середине апреля',
      'В день летнего солнцестояния',
      'Сразу после окончания осенних полевых работ'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'ural-fire-ritual',
    source: 'урал',
    question: 'Какой поступок был запрещён во время обряда почитания огня в чуме?',
    options: [
      'Тушить огонь водой',
      'Кормить огонь кусочками пищи',
      'Просить у хозяйки очага удачи перед кочёвкой',
      'Собираться у огня перед важными событиями'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'ural-chum',
    source: 'урал',
    question: 'Как в материале описано традиционное жилище ненцев?',
    options: [
      'Круглый дом из камня с плоской крышей',
      'Конический шатёр из жердей, покрытый оленьими шкурами',
      'Деревянная изба с земляной крышей',
      'Переносной шалаш из коры и рыбьей кожи'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'central-lakomka',
    source: 'центральный',
    question: 'Как называлась среда масленичной недели в описании русских традиций?',
    options: [
      'Встреча',
      'Лакомка',
      'Тёщины вечёрки',
      'Прощёный день'
    ],
    correctAnswers: [1],
    multiple: false
  },
  {
    id: 'central-svyatki',
    source: 'центральный',
    question: 'Какой период в материале назван Святками?',
    options: [
      'От Рождества до Крещения, с 6 по 19 января',
      'От весеннего равноденствия до начала сева',
      'Дни от Троицы до летнего солнцестояния',
      'Последняя неделя декабря перед зимним солнцестоянием'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'central-kupala',
    source: 'центральный',
    question: 'Какие два утверждения об Иване Купале приведены в материале?',
    options: [
      'Праздник связан с летним солнцестоянием и отмечается 24 июня',
      'В эту ночь прыгали через костёр',
      'Праздник отмечали с 25 декабря по 7 января',
      'Участники бросали венки в прорубь'
    ],
    correctAnswers: [0, 1],
    multiple: true
  },
  {
    id: 'central-ushto',
    source: 'центральный',
    question: 'Где марийцы собирались на общую молитву перед началом весеннего сева?',
    options: [
      'В священной роще',
      'У моря перед началом рыболовства',
      'На майдане после окончания полевых работ',
      'Внутри чума у домашнего очага'
    ],
    correctAnswers: [0],
    multiple: false
  },
  {
    id: 'central-mordva',
    source: 'центральный',
    question: 'На какие два субэтноса делится мордва?',
    options: [
      'Аварцы и даргинцы',
      'Эрзя и мокша',
      'Чеченцы и ингуши',
      'Ханты и манси'
    ],
    correctAnswers: [1],
    multiple: false
  }
];

const state = {
  currentIndex: 0,
  answers: new Map(),
  checked: false
};

const elements = {
  intro: document.getElementById('quizIntro'),
  startButton: document.getElementById('startQuiz'),
  stage: document.getElementById('quizStage'),
  results: document.getElementById('quizResults'),
  answeredCount: document.getElementById('answeredCount'),
  progressPercent: document.getElementById('progressPercent'),
  progressTrack: document.getElementById('progressTrack'),
  progressFill: document.getElementById('progressFill'),
  questionNumber: document.getElementById('currentQuestionNumber'),
  questionSource: document.getElementById('questionSource'),
  multipleHint: document.getElementById('multipleHint'),
  questionTitle: document.getElementById('questionTitle'),
  answerOptions: document.getElementById('answerOptions'),
  selectionFeedback: document.getElementById('selectionFeedback'),
  previousButton: document.getElementById('previousQuestion'),
  nextButton: document.getElementById('nextQuestion'),
  submitButton: document.getElementById('submitQuiz'),
  questionMap: document.getElementById('questionMap'),
  submitNote: document.getElementById('submitNote'),
  resultTitle: document.getElementById('resultTitle'),
  resultRank: document.getElementById('resultRank'),
  resultMessage: document.getElementById('resultMessage'),
  scoreRing: document.getElementById('scoreRing'),
  scoreValue: document.getElementById('scoreValue'),
  scorePercent: document.getElementById('scorePercent'),
  skippedCount: document.getElementById('skippedCount'),
  restartButton: document.getElementById('restartQuiz'),
  reviewList: document.getElementById('reviewList')
};

function requireElements() {
  for (const [name, element] of Object.entries(elements)) {
    if (!element) {
      throw new Error(`Не найден обязательный элемент интерфейса викторины: ${name}`);
    }
  }
}

function validateQuestionBank() {
  if (questions.length !== TOTAL_QUESTIONS) {
    throw new Error(`В банке викторины должно быть ${TOTAL_QUESTIONS} вопросов, найдено: ${questions.length}`);
  }

  const sourceCounts = Object.fromEntries(Object.keys(REGIONS).map(source => [source, 0]));
  const identifiers = new Set();
  let multipleCount = 0;

  for (const question of questions) {
    if (!question.id || identifiers.has(question.id)) {
      throw new Error(`Идентификатор вопроса отсутствует или повторяется: ${question.id}`);
    }
    identifiers.add(question.id);

    if (!(question.source in sourceCounts)) {
      throw new Error(`Неизвестный источник вопроса "${question.source}" (${question.id})`);
    }
    sourceCounts[question.source] += 1;

    if (!Array.isArray(question.options) || question.options.length !== 4) {
      throw new Error(`У вопроса "${question.id}" должно быть ровно четыре варианта ответа`);
    }
    if (!Array.isArray(question.correctAnswers) ||
        question.correctAnswers.some(index => !Number.isInteger(index) || index < 0 || index >= question.options.length)) {
      throw new Error(`У вопроса "${question.id}" указаны некорректные правильные ответы`);
    }
    if (question.multiple !== (question.correctAnswers.length === 2)) {
      throw new Error(`Тип ответа не совпадает с ключом вопроса "${question.id}"`);
    }
    if (question.multiple) {
      multipleCount += 1;
    } else if (question.correctAnswers.length !== 1) {
      throw new Error(`У вопроса с одним ответом "${question.id}" должен быть один правильный вариант`);
    }
  }

  for (const [source, count] of Object.entries(sourceCounts)) {
    if (count !== 5) {
      throw new Error(`Для источника "${source}" должно быть ровно пять вопросов, найдено: ${count}`);
    }
  }
  if (multipleCount !== 5) {
    throw new Error(`В викторине должно быть ровно пять вопросов с двумя ответами, найдено: ${multipleCount}`);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function selectedAnswers(index = state.currentIndex) {
  return state.answers.get(questions[index].id) || new Set();
}

function answeredQuestionCount() {
  return questions.reduce((count, question) => {
    const answer = state.answers.get(question.id);
    return count + (answer && answer.size > 0 ? 1 : 0);
  }, 0);
}

function renderQuestionMap() {
  elements.questionMap.innerHTML = questions.map((question, index) => {
    const isCurrent = index === state.currentIndex;
    const isAnswered = state.answers.has(question.id) && state.answers.get(question.id).size > 0;
    const states = [
      isCurrent ? 'is-current' : '',
      isAnswered ? 'is-answered' : ''
    ].filter(Boolean).join(' ');
    const currentAttribute = isCurrent ? ' aria-current="step"' : '';
    const status = isAnswered ? 'отвечен' : 'не отвечен';
    const label = `Вопрос ${index + 1}, ${status}${isCurrent ? ', текущий' : ''}`;

    return `<button class="quiz-map-button ${states}" type="button" data-question-index="${index}" aria-label="${label}"${currentAttribute}>${String(index + 1).padStart(2, '0')}</button>`;
  }).join('');
}

function updateProgress() {
  const answered = answeredQuestionCount();
  const percentage = Math.round((answered / TOTAL_QUESTIONS) * 100);
  elements.answeredCount.textContent = String(answered);
  elements.progressPercent.textContent = `${percentage}%`;
  elements.progressFill.style.width = `${percentage}%`;
  elements.progressTrack.setAttribute('aria-valuenow', String(answered));
}

function renderQuestion(focusOption = null) {
  const question = questions[state.currentIndex];
  const selected = selectedAnswers();

  elements.questionNumber.textContent = String(state.currentIndex + 1).padStart(2, '0');
  elements.questionSource.textContent = REGIONS[question.source];
  elements.questionTitle.textContent = question.question;
  elements.multipleHint.hidden = !question.multiple;
  elements.selectionFeedback.textContent = '';
  elements.previousButton.disabled = state.currentIndex === 0;
  elements.nextButton.hidden = state.currentIndex === TOTAL_QUESTIONS - 1;
  elements.submitButton.hidden = state.currentIndex !== TOTAL_QUESTIONS - 1;

  elements.answerOptions.innerHTML = question.options.map((option, index) => {
    const isSelected = selected.has(index);
    const atLimit = question.multiple && selected.size === 2 && !isSelected;
    const label = question.multiple
      ? `Вариант ${LETTERS[index]}: ${option}, ${isSelected ? 'выбран' : 'не выбран'}`
      : `Вариант ${LETTERS[index]}: ${option}, ${isSelected ? 'выбран' : 'не выбран'}`;

    return `<button class="quiz-answer${atLimit ? ' is-limit-reached' : ''}" type="button" data-answer-index="${index}" aria-pressed="${isSelected}" aria-label="${escapeHtml(label)}"${state.checked ? ' disabled' : ''}>
      <span class="quiz-answer__letter" aria-hidden="true">${LETTERS[index]}</span>
      <span class="quiz-answer__text">${escapeHtml(option)}</span>
      <span class="quiz-answer__mark" aria-hidden="true"></span>
    </button>`;
  }).join('');

  renderQuestionMap();
  updateProgress();

  if (focusOption !== null) {
    elements.answerOptions.querySelector(`[data-answer-index="${focusOption}"]`)?.focus({ preventScroll: true });
  }
}

function changeQuestion(index, moveFocus = true) {
  if (!Number.isInteger(index) || index < 0 || index >= TOTAL_QUESTIONS || state.checked) {
    return;
  }

  state.currentIndex = index;
  renderQuestion();
  if (moveFocus) {
    elements.questionTitle.focus({ preventScroll: true });
  }
}

function handleAnswerSelection(index) {
  if (state.checked || !Number.isInteger(index) || index < 0 || index > 3) {
    return;
  }

  const question = questions[state.currentIndex];
  const selected = new Set(selectedAnswers());
  elements.selectionFeedback.textContent = '';

  if (selected.has(index)) {
    selected.delete(index);
  } else if (question.multiple && selected.size === 2) {
    elements.selectionFeedback.textContent = 'Уже выбраны два варианта. Снимите выбор с одного из них, чтобы заменить ответ.';
    elements.answerOptions.querySelectorAll('.quiz-answer:not([aria-pressed="true"])').forEach(button => {
      button.classList.add('is-limit-reached');
    });
    return;
  } else {
    selected.add(index);
  }

  if (selected.size > 0) {
    state.answers.set(question.id, selected);
  } else {
    state.answers.delete(question.id);
  }

  renderQuestion(index);
  if (question.multiple && selected.size === 2) {
    elements.selectionFeedback.textContent = 'Выбраны оба варианта. Чтобы изменить выбор, снимите отметку с одного из них.';
  }
}

function questionIsCorrect(question) {
  const selected = state.answers.get(question.id);
  if (!selected || selected.size !== question.correctAnswers.length) {
    return false;
  }
  return question.correctAnswers.every(answer => selected.has(answer));
}

function formatPercentage(score) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 })
    .format((score / TOTAL_QUESTIONS) * 100);
}

function resultLevel(score) {
  if (score === TOTAL_QUESTIONS) {
    return {
      rank: 'Региональный эксперт',
      message: 'Без единой ошибки — вы замечаете детали и уверенно ориентируетесь в материалах всех семи регионов.'
    };
  }
  if (score >= 27) {
    return {
      rank: 'Уверенный знаток',
      message: 'Сильный результат: многое уже запомнилось, а разбор поможет закрепить оставшиеся детали.'
    };
  }
  if (score >= 18) {
    return {
      rank: 'Внимательный исследователь',
      message: 'Хорошая основа для нового маршрута. Посмотрите разбор и откройте для себя факты, которые пока ускользнули.'
    };
  }
  return {
    rank: 'Новый маршрут начинается здесь',
    message: 'Каждый ответ — повод узнать больше. Разбор подскажет, к каким региональным страницам стоит вернуться.'
  };
}

function reviewAnswerMarkup(label, answer, className = '') {
  return `<p class="quiz-review-item__answer ${className}"><strong>${label}</strong><span>${escapeHtml(answer)}</span></p>`;
}

function renderReview() {
  elements.reviewList.innerHTML = questions.map((question, index) => {
    const selected = state.answers.get(question.id);
    const wasAnswered = Boolean(selected && selected.size > 0);
    const isCorrect = questionIsCorrect(question);
    const correctLabels = question.correctAnswers.map(answer => `${LETTERS[answer]}. ${question.options[answer]}`);
    const statusText = isCorrect ? 'Верно' : wasAnswered ? 'Есть ошибка' : 'Пропуск';
    const statusClass = isCorrect ? 'is-correct' : 'is-incorrect';
    const selectedMarkup = wasAnswered
      ? [...selected].sort((left, right) => left - right).map(answer => {
        const label = `${LETTERS[answer]}. ${question.options[answer]}`;
        const answerClass = question.correctAnswers.includes(answer) ? '' : 'is-wrong';
        return reviewAnswerMarkup('Ваш ответ', label, answerClass);
      }).join('')
      : reviewAnswerMarkup('Ваш ответ', 'Не выбран', 'is-missing');
    const correctMarkup = correctLabels.map(label => reviewAnswerMarkup('Верный ответ', label)).join('');
    const openAttribute = !isCorrect && questions.slice(0, index).every(previous => questionIsCorrect(previous)) ? ' open' : '';

    return `<details class="quiz-review-item ${statusClass}"${openAttribute}>
      <summary>
        <span class="quiz-review-item__number">${String(index + 1).padStart(2, '0')}</span>
        <span class="quiz-review-item__question">${escapeHtml(question.question)}</span>
        <span class="quiz-review-item__status">${statusText}</span>
      </summary>
      <div class="quiz-review-item__body">
        <p class="quiz-review-item__source">${REGIONS[question.source]}</p>
        ${selectedMarkup}
        ${correctMarkup}
      </div>
    </details>`;
  }).join('');
}

function animateScore(targetScore) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    elements.scoreValue.textContent = String(targetScore);
    return;
  }

  const duration = 780;
  const start = performance.now();
  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    elements.scoreValue.textContent = String(Math.round(targetScore * eased));
    if (progress < 1) {
      window.requestAnimationFrame(update);
    }
  };
  window.requestAnimationFrame(update);
}

function scrollToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function submitQuiz() {
  if (state.checked) {
    return;
  }

  state.checked = true;
  const score = questions.reduce((count, question) => count + (questionIsCorrect(question) ? 1 : 0), 0);
  const skipped = TOTAL_QUESTIONS - answeredQuestionCount();
  const percentage = formatPercentage(score);
  const level = resultLevel(score);

  elements.resultRank.textContent = level.rank;
  elements.resultMessage.textContent = level.message;
  elements.scorePercent.textContent = `${percentage}%`;
  elements.skippedCount.textContent = String(skipped);
  elements.scoreRing.style.setProperty('--score-angle', `${(score / TOTAL_QUESTIONS) * 360}deg`);
  elements.scoreRing.setAttribute('aria-label', `Результат: ${score} из ${TOTAL_QUESTIONS}, ${percentage}%`);
  elements.intro.hidden = true;
  elements.stage.hidden = true;
  elements.results.hidden = false;

  renderReview();
  animateScore(score);
  scrollToTop();
  elements.resultTitle.focus({ preventScroll: true });
}

function startQuiz() {
  elements.intro.hidden = true;
  elements.results.hidden = true;
  elements.stage.hidden = false;
  state.currentIndex = 0;
  renderQuestion();
  elements.questionTitle.focus({ preventScroll: true });
}

function restartQuiz() {
  state.currentIndex = 0;
  state.answers.clear();
  state.checked = false;
  elements.reviewList.replaceChildren();
  elements.results.hidden = true;
  elements.stage.hidden = true;
  elements.intro.hidden = false;
  elements.scoreValue.textContent = '0';
  elements.scorePercent.textContent = '0%';
  elements.skippedCount.textContent = '0';
  elements.scoreRing.style.setProperty('--score-angle', '0deg');
  elements.submitNote.textContent = '';
  updateProgress();
  renderQuestionMap();
  scrollToTop();
  elements.startButton.focus({ preventScroll: true });
}

function bindEvents() {
  elements.startButton.addEventListener('click', startQuiz);
  elements.previousButton.addEventListener('click', () => changeQuestion(state.currentIndex - 1));
  elements.nextButton.addEventListener('click', () => changeQuestion(state.currentIndex + 1));
  elements.submitButton.addEventListener('click', submitQuiz);
  elements.restartButton.addEventListener('click', restartQuiz);

  elements.answerOptions.addEventListener('click', event => {
    const button = event.target.closest('[data-answer-index]');
    if (button) {
      handleAnswerSelection(Number(button.dataset.answerIndex));
    }
  });

  elements.questionMap.addEventListener('click', event => {
    const button = event.target.closest('[data-question-index]');
    if (button) {
      changeQuestion(Number(button.dataset.questionIndex));
    }
  });
}

requireElements();
validateQuestionBank();
bindEvents();
updateProgress();
renderQuestionMap();
