import type {GeneratedQuestionDto} from "../../../types/exam.ts";


interface Props {
    question: GeneratedQuestionDto;
    values?: string[];
    onChange: (values: string[]) => void;
}

export function MultipleChoiceQuestion({
                                           question,
                                           values = [],
                                           onChange,
                                       }: Props) {
    const toggle = (ans: string) => {
        if (values.includes(ans)) {
            onChange(values.filter(v => v !== ans));
        } else {
            onChange([...values, ans]);
        }
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <p>
                <strong>Câu {question.order}:</strong> {question.content}
            </p>

            {question.cleanAnswer.map(ans => (
                <label key={ans} style={{ display: 'block' }}>
                    <input
                        type="checkbox"
                        checked={values.includes(ans)}
                        onChange={() => toggle(ans)}
                    />
                    {ans}
                </label>
            ))}
        </div>
    );
}
