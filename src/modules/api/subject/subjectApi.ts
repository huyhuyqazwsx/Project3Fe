import axiosInstance from '../../../shared/utils/axiosConfig.ts';
import type {
    Subject,
    CreateSubjectRequest,
    CreateSubjectResponse,
    UpdateSubjectRequest,
    ApiUpdateMessageResponse, SubjectSearchParams
} from "../../types/subject.ts"


export const subjectApi = {
    getAll: async (): Promise<Subject[]> => {
        const res = await axiosInstance.get<Subject[]>('/Subject/get-all');
        return res.data;
    },

    create: async (
        data: CreateSubjectRequest
    ): Promise<CreateSubjectResponse> => {
        const res = await axiosInstance.post<CreateSubjectResponse>(
            '/Subject/create',
            data
        );
        return res.data;
    },

    getByCode: async (code: string): Promise<Subject> => {
        const res = await axiosInstance.get(
            `/Subject/get-with-${code}`
        );
        return res.data;
    },

    update: async (id: number, data: UpdateSubjectRequest): Promise<ApiUpdateMessageResponse> => {
        const res = await axiosInstance.put<ApiUpdateMessageResponse>(`/Subject/update/${id}`, data);
        return res.data;
    },

    delete: async (id: number): Promise<ApiUpdateMessageResponse> => {
        const res = await axiosInstance.delete<ApiUpdateMessageResponse>(`/Subject/delete/${id}`);
        return res.data;
    },

    search: async (
        params: SubjectSearchParams
    ): Promise<Subject[]> => {
        const res = await axiosInstance.get<Subject[]>(
            '/Subject/search',
            { params }
        );
        return res.data;
    },
};
