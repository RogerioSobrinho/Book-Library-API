module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-return-await': 'off',
        'no-useless-constructor': 'off',
        semi: ['error', 'always'],
        'no-var': ['error'],
        'one-var': ['error', 'never'],
        'require-jsdoc': 'error',
        'eol-last': ['error', 'always'],
        curly: ['error', 'multi-or-nest'],
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        camelcase: ['error'],
        'lines-between-class-members': [
            'error',
            'always',
            { exceptAfterSingleLine: true },
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'sort-imports': [
            'error',
            {
                ignoreCase: true,
                ignoreMemberSort: false,
                ignoreDeclarationSort: true,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.ts'],
            rules: {
                'no-undef': 'off',
                '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
                '@typescript-eslint/no-array-constructor': 'error',
                '@typescript-eslint/type-annotation-spacing': [
                    'error',
                    { before: false, after: true },
                ],
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'default',
                        format: ['camelCase'],
                    },
                    {
                        selector: 'memberLike',
                        modifiers: ['private'],
                        format: ['camelCase'],
                        leadingUnderscore: 'require',
                    },
                    {
                        selector: 'memberLike',
                        format: ['camelCase', 'UPPER_CASE'],
                    },
                    {
                        selector: 'parameter',
                        format: ['camelCase'],
                        leadingUnderscore: 'allow',
                    },
                    {
                        selector: 'variableLike',
                        format: ['camelCase', 'UPPER_CASE'],
                    },
                    {
                        selector: 'variable',
                        format: ['camelCase', 'UPPER_CASE'],
                    },
                    {
                        selector: 'variable',
                        types: ['boolean'],
                        format: ['PascalCase', 'UPPER_CASE'],
                        prefix: [
                            'is',
                            'should',
                            'has',
                            'can',
                            'did',
                            'will',
                            'enable',
                            'IS_',
                            'SHOULD_',
                            'HAS_',
                            'CAN_',
                            'DID_',
                            'WILL_',
                            'ENABLE_',
                        ],
                    },
                    {
                        selector: 'typeParameter',
                        format: ['PascalCase'],
                        prefix: ['T'],
                    },
                    {
                        selector: 'interface',
                        format: ['PascalCase'],
                        custom: {
                            regex: '^I[A-Z]',
                            match: true,
                        },
                    },
                    {
                        selector: 'typeLike',
                        format: ['PascalCase'],
                    },
                ],
            },
        },
    ],
};
