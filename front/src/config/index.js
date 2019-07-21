export default {
  HOME_URL: '/me/project?page=1&sort=latest&q=',
  SORT: {
    LATEST: 'latest',
    IMPORTANCE: 'importance',
    convertKorean: SORT => {
      switch (SORT) {
        case 'latest':
          return '최신순';
        case 'importance':
          return '중요도';
        default:
          return 'NOT DEFINED';
      }
    },
  },
};
