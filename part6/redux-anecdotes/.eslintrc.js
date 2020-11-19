module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
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
        'ecmaVersion': 12,
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
            { 'SwitchCase': 1}
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
    }
}
