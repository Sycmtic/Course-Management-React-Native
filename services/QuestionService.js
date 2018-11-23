let _singleton = Symbol();

class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }

    saveQuestion(question) {
        return fetch(`http://localhost:8080/api/question/${question.type}/${question.id}/save`, {
            body: JSON.stringify(question),
            headers: {'Content-Type': 'application/json'},
            method: 'post'
        }).then(response => response.json());
    }
}

export default QuestionService;