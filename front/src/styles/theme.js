export default {
  PRIMARY: ({ alpha = 1, add = 0, minus = 0 } = {}) =>
    `rgba(${45 + add - minus}, ${52 + add - minus}, ${54 +
      add -
      minus},${alpha})`,
  SUCCESS: (alpha = 1) => `rgba(46,204,113,${alpha})`,
  DANGER: '#e74e3c',

  BACKGROUND_COLOR: ({ alpha = 0.2, add = 0, minus = 0 } = {}) =>
    `rgba(${178 + add - minus},${190 + add - minus},${195 +
      add -
      minus}, ${alpha})`,
  BORDER: {
    NOT_FOCUS: 'rgba(0,0,0,0.2)',
  },
  RADIUS: '5px',
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
  BOX_SHADOW: {
    TO_DO_LIST: '0 0 5px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);',
  },
};
