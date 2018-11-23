let _singleton = Symbol();
class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    createAssignment(topicId) {
        return fetch(`http://localhost:8080/api/topic/${topicId}/assignment`, {
            body: JSON.stringify({
                title: "Assignment",
                description: "This is a default description",
                essayAnswer: "This is a default answer",
                link: "This is a default link"
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(response => response.json());
    }
    deleteAssignment(assignmentId) {
        return fetch(`http://localhost:8080/api/assignment/${assignmentId}`, {
            method: 'delete'
        });
    }

    findAllAssignmentsForTopic(topicId) {
        return fetch(`http://localhost:8080/api/topic/${topicId}/assignment`)
            .then(response => response.json());
    }

    saveAssignment(assignment) {
        return fetch(`http://localhost:8080/api/assignment/${assignment.id}/save`, {
            body: JSON.stringify(assignment),
            headers: {'Content-Type': 'application/json'},
            method: 'post'
        }).then(response => response.json());
    }
}

export default AssignmentService;