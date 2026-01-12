import { useEffect, useState } from 'react';
import { classApi } from '../../api/class/classApi.ts';
import type {
    ClassItem,
    CreateClassRequest,
    ClassForStudentDto,
} from '../../types/class.ts';
import { getAxiosErrorMessage } from '../../../shared/utils/getAxiosErrorMessage.ts';
import type {UpdateClassRequest} from "../../types/subject.ts";

export function useClasses() {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);

    /* ===== ADMIN: GET ALL CLASSES ===== */
    useEffect(() => {
        classApi
            .getAll()
            .then(setClasses)
            .finally(() => setLoading(false));
    }, []);

    /* ===== CLASS (ADMIN) ===== */
    const createClass = async (data: CreateClassRequest) => {
        try {
            const res = await classApi.create(data);
            const newClass = await classApi.getById(res.id);
            setClasses(prev => [...prev, newClass]);

            return { success: true, message: res.message };
        } catch (e) {
            return {
                success: false,
                message: getAxiosErrorMessage(e, 'Tạo lớp thất bại'),
            };
        }
    };

    const deleteClass = async (id: number) => {
        try {
            await classApi.delete(id);
            setClasses(prev => prev.filter(c => c.id !== id));
            return { success: true, message: 'Xóa lớp thành công' };
        } catch (e) {
            return {
                success: false,
                message: getAxiosErrorMessage(e, 'Xóa lớp thất bại'),
            };
        }
    };

    const updateClass = async (data: UpdateClassRequest) => {
        try {
            const res = await classApi.update(data);

            setClasses(prev =>
                prev.map(c =>
                    c.id === data.id
                        ? {
                            ...c,
                            name: data.name,
                            subjectId: data.subjectId,
                            teacherId: data.teacherId,
                        }
                        : c
                )
            );

            return { success: true, message: res.message };
        } catch (e) {
            return {
                success: false,
                message: getAxiosErrorMessage(e, 'Cập nhật lớp thất bại'),
            };
        }
    };

    /* ===== STUDENTS IN CLASS ===== */
    const getStudentsInClass = async (classId: number) => {
        return await classApi.getStudents(classId);
    };

    const addStudents = async (classId: number, studentIds: number[]) => {
        return await classApi.addStudents({ classId, studentIds });
    };

    const removeStudents = async (classId: number, studentIds: number[]) => {
        return await classApi.removeStudents({ classId, studentIds });
    };

    /* ===== STUDENT: GET CLASSES OF STUDENT ===== */
    const getClassesForStudent = async (
        studentId: number
    ): Promise<ClassForStudentDto[]> => {
        // BE có thể trả []
        return await classApi.getClassesForStudent(studentId);
    };

    return {
        /* admin */
        classes,
        loading,
        createClass,
        deleteClass,
        updateClass,

        /* class-student */
        getStudentsInClass,
        addStudents,
        removeStudents,

        /* student */
        getClassesForStudent,
    };
}
