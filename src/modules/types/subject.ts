export interface Subject {
    id: number;
    name: string;
    subjectCode: string;
    totalChapters: number;
}

export interface CreateSubjectRequest {
    name: string;
    subjectCode: string;
    totalChapters: number;
}

export interface CreateSubjectResponse {
    success: boolean;
    message: string;
    data?: Subject;
}

export interface UpdateSubjectRequest{
    name: string;
    subjectCode: string;
    totalChapters: number;
}

export interface ApiUpdateMessageResponse {
    message: string;
    name: string;
    subjectCode: string;
    totalChapters: number;
}

export interface SubjectSearchParams {
    keyword?: string;
    minChapters?: number;
    maxChapters?: number;
    sortBy?: 'name' | 'code' | 'chapters';
    desc?: boolean;
}
