import type { GeneratedQuestionDto } from '../../../types/exam.ts';

interface Props {
    question: GeneratedQuestionDto;
    value?: string;
    onChange: (value: string) => void;
}

export function SingleChoiceQuestion({
                                         question,
                                         value,
                                         onChange,
                                     }: Props) {
    return (
        <div style={{ marginBottom: 24 }}>
            <p>
                <strong>Câu {question.order}:</strong> {question.content}
            </p>

            {question.cleanAnswer.map(ans => (
                <label key={ans} style={{ display: 'block' }}>
                    <input
                        type="radio"
                        name={`q-${question.id}`}
                        checked={value === ans}
                        onChange={() => onChange(ans)}
                    />
                    {ans}
                </label>
            ))}
        </div>
    );
}
