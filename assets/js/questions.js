const questions = [
  {
    text: "What type of language is JavaScript",
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
  // {
  //   text: "",
  //   answers: [
  //     {
  //       id: 0,
  //       text: "",
  //     },
  //     {
  //       id: 1,
  //       text: "",
  //     },
  //     {
  //       id: 2,
  //       text: "",
  //     },
  //     {
  //       id: 3,
  //       text: "",
  //     },
  //   ],
  //   correctAnswerId: 0,
  // },
  // {
  //   text: "",
  //   answers: [
  //     {
  //       id: 0,
  //       text: "",
  //     },
  //     {
  //       id: 1,
  //       text: "",
  //     },
  //     {
  //       id: 2,
  //       text: "",
  //     },
  //     {
  //       id: 3,
  //       text: "",
  //     },
  //   ],
  //   correctAnswerId: 0,
  // },
  // {
  //   text: "",
  //   answers: [
  //     {
  //       id: 0,
  //       text: "",
  //     },
  //     {
  //       id: 1,
  //       text: "",
  //     },
  //     {
  //       id: 2,
  //       text: "",
  //     },
  //     {
  //       id: 3,
  //       text: "",
  //     },
  //   ],
  //   correctAnswerId: 0,
  // },
];

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
