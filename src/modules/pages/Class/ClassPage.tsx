import { useState } from 'react';
import { useClasses } from '../../hooks/class/useClasses';
import { ClassList } from '../../components/class/ClassList';
import { ClassDetailPage } from './ClassDetailPage';

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
