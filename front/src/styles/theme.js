export default {
  COLOR: {
    PRIMARY: ({ alpha = 1, add = 0, minus = 0 } = {}) =>
      `rgba(${45 + add - minus}, ${52 + add - minus}, ${54 +
        add -
        minus},${alpha})`,
    SUCCESS: (alpha = 1) => `rgba(46,204,113,${alpha})`,
    DANGER: '#e74e3c',
    BACKGROUND: ({ alpha = 0.2, add = 0, minus = 0 } = {}) =>
      `rgba(${218 + add - minus},${230 + add - minus},${235 +
        add -
        minus}, ${alpha})`,
    NOT_FOCUSED: {
      BACKGROUND: 'rgb(238, 238, 238)',
      BORDER: ({ alpha = 0.2 } = {}) => `rgba(0,0,0,${alpha})`,
    },
    STAR: ({ alpha = 1, add = 0, minus = 0 } = {}) =>
      `rgba(${253 + add - minus}, ${216 + add - minus}, ${53 +
        add -
        minus}, ${alpha})`,
  },
  TRANSITION: '0.3s',
  RADIUS: '5px',
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
    LOGIN_TEMPLATE: '0 0 4px rgba(0, 0, 0, 0.16), 0 0 6px rgba(0, 0, 0, 0.23)',
  },
};
