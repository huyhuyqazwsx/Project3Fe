// ===== ACTION CONSTANT =====
export const ExamWsAction = {
    SubmitAnswer: 'SubmitAnswer',
    SubmitExam: 'SubmitExam',
    SyncState: 'SyncState',
    Reconnect: 'Reconnect',
    Heartbeat: 'Heartbeat',
} as const;

// ===== ACTION TYPE =====
export type ExamWsAction =
    typeof ExamWsAction[keyof typeof ExamWsAction];

// ===== BASE MESSAGE =====
export interface ExamWsBaseMessage {
    Action: ExamWsAction;
}

// ===== SUBMIT ANSWER =====
export interface SubmitAnswerMessage extends ExamWsBaseMessage {
    Action: typeof ExamWsAction.SubmitAnswer;
    QuestionId: number;
    Order: number;
    Answer: string;
}

// ===== SUBMIT EXAM =====
export interface SubmitExamMessage extends ExamWsBaseMessage {
    Action: typeof ExamWsAction.SubmitExam;
}

// ===== SYNC / RECONNECT =====
export interface SyncStateMessage extends ExamWsBaseMessage {
    Action: typeof ExamWsAction.SyncState;
}

export interface ReconnectMessage extends ExamWsBaseMessage {
    Action: typeof ExamWsAction.Reconnect;
}

// ===== HEARTBEAT =====
export interface HeartbeatMessage extends ExamWsBaseMessage {
    Action: typeof ExamWsAction.Heartbeat;
}

// ===== CLIENT MESSAGE UNION =====
export type ExamWsClientMessage =
    | SubmitAnswerMessage
    | SubmitExamMessage
    | SyncStateMessage
    | ReconnectMessage
    | HeartbeatMessage;

export interface StudentAnswer {
    QuestionId: number;
    Order: number;
    Answer: string; // SINGLE hoặc MULTI (A||B)
}