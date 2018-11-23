import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import ExamWidget from './components/ExamWidget'
import AssignmentWidget from './components/AssignmentWidget'
import ExamItem from './elements/ExamItem'
import QuestionWidget from './components/QuestionWidget'
import EssayQuestionWidget from './components/EssayQuestionWidget'
import TrueOrFalseQuestionWidget from './components/TrueOrFalseQuestionWidget'
import MultipleChoiceQuestionWidget from './components/MultipleChoiceQuestionWidget'

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />
                <Button title="Exams"
                        onPress={() => this.props.navigation
                            .navigate('Exam') } />
                <Button title="Go to Assignment"
                        onPress={() => this.props.navigation
                            .navigate('Assignment') } />
            </ScrollView>
        )
    }
}

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    ExamItem,
    ExamWidget,
    AssignmentWidget,
    QuestionWidget,
    EssayQuestionWidget,
    TrueOrFalseQuestionWidget,
    MultipleChoiceQuestionWidget,
});

export default App;