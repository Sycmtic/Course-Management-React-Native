import React, {Component} from 'react'
import { TextInput, View, StatusBar, ScrollView } from 'react-native';
import { Text, Divider, Button, Icon, FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements'
import QuestionService from '../services/QuestionService'
import styles from '../styles/styles'

class MultipleChoiceQuestionWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            question: {},
            text: ''
        }

        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.pointsChanged = this.pointsChanged.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.checked = this.checked.bind(this);
        this.isChecked = this.isChecked.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);

        this.questionService = QuestionService.instance;
    }
    componentDidMount() {
        this.setState({examId: this.props.examId});
        if (this.props.question.options === undefined || this.props.question.options === null) {
            this.setState({question: {...this.props.question, options: []}});
        } else {
            this.setState({question: this.props.question});
        }
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
    textChanged(text) {
        this.setState({text: text});
    }
    addChoice() {
        this.setState({question: {...this.state.question, options: [...this.state.question.options, this.state.text]}})
        this.setState({text: ''});
    }
    deleteChoice(index) {
        this.setState({
            question: {...this.state.question, correctOption: '', options: this.state.question.options.filter((value, i) => i !== index)}
        });
    }
    isChecked(index) {
        if (index === this.state.question.correctOption) {
            return true;
        } else {
            return false;
        }
    }
    checked(index) {
        this.setState({question: {...this.state.question, correctOption: index}});
    }
    renderChoices() {
        if (this.state.question.options && this.state.question.options.length > 0) {
            return this.state.question.options.map((option, index) =>
                <View key={index} style={{flexDirection: "row", justifyContent:'space-between', margin: 5, padding: 10, borderWidth: 1, borderRadius: 3, backgroundColor: '#fafafa', borderColor: '#ededed'}}>
                    <CheckBox
                        containerStyle={{margin: 0, marginLeft: 0, marginRight: 0, padding: 0, borderWidth: 0, borderColor: '#fafafa'}}
                        left
                        title={option}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        onPress={() => this.checked(index)}
                        checked={this.isChecked(index)}/>
                    <Icon
                        name='delete'
                        type='feather'
                        color='red'
                        onPress={() => this.deleteChoice(index)}/>
                </View>
            )
        }
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
                <FormLabel>Choice Text</FormLabel>
                <TextInput style={styles.formControl} onChangeText={text => this.textChanged(text)} value={this.state.text}/>
                <Button buttonStyle={{borderRadius: 5, marginLeft: 5, marginRight: 5}} title="Add Choice" onPress={() => this.addChoice()}/>

                <View>
                    <Text style={{borderBottomWidth: 1, borderStyle: "solid", marginLeft: 10, marginRight: 10}} h4>Preview</Text>
                    <Divider style={{backgroundColor: '#d6d7da', marginLeft: 10, marginRight: 10}}/>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
                        <Text style={{fontSize: 25}}>{this.state.question.title}</Text>
                        <Text style={{fontSize: 25}}>{this.state.question.points}pts</Text>
                    </View>
                    <Text style={{marginLeft: 20, marginRight: 20}}>{this.state.question.description}</Text>

                    <View style={{marginLeft: 15, marginRight: 15}}>
                        {this.renderChoices()}
                    </View>
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
export default MultipleChoiceQuestionWidget