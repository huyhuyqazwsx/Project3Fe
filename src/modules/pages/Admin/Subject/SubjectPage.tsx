import { useSubjects } from '../../../hooks/subject/useSubjects.ts';
import { SubjectCreateForm } from '../../../components/subject/SubjectCreateForm.tsx';
import { SubjectSearchForm } from '../../../components/subject/SubjectSearchForm.tsx';
import { SubjectList } from '../../../components/subject/SubjectList.tsx';

export default function SubjectPage() {
    const {
        subjects,
        loading,
        createSubject,
        updateSubject,
        deleteSubject,
        searchSubjects,
    } = useSubjects();

    return (
        <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 30 }}>📚 Quản lý môn học</h2>

            <SubjectCreateForm onCreate={createSubject} />

            <SubjectSearchForm onSearch={searchSubjects} />

            <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #eee' }} />

            <SubjectList
                subjects={subjects}
                loading={loading}
                onUpdate={updateSubject}
                onDelete={deleteSubject}
            />
        </div>
    );
}