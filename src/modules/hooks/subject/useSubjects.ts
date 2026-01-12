import {useEffect, useState} from "react";
import type {CreateSubjectRequest, Subject, SubjectSearchParams, UpdateSubjectRequest} from "../../types/subject.ts";
import {subjectApi} from "../../api/subject/subjectApi.ts";
import {getAxiosErrorMessage} from "../../../shared/utils/getAxiosErrorMessage.ts";

export function useSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        subjectApi.getAll().then(data => {
            setSubjects(data);
            setLoading(false);
        });
    }, []);

    const createSubject = async (data: CreateSubjectRequest) => {
        try {
            const res = await subjectApi.create(data);

            const subject = await subjectApi.getByCode(data.subjectCode);
            setSubjects(prev => [...prev, subject]);

            return {
                success: true,
                message: res.message,
            };
        } catch (error: unknown) {
            return {
                success: false,
                message: getAxiosErrorMessage(error, 'Tạo thất bại')
            }
        }
    };

    const updateSubject = async (id: number, data: UpdateSubjectRequest) => {
        try {
            const res = await subjectApi.update(id, data);

            setSubjects(prev =>
                prev.map(s => (s.id === id ? {
                    id : s.id,
                    name: res.name,
                    subjectCode: res.subjectCode,
                    totalChapters: res.totalChapters,
                } : s))
            );

            return {
                success: true,
                message: res.message,
            };
        } catch (error: unknown) {
            return {
                success: false,
                message: getAxiosErrorMessage(error, 'Cập nhật thất bại'),
            };
        }
    };

    const deleteSubject = async (id: number) => {
        try {
            const res = await subjectApi.delete(id);

            setSubjects(prev => prev.filter(s => s.id !== id));

            return {
                success: true,
                message: res.message,
            };
        } catch (error: unknown) {
            return {
                success: false,
                message: getAxiosErrorMessage(error, 'Xóa môn học thất bại'),
            };
        }
    };

    const searchSubjects = async (params: SubjectSearchParams) => {
        try {
            setLoading(true);
            const data = await subjectApi.search(params);
            setSubjects(data);
        } finally {
            setLoading(false);
        }
    };

    return {
        subjects,
        loading,
        createSubject,
        updateSubject,
        deleteSubject,
        searchSubjects
    };

}