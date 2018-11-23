import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, TextInput } from 'react-native'
import { Text, ListItem, Button, Icon, FormLabel, Divider, FormValidationMessage } from 'react-native-elements'
import QuestionTypePicker from "../elements/QuestionTypePicker";
import ExamService from "../services/ExamService";
import styles from "../styles/styles"

class ExamWidget extends Component {
    static navigationOptions = {title: 'ExamWidget'}
    constructor(props) {
        super(props)
        this.state = {
            exam: {},
            examId: '',
            questions: [],
            questionType: ''
        }
        this.addQuestion = this.addQuestion.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.questionIcon = this.questionIcon.bind(this);

        this.examService = ExamService.instance;
    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.setState({examId});
        fetch(`http://localhost:8080/api/exam/${examId}`)
            .then(response => (response.json()))
            .then(exam => this.setState({exam}))
        this.findAllQuestionsForExam(examId);
    }
    componentDidUpdate() {
        if (this.state.changed) {
            this.findAllQuestionsForExam(this.state.examId);
        }
        this.state.changed = false;
    }

    setQuestions(questions) {
        this.setState({questions: questions});
    }

    onUpdate(questionType) {
        this.setState({questionType})
    }

    addQuestion(event) {
        this.examService
            .addQuestion(this.state.examId, this.state.questionType)
            .then(() => this.findAllQuestionsForExam(this.state.examId));
    }
    titleChanged(title) {
        this.setState({exam: {...this.state.exam, title: title}});
    }
    descriptionChanged(description) {
        this.setState({exam: {...this.state.exam, description: description}});
    }

    saveExam(exam) {
        this.examService
            .saveExam(exam)
            .then(response => this.setState({exam: response}))
    }

    findAllQuestionsForExam(examId) {
        this.examService
            .findAllQuestionsForExam(examId)
            .then(questions => {this.setQuestions(questions)});
    }
    questionIcon(type) {
        switch (type) {
            case 'choice':
                return 'list';
            case 'blanks':
                return 'code';
            case 'truefalse':
                return 'check';
            case 'essay':
                return 'subject';
            default:
                return '';
        }
    }

    renderQuestions(questions) {
        if (questions.length > 0) {
            return this.state.questions.map((question,index) =>
                <ListItem
                    key={index}
                    leftIcon={{name: this.questionIcon(question.type)}}
                    subtitle={question.subtitle}
                    title={question.title}
                    onPress={() => this.props.navigation
                    .navigate("QuestionWidget", {
                        changed: this.state.changed,
                        questionType: question.type,
                        questionId: question.id,
                        examId: this.state.examId,
                        onRefreshQuestion: this.onRefreshQuestion.bind(this)})}
                />
            )
        }
    }

    onRefreshQuestion(newQuestion) {
        const questions = this.state.questions.map(question => {
            if (question.id === newQuestion.id) {
                question.title = newQuestion.title;
                question.description = newQuestion.description;
                question.points = newQuestion.points;
            }
        })
        this.setState(questions);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <FormLabel>Title</FormLabel>
                    <TextInput style={styles.formControl} onChangeText={title => this.titleChanged(title)} value={this.state.exam.title}/>
                    <FormValidationMessage>Title is required</FormValidationMessage>
                    <FormLabel>Description</FormLabel>
                    <TextInput style={styles.formControl} onChangeText={description => this.descriptionChanged(description)} value={this.state.exam.description}/>
                    <FormValidationMessage>Description is required</FormValidationMessage>
                </View>
                <View>
                    <Text style={{borderBottomWidth: 1, borderStyle: "solid", marginLeft: 10, marginRight: 10}} h4>Preview</Text>
                    <Divider style={{backgroundColor: '#d6d7da', marginLeft: 10, marginRight: 10}}/>
                    <Text style={{fontSize: 25, marginBottom: 5, marginLeft: 20, marginRight: 20}}>{this.state.exam.title}</Text>
                    <Text style={{marginLeft: 20, marginRight: 20}}>{this.state.exam.description}</Text>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        {this.renderQuestions(this.state.questions)}
                    </View>
                    <QuestionTypePicker onUpdate={this.onUpdate}/>
                    <Button buttonStyle={{borderRadius: 5, marginLeft: 5, marginRight: 5}} title="Add New Question" onPress={this.addQuestion}/>
                    <View style={{flexDirection: "row"}}>
                        <Button buttonStyle={styles.button} style={{left: 5, marginTop: 10, marginBottom: 10}} textStyle={{fontSize: 15, fontWeight: 'bold'}} title="Cancel" backgroundColor="red" color="white"
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}/>
                        <Button buttonStyle={styles.button} style={{right: 20, marginTop: 10, marginBottom: 10}} textStyle={{fontSize: 15, fontWeight: 'bold'}} title="Submit" backgroundColor="blue" color="white"
                                onPress={() => {
                                    this.saveExam(this.state.exam)
                                    const onRefreshExam = this.props.navigation.getParam("onRefreshExam");
                                    onRefreshExam(this.state.exam);
                                    this.props.navigation.goBack()}
                                }/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default ExamWidget