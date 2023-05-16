module.exports = {
  '**/*.(ts|tsx|js)': filenames => [
    // commented out since we do not want to run eslint on every commit at the moment
    // `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`,
};
