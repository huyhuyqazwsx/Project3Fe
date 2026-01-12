import { useEffect, useState } from 'react';
import { examApi } from '../../api/exam/examApi';
import type { GetListExamForStudentDto } from '../../types/exam';
import {useAuth} from "../auth/useAuth.ts";

export function useStudentClassExams(classId?: number) {
    const { user } = useAuth();

    const [exams, setExams] = useState<GetListExamForStudentDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !classId) return;

        let cancelled = false;

        (async () => {
            setLoading(true);

            const data = await examApi.getExamsForStudentByClass(
                classId,
                user.id 
            );

            if (cancelled) return;
            setExams(data ?? []);
            setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [user, classId]);

    return {
        exams,
        loading,
    };
}
