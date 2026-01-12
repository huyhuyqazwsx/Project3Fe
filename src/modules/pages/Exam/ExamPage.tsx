import {useExams} from "../../hooks/exam/useExams.ts";
import {ExamList} from "../../components/exam/ExamList.tsx";
import {ExamCreateForm} from "../../components/exam/ExamCreateForm.tsx";

export default function ExamPage() {
    const {
        exams,
        loading,
        createExam,
        updateExam,
        deleteExam,
    } = useExams();

    return (
        <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 30 }}>
                📝 Quản lý bài thi
            </h2>

            <ExamCreateForm onCreate={createExam} />

            <hr style={{ margin: '30px 0', borderTop: '2px solid #eee' }} />

            <ExamList
                exams={exams}
                loading={loading}
                onUpdate={updateExam}
                onDelete={deleteExam}
            />
        </div>
    );
}