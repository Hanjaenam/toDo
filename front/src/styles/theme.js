export default {
  PRIMARY: ({ alpha = 1, add = 0, minus = 0 } = {}) =>
    `rgba(${63 + add - minus}, ${81 + add - minus}, ${181 +
      add -
      minus},${alpha})`,
  SUCCESS: (alpha = 1) => `rgba(46,204,113,${alpha})`,
  DANGER: '#e74e3c',
  RADIUS: '5px',
  BACKGROUND: ['rgba(200,200,200, 0.2)'],
  TRANSITION: '0.3s',
  BREAKPOINTS: {
    SMALL: '576px',
    MEDIUM: '768px',
    LARGE: '992px',
    WIDE: '1200px',
    HEADER: '1300px',
  },
  WIDTH: {
    TO_DO_LIST: '450px',
  },
};
