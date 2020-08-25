const stressQs = [
  'Think there is too much work that makes it hard to manage', // 0
  'Think there is not enough time and you always have to rush e.g.walking fast, talking fast', // 1
  'Think there is no time for leisure / rest, and you always think of work.', // 2
  'Get frustrated easily when facing difficulties / hardships.', // 3
  'Care a lot about others’ comments on your work.', // 4
  'Think that no one(e.g.boss, family) appreciates you.', // 5
  'Suffer from chronic headache / stomachache / back pain.', // 6
  'Feel anxious and need to rely on drugs / alcohol / snacks to calm yourself down.', // 7
];

const sleepQs = [
  'Can’ t get asleep in 30 minutes / Wake up in the middle of your sleep and hardly get back to sleep again', // 0
  'Have nightmares', // 1
  'Rely on hypnotics(sleeping pills) to fall asleep', // 2
  'Doze off in daily activities(e.g.driving, eating, etc.)', // 3
  'Feel tired after a night of sleep', // 4
  'Overall, you consider your sleep quality', // 5
];

const exerciseQs = [
  {
    // 0
    question: 'How many days did you do vigorous physical activities (e.g. heavy lifting, aerobics, or fast bicycling?)',
    hint:
      'Think about all the vigorous physical activities that you did in the last 7 days. Vigorous physical activities refer to activities that make you breathe much harder than normal. Think only about those physical activities that you did for at least 10 minutes at a time.',
    unit: 'days',
  },
  {
    // 1
    question: 'How much time did you usually spend doing vigorous physical activities on one of those days?',
    unit: 'hours',
  },
  {
    // 2
    question:
      'How many days did you do moderate physical activities like carrying light loads, bicycling at a regular pace? Do not include walking.',
    hint:
      'Think about all the moderate physical activities that you did in the last 7 days. Moderate physical activities refer to activities that make you breathe a bit harder than normal. Think only about those physical activities that you did for at least 10 minutes at a time.',
    unit: 'days',
  },
  {
    // 3
    question: 'How much time did you usually spend doing moderate physical activities on one of those days?',
    unit: 'hours',
  },
  {
    // 4
    question: 'How many days did you walk for at least 10 minutes at a time?',
    hint:
      'Think about the time you spent walking in the last 7 days. This includes at work and at home, walking to travel from place to place, and any other walking that you might do solely for recreation, sport, exercise, or leisure.',
    unit: 'days',
  },
  {
    // 5
    question: 'How much time did you usually spend walking on one of those days?',
    unit: 'hours',
  },
  {
    // 6
    question: 'How much time did you spend sitting on a weekday? (i.e. Monday to Friday)',
    hint:
      'The last question is about the time you spent sitting on weekdays during the last 7 days. Include time spent at work, at home, and during leisure time. This may include time spent sitting at a desk, visiting friends, reading, or sitting or lying down to watch television.',
    unit: 'hours',
  },
];
