module.exports = {
    'env': {
        'browser': true,
        // replaced 'es2021': true, as it was generating an error due to react using an older version of eslint.
        'es6': true,

        /* Prevents undefined errors in .test. files */
        'jest': true,
        /* Prevents "module is not defined no-undef" error */
        'commonjs': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            4,
            /* Indent of 2 spaces with SwitchCase set to 1 will indent case clauses with 2 spaces with respect to switch statements */
            /* https://eslint.org/docs/rules/indent#switchcase */
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            // to prevent quote errors when using template literals:
            { 'allowTemplateLiterals': true }
        ],
        'semi': [
            'error',
            'never'
        ]
    },
    // added this because I was getting a "react version not specified" warning
    'settings': {
        'react': {
            'version': 'detect'
        }
    }

}
