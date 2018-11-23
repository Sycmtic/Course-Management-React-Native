import React, {Component} from 'react'
import { TextInput, View, ScrollView } from 'react-native';
import { Text, Button, Divider, FormLabel, FormValidationMessage} from 'react-native-elements'
import QuestionService from '../services/QuestionService'
import styles from '../styles/styles'

class EssayQuestionWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            question: {}
        }

        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.pointsChanged = this.pointsChanged.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);

        this.questionService = QuestionService.instance;
    }
    componentDidMount() {
        this.setState({examId: this.props.examId});
        this.setState({question: this.props.question});
    }

    titleChanged(title) {
        this.setState({question: {...this.state.question, title: title}});
    }
    descriptionChanged(description) {
        this.setState({question: {...this.state.question, description: description}});
    }
    pointsChanged(points) {
        this.setState({question: {...this.state.question, points: points}});
    }

    saveQuestion(question) {
        this.questionService
            .saveQuestion(question)
            .then(response => this.setState({question: response}))
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FormLabel>Title</FormLabel>
                <TextInput style={styles.formControl} onChangeText={title => this.titleChanged(title)} value={this.state.question.title}/>
                <FormValidationMessage>Title is required</FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <TextInput style={styles.formControl} onChangeText={description => this.descriptionChanged(description)} value={this.state.question.description}/>
                <FormValidationMessage>Description is required</FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <TextInput style={styles.formControl} onChangeText={points => this.pointsChanged(points)} value={this.state.question.points}/>
                <FormValidationMessage>Points is required</FormValidationMessage>

                <View>
                    <Text style={{borderBottomWidth: 1, borderStyle: "solid", marginLeft: 10, marginRight: 10}} h4>Preview</Text>
                    <Divider style={{backgroundColor: '#d6d7da', marginLeft: 10, marginRight: 10}}/>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
                        <Text style={{fontSize: 25}}>{this.state.question.title}</Text>
                        <Text style={{fontSize: 25}}>{this.state.question.points}pts</Text>
                    </View>
                    <Text style={{marginLeft: 20, marginRight: 20}}>{this.state.question.description}</Text>

                    <FormLabel>Essay</FormLabel>
                    <TextInput
                        style={[styles.formControl, {height: 100}]}
                        multiline={true}
                        numberOfLines={5}
                    />
                    <View style={{flexDirection: "row"}}>
                        <Button buttonStyle={styles.button} style={{left: 5, marginTop: 10, marginBottom: 10}} textStyle={{fontSize: 15, fontWeight: 'bold'}} title="Cancel" backgroundColor="red" color="white"
                                onPress={() => this.props.navigation.goBack()}/>
                        <Button buttonStyle={styles.button} style={{right: 20, marginTop: 10, marginBottom: 10}} textStyle={{fontSize: 15, fontWeight: 'bold'}} title="Submit" backgroundColor="blue" color="white"
                                onPress={() => {
                                    this.saveQuestion(this.state.question)
                                    const onRefreshQuestion = this.props.navigation.getParam("onRefreshQuestion")
                                    onRefreshQuestion(this.state.question);
                                    this.props.navigation.goBack()}
                                }/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default EssayQuestionWidget