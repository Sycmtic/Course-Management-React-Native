let _singleton = Symbol();
class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    createExam(topicId) {
        return fetch(`http://localhost:8080/api/topic/${topicId}/exam`, {
            body: JSON.stringify({
                title: "Exam",
                description: "This is a default description"
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(response => response.json());
    }
    saveExam(exam) {
        return fetch(`http://localhost:8080/api/exam/${exam.id}/save`, {
            body: JSON.stringify(exam),
            headers: {'Content-Type': 'application/json'},
            method: 'post'
        }).then(response => response.json());
    }

    deleteExam(examId) {
        return fetch(`http://localhost:8080/api/exam/${examId}`, {
            method: 'delete'
        });
    }

    findAllExamsForTopic(topicId) {
        return fetch(`http://localhost:8080/api/topic/${topicId}/exam`)
            .then(response => response.json());
    }

    addQuestion(examId, questionType) {
        return fetch(`http://localhost:8080/api/exam/${examId}/question/${questionType}`, {
            body: JSON.stringify({
                title: 'default title',
                description: 'default description',
                type: questionType
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'post'
        }).then(response => response.json());
    }

    findAllQuestionsForExam(examId) {
        return fetch(`http://localhost:8080//api/exam/${examId}/question`)
            .then(response => response.json());
    }
}

export default ExamService;