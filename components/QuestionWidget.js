import React, {Component} from 'react'
import { StyleSheet, Text, View, StatusBar, ScrollView, TextInput } from 'react-native';
import {Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import MultipleChoiceQuestionWidget from './MultipleChoiceQuestionWidget'
import EssayQuestionWidget from './EssayQuestionWidget'
import TrueOrFalseQuestionWidget from './TrueOrFalseQuestionWidget'
import FillInTheBlanksQuestionWidget from './FillInTheBlanksQuestionWidget'

class QuestionWidget extends Component {
    static navigationOptions = {title: 'QuestionWidget'}
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            questionId: '',
            questionType: '',
            question: {}
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const questionId = navigation.getParam("questionId");
        const questionType = navigation.getParam("questionType");
        this.setState({examId});
        this.setState({questionId});
        this.setState({questionType});
        fetch(`http://localhost:8080/api/${questionType}/${questionId}`)
            .then(response => (response.json()))
            .then(question => this.setState({question}))
    }

    render() {
        return (
            <View>
                <View>
                    {this.state.question.type==='choice' && <MultipleChoiceQuestionWidget examId={this.state.examId} question={this.state.question} navigation={this.props.navigation}/>}
                    {this.state.question.type==='essay' && <EssayQuestionWidget examId={this.state.examId} question={this.state.question} navigation={this.props.navigation}/>}
                    {this.state.question.type==='truefalse' && <TrueOrFalseQuestionWidget examId={this.state.examId} question={this.state.question} navigation={this.props.navigation}/>}
                    {this.state.question.type==='blanks' && <FillInTheBlanksQuestionWidget examId={this.state.examId} question={this.state.question} navigation={this.props.navigation}/>}
                </View>
            </View>
        )
    }
}

export default QuestionWidget;