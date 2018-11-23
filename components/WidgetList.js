import React from 'react'
import {View, Text} from 'react-native'
import {ListItem, Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamService from "../services/ExamService";
import ExamItem from "../elements/ExamItem";
import AssignmentService from "../services/AssignmentService";
import AssignmentItem from '../elements/AssignmentItem'

class WidgetList extends React.Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            exams: [],
            assignments: [],
            topicId: '',
            title: ''
        }
        this.createExam = this.createExam.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);

        this.assignmentService = AssignmentService.instance;
        this.examService = ExamService.instance;
    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId});
        this.findAllExamsForTopic(topicId);
        this.findAllAssignmentsForTopic(topicId);
    }

    findAllExamsForTopic(topicId) {
        this.examService
            .findAllExamsForTopic(topicId)
            .then((exams) => this.setState({exams: exams}))
    }
    findAllAssignmentsForTopic(topicId) {
        this.assignmentService
            .findAllAssignmentsForTopic(topicId)
            .then((assignments) => this.setState({assignments: assignments}));
    }

    createExam(event) {
        this.examService
            .createExam(this.state.topicId)
            .then(() => this.findAllExamsForTopic(this.state.topicId));
    }
    createAssignment(event) {
        this.assignmentService
            .createAssignment(this.state.topicId)
            .then(() => this.findAllAssignmentsForTopic(this.state.topicId));
    }

    deleteExam(examId) {
        this.examService
            .deleteExam(examId)
            .then(() => this.findAllExamsForTopic(this.state.topicId));
    }
    deleteAssignment(assignmentId) {
        this.assignmentService
            .deleteAssignment(assignmentId)
            .then(() => this.findAllAssignmentsForTopic(this.state.topicId));
    }

    renderListOfExams() {
        let exams = this.state.exams.map((exam, index) =>
            <ExamItem key={exam.id} exam={exam} delete={this.deleteExam} navigation={this.props.navigation} onRefreshExam={this.onRefreshExam.bind(this)}/>
        );
        return exams;
    }
    renderListOfAssignments() {
        let assignments = this.state.assignments.map((assignment, index) =>
            <AssignmentItem key={assignment.id} assignment={assignment} delete={this.deleteAssignment} navigation={this.props.navigation} onRefreshAssignment={this.onRefreshAssignment.bind(this)}/>
        );
        return assignments;
    }

    onRefreshAssignment(newAssignment) {
        const assignments = this.state.assignments.map(assignment => {
            if (assignment.id === newAssignment.id) {
                assignment.title = newAssignment.title;
                assignment.description = newAssignment.description;
                assignment.points = newAssignment.points;
            }
        })
        this.setState(assignments);
    }
    onRefreshExam(newExam) {
        const exams = this.state.exams.map(exam => {
            if (exam.id === newExam.id) {
                exam.title = newExam.title;
                exam.description = newExam.description;
            }
        })
        this.setState(exams);
    }

    render() {
        return(
            <View style={{padding: 15}}>
                {this.renderListOfAssignments()}
                {this.renderListOfExams()}
                <Button buttonStyle={{margin: 5, borderRadius: 5}} title="Add Exam" backgroundColor="blue"
                        color="white" onPress={this.createExam}/>
                <Button buttonStyle={{margin: 5, borderRadius: 5}} title="Add Assignment" backgroundColor="blue"
                        color="white" onPress={this.createAssignment}/>
            </View>
        )
    }
}
export default WidgetList