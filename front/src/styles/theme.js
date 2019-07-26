export default {
  BREAKPOINTS: {
    SMALL: '576px',
    MEDIUM: '768px',
    LARGE: '992px',
    WIDE: '1200px',
    HEADER: '1300px',
  },
  BOX_SHADOW: {
    TO_DO_LIST: '0 0 5px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);',
    LOGIN_TEMPLATE: '0 0 4px rgba(0, 0, 0, 0.16), 0 0 6px rgba(0, 0, 0, 0.23)',
  },
  COLOR: {
    PRIMARY: ({ alpha = 1, add = 0, minus = 0 } = {}) =>
      `rgba(${45 + add - minus}, ${52 + add - minus}, ${54 +
        add -
        minus},${alpha})`,
    SUCCESS: (alpha = 1) => `rgba(46,204,113,${alpha})`,
    DANGER: '#e74e3c',
    BACKGROUND: 'rgba(233, 240, 243, 1)',
    NOT_FOCUSED: {
      BACKGROUND: 'rgb(243, 243, 243)',
      BORDER: ({ alpha = 0.2 } = {}) => `rgba(0,0,0,${alpha})`,
    },
    STAR: ({ alpha = 1, add = 0, minus = 0 } = {}) =>
      `rgba(${253 + add - minus}, ${216 + add - minus}, ${53 +
        add -
        minus}, ${alpha})`,
    PROJECT_DATE: 'rgba(47, 60, 61, 1);',
  },
  GAP: {
    TINY: '0.1rem',
    SMALL: '0.3rem',
    MEDIUM: '0.5rem',
    LARGE: '0.7rem',
    WIDE: '0.9rem',
    ONE: '1rem',
  },
  RADIUS: '3px',
  TRANSITION: '0.3s',
  WIDTH: {
    TO_DO_LIST: '450px',
  },
  FONT_SIZE: {
    CREATED_AT: '0.8rem',
  },
  Z_INDEX: {
    NEW_TO_DO: {
      BLACK: 9,
    },
  },
};

// 45
