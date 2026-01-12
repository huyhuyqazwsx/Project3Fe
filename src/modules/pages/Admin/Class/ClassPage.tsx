import { useState } from 'react';
import { useClasses } from '../../../hooks/class/useClasses.ts';
import { ClassList } from '../../../components/class/ClassList.tsx';
import { ClassDetailPage } from './ClassDetailPage.tsx';

export default function ClassPage() {
    const { classes, loading } = useClasses();
    const [selectedClassId, setSelectedClassId] =
        useState<number | null>(null);

    return (
        <div style={{ padding: 20 }}>
            <h2>🏫 Quản lý lớp học</h2>

            {selectedClassId === null ? (
                <ClassList
                    classes={classes}
                    loading={loading}
                    onSelect={setSelectedClassId}
                />
            ) : (
                <ClassDetailPage
                    classId={selectedClassId}
                    onBack={() => setSelectedClassId(null)}
                />
            )}
        </div>
    );
}
