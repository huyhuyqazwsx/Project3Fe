import axiosInstance from '../../../shared/utils/axiosConfig.ts';
import type {
    ClassForStudentDto,
    ClassItem,
    CreateClassRequest,
    CreateClassResponse,
    StudentsInClassResponse,
    UpdateStudentsInClassRequest,
    UpdateStudentsResult,
} from '../../types/class.ts';
import type {UpdateClassRequest, UpdateClassResponse} from "../../types/subject.ts";

export const classApi = {
    getAll: async (): Promise<ClassItem[]> => {
        const res = await axiosInstance.get<ClassItem[]>('/Class/get-all');
        return res.data;
    },

    getById: async (id: number): Promise<ClassItem> => {
        const res = await axiosInstance.get<ClassItem>(`/Class/${id}`);
        return res.data;
    },

    create: async (
        data: CreateClassRequest
    ): Promise<CreateClassResponse> => {
        const res = await axiosInstance.post<CreateClassResponse>(
            '/Class/create',
            data
        );
        return res.data;
    },

    delete: async (id: number): Promise<string> => {
        const res = await axiosInstance.delete<string>(
            `/Class/delete/${id}`
        );
        return res.data;
    },

    getStudents: async (
        classId: number
    ): Promise<StudentsInClassResponse> => {
        const res = await axiosInstance.get<StudentsInClassResponse>(
            `/Class/${classId}/students`
        );
        return res.data;
    },

    addStudents: async (
        data: UpdateStudentsInClassRequest
    ): Promise<UpdateStudentsResult> => {
        const res = await axiosInstance.post<UpdateStudentsResult>(
            '/Class/add-students',
            data
        );
        return res.data;
    },

    removeStudents: async (
        data: UpdateStudentsInClassRequest
    ): Promise<UpdateStudentsResult> => {
        const res = await axiosInstance.post<UpdateStudentsResult>(
            '/Class/remove-students',
            data
        );
        return res.data;
    },

    update: async (
        data: UpdateClassRequest
    ): Promise<UpdateClassResponse> => {
        const res = await axiosInstance.put<UpdateClassResponse>(
            '/Class/update',
            data
        );
        return res.data;
    },

    getClassesForStudent: async (
        studentId: number
    ): Promise<ClassForStudentDto[]> => {
        const res = await axiosInstance.get<ClassForStudentDto[]>(
            `/Class/student/${studentId}`
        );
        return res.data;
    },
};
