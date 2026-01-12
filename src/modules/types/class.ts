export interface ClassItem {
    id: number;
    name: string;
    subjectId: number;
    teacherId: number;
}

export interface CreateClassRequest {
    name: string;
    subjectId: number;
    teacherId: number;
}

export interface CreateClassResponse {
    message: string;
    id: number;
}

export interface StudentInClass {
    studentId: number;
    mssv: string;
    fullName: string;
    email: string;
    role: string; // STUDENT
}

export interface StudentsInClassResponse {
    classId: number;
    total: number;
    students: StudentInClass[];
}

/* ===== UPDATE STUDENTS ===== */
export interface UpdateStudentsInClassRequest {
    classId: number;
    studentIds: number[];
}

export interface UpdateStudentsResult {
    message: string;
    added?: number;
    skipped?: number;
    removed?: number;
}

export interface ClassForStudentDto {
    classId: number;
    className: string;

    subjectId: number;
    subjectName: string;
    subjectCode: string;

    teacherId: number;
    teacherName: string;
}
