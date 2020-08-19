module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'prettier --config .prettierrc.js --write',
    'eslint -c .eslintrc.js --fix --ignore-path .eslintignore',
    'cross-env NODE_ENV=test jest --findRelatedTests --passWithNoTests',
  ],
  '*.{md,html,json}': ['prettier --config .prettierrc.js --write'],
};
