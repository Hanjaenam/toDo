export default {
  PRIMARY: (alpha = 1) => `rgba(63, 81, 181,${alpha})`,
  SUCCESS: (alpha = 1) => `rgba(46,204,113,${alpha})`,
  DANGER: '#e74e3c',
  RADIUS: '5px',
  BACKGROUND: ['rgba(200,200,200, 0.2)'],
  breakpoints: {
    small: '576px',
    medium: '768px',
    large: '992px',
    wide: '1200px',
    header: '1300px',
  },
};
