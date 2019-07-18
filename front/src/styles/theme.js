export default {
  PRIMARY: ({ alpha = 1, add = 0, minus = 0 } = {}) =>
    `rgba(${45 + add - minus}, ${52 + add - minus}, ${54 +
      add -
      minus},${alpha})`,
  SUCCESS: (alpha = 1) => `rgba(46,204,113,${alpha})`,
  DANGER: '#e74e3c',
  RADIUS: '5px',
  BACKGROUND_COLOR: ({ alpha = 0.2, add = 0, minus = 0 } = {}) =>
    `rgba(${180 + add - minus},${180 + add - minus},${180 +
      add -
      minus}, ${alpha})`,
  BORDER: {
    NOT_FOCUS: 'rgba(0,0,0,0.2)',
  },
  TRANSITION: '0.3s',
  GAP: {
    TINY: '0.1rem',
    SMALL: '0.3rem',
    MEDIUM: '0.5rem',
    LARGE: '0.7rem',
    WIDE: '0.9rem',
    ONE: '1rem',
  },

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

// rgba(52, 73, 94,1.0)
// rgba(44, 62, 80,1.0)
