let questions = [
  {
    text: "What type of language is JavaScript?",
    answers: [
      {
        id: 0,
        text: "Functional",
      },
      {
        id: 1,
        text: "Object Oriented",
      },
      {
        id: 2,
        text: "Procedural",
      },
      {
        id: 3,
        text: "None of the above",
      },
    ],
    correctAnswerId: 1,
  },
  {
    text: "What is Bootstrap?",
    answers: [
      {
        id: 0,
        text: "A programming language",
      },
      {
        id: 1,
        text: "A CSS framework",
      },
      {
        id: 2,
        text: "A JavaScript framework",
      },
      {
        id: 3,
        text: "An HTML framework",
      },
    ],
    correctAnswerId: 1,
  },
  {
    text: "How do you get the length of an array?",
    answers: [
      {
        id: 0,
        text: "array.numberOfItems",
      },
      {
        id: 1,
        text: "array.getLength()",
      },
      {
        id: 2,
        text: "array.count",
      },
      {
        id: 3,
        text: "array.length",
      },
    ],
    correctAnswerId: 3,
  },
  {
    text: "What attribute tells a link where to go?",
    answers: [
      {
        id: 0,
        text: "a",
      },
      {
        id: 1,
        text: "rel",
      },
      {
        id: 2,
        text: "href",
      },
      {
        id: 3,
        text: "to",
      },
    ],
    correctAnswerId: 2,
  },
  {
    text: "What command syncs your local code with a remote repository?",
    answers: [
      {
        id: 0,
        text: "git push",
      },
      {
        id: 1,
        text: "git add",
      },
      {
        id: 2,
        text: "git commit",
      },
      {
        id: 3,
        text: "git pull",
      },
    ],
    correctAnswerId: 3,
  },
];

let currentQuestion;

/**
 * Durstenfeld shuffle algorithm to randomize array elements
 * @param {Array<any>} array Array to be shuffled
 * @returns {Array<any>} Shuffled array
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
