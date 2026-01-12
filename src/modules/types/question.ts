export const QuestionType = {
    SINGLE_CHOICE: 'SINGLE_CHOICE',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
} as const;

export type QuestionType =
    typeof QuestionType[keyof typeof QuestionType];


export const QuestionDifficulty = {
    Easy: 'Easy',
    Medium: 'Medium',
    Hard: 'Hard',
    VeryHard: 'VeryHard',
} as const;

export type QuestionDifficulty =
    typeof QuestionDifficulty[keyof typeof QuestionDifficulty];