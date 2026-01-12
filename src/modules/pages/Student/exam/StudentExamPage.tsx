import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useExamWebSocket } from '../../../hooks/ws/useExamWebSocket';

import { QuestionType } from '../../../types/question';
import type {
    StartExamResponse,
    GeneratedQuestionDto,
    ExamGenerateResultDto
} from '../../../types/exam';
import type { StudentAnswer } from '../../../types/ws';

import { SingleChoiceQuestion } from '../../../components/exam/form_question/SingleChoiceQuestion';
import { MultipleChoiceQuestion } from '../../../components/exam/form_question/MultipleChoiceQuestion';
import { useStartExam } from "../../../hooks/exam/useStartExam.ts";
import { useAuth } from "../../../hooks/auth/useAuth.ts";
import {examApi} from "../../../api/exam/examApi.ts";

const EXAM_CACHE_PREFIX = 'exam_cache_';

const saveExamToCache = (examId: number, studentId: number, data: ExamGenerateResultDto) => {
    const key = `${EXAM_CACHE_PREFIX}${examId}_${studentId}`;
    localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
    }));
};

const getExamFromCache = (examId: number, studentId: number): ExamGenerateResultDto | null => {
    const key = `${EXAM_CACHE_PREFIX}${examId}_${studentId}`;
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    try {
        const { data, timestamp } = JSON.parse(cached);
        // Cache valid trong 24h
        if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

const clearExamCache = (examId: number, studentId: number) => {
    const key = `${EXAM_CACHE_PREFIX}${examId}_${studentId}`;
    localStorage.removeItem(key);
};

export default function StudentExamPage() {
    const { examId } = useParams<{ examId: string }>();
    const navigate = useNavigate();

    const { user } = useAuth();
    const studentId = user?.id;

    const { startExam, loading: startLoading } = useStartExam();

    const [examData, setExamData] = useState<StartExamResponse | null>(null);
    const [generatedExam, setGeneratedExam] = useState<ExamGenerateResultDto | null>(null);
    const [answers, setAnswers] = useState<StudentAnswer[]>([]);
    const [loading, setLoading] = useState(true);

    const hasStarted = useRef(false);

    // ===== START / RESUME EXAM =====
    useEffect(() => {
        if (!examId || !studentId) return;
        if (hasStarted.current) return;

        hasStarted.current = true;

        const initExam = async () => {
            try {
                setLoading(true);

                // 1️⃣ Gọi start-exam để lấy status
                const response = await startExam(Number(examId), studentId);

                if (!response) {
                    navigate(-1);
                    return;
                }

                // 2️⃣ Xử lý theo status
                switch (response.status) {
                    case 'not_started':
                        // BE đã alert "Bài thi chưa bắt đầu" trong hook
                        navigate(-1);
                        break;

                    case 'expired':
                        // BE đã alert "Bài thi đã hết hạn" trong hook
                        navigate(-1);
                        break;

                    case 'completed':
                        // Đã nộp → xem kết quả
                        clearExamCache(Number(examId), studentId);
                        navigate(`/student/results/${examId}`, { replace: true });
                        break;

                    case 'create':
                        // Lần đầu làm bài → lưu đề vào cache
                        setExamData(response);
                        saveExamToCache(Number(examId), studentId, response.data);
                        setGeneratedExam(response.data);
                        break;

                    case 'in_progress':
                        // Đang làm dở → load từ cache hoặc API
                        { setExamData(response);

                        const cached = getExamFromCache(Number(examId), studentId);

                        if (cached) {
                            console.log('✅ Loaded exam from cache');
                            setGeneratedExam(cached);
                        } else {
                            console.log('⚠️ Cache not found, fetching from API...');
                            const currentExam = await examApi.getCurrentQuestion(
                                Number(examId),
                                studentId
                            );
                            saveExamToCache(Number(examId), studentId, currentExam);
                            setGeneratedExam(currentExam);
                        }
                        break; }
                }

            } catch (error) {
                console.error('❌ Error initializing exam:', error);
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };

        void initExam();
    }, [examId, studentId, startExam, navigate]);

    // ===== WS =====
    const wsUrl =
        examData?.status === 'create' || examData?.status === 'in_progress'
            ? examData.wsUrl
            : undefined;

    useExamWebSocket(wsUrl);

    // ===== ANSWER HANDLERS =====
    const updateSingle = (q: GeneratedQuestionDto, value: string) => {
        setAnswers(prev => [
            ...prev.filter(a => a.QuestionId !== q.id),
            {
                QuestionId: q.id,
                Order: q.order,
                Answer: value,
            },
        ]);
    };

    const updateMultiple = (q: GeneratedQuestionDto, values: string[]) => {
        setAnswers(prev => [
            ...prev.filter(a => a.QuestionId !== q.id),
            {
                QuestionId: q.id,
                Order: q.order,
                Answer: values.join('||'),
            },
        ]);
    };

    // ===== UI STATES =====
    if (loading || startLoading) {
        return (
            <div style={{ padding: 24 }}>
                <h2>⏳ Đang tải đề thi...</h2>
            </div>
        );
    }

    if (!examData || !generatedExam) {
        return (
            <div style={{ padding: 24 }}>
                <h2>❌ Không tìm thấy đề thi</h2>
                <button onClick={() => navigate(-1)}>← Quay lại</button>
            </div>
        );
    }

    if (examData.status === 'in_progress' && !generatedExam) {
        return (
            <div style={{ padding: 24 }}>
                <h2>⏳ Đang tải đề thi...</h2>
                <p>Đang kết nối phiên làm bài</p>
            </div>
        );
    }

    // ===== RENDER =====
    return (
        <div style={{ padding: 24 }}>
            <h2>{generatedExam.name}</h2>

            <p>
                Thời gian làm bài:{' '}
                <strong>{generatedExam.durationMinutes}</strong> phút
            </p>

            <hr />

            {generatedExam.questions
                .sort((a, b) => a.order - b.order)
                .map(q => {
                    const answer = answers.find(a => a.QuestionId === q.id);

                    if (q.type === QuestionType.SINGLE_CHOICE) {
                        return (
                            <SingleChoiceQuestion
                                key={q.id}
                                question={q}
                                value={answer?.Answer}
                                onChange={val => updateSingle(q, val)}
                            />
                        );
                    }

                    if (q.type === QuestionType.MULTIPLE_CHOICE) {
                        const values = answer?.Answer
                            ? answer.Answer.split('||')
                            : [];

                        return (
                            <MultipleChoiceQuestion
                                key={q.id}
                                question={q}
                                values={values}
                                onChange={vals => updateMultiple(q, vals)}
                            />
                        );
                    }

                    return null;
                })}

            <hr />

            <button disabled>📤 Nộp bài (chưa bật)</button>
        </div>
    );
}