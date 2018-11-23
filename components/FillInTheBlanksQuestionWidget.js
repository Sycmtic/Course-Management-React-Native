import React, {Component} from 'react'
import { StyleSheet, TextInput, View, StatusBar, ScrollView } from 'react-native';
import { Divider, Text, Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import QuestionService from '../services/QuestionService'
import styles from '../styles/styles'

class FillInTheBlanksQuestionWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            question: {},
            blank: ''
        }

        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.pointsChanged = this.pointsChanged.bind(this);
        this.blankChanged = this.blankChanged.bind(this);
        this.addBlank = this.addBlank.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);

        this.questionService = QuestionService.instance;
    }
    componentDidMount() {
        this.setState({examId: this.props.examId});
        if (this.props.question.blanks === undefined || this.props.question.blanks === null) {
            this.setState({question: {...this.props.question, blanks: []}});
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
    blankChanged(blanks) {
        this.setState({blank: blanks});
    }
    addBlank() {
        this.setState({question: {...this.state.question, blanks: [...this.state.question.blanks, this.state.blank]}})
        this.setState({blank: ''});
    }
    renderBlanks() {
        if (this.state.question.blanks && this.state.question.blanks.length > 0) {
            return this.state.question.blanks.map((blank, index) => {
                let left = '', right = '', meet = false
                for (let i = 0; i < blank.length; i++) {
                    if (!meet && blank[i] !== '[') {
                        left += blank[i];
                    } else if (blank[i] === '[') {
                        while (blank[i] !== ']' && i < blank.length) i++;
                        meet = true;
                    } else {
                        right += blank[i];
                    }
                }
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}} key={index}>
                        <Text>{left}</Text>
                        <TextInput
                            style={{borderRadius: 5, borderWidth: 1, borderColor: '#ededed', width: '80%'}}
                            backgroundColor="white"
                            multiline={true}
                        />
                        <Text>{right}</Text>
                    </View>
                )
            })
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
                <FormLabel>Blank</FormLabel>
                <TextInput style={styles.formControl} onChangeText={blank => this.blankChanged(blank)} value={this.state.blank}/>
                <FormValidationMessage>e.g. 2 + 2 = [four=4]</FormValidationMessage>
                <Button buttonStyle={{borderRadius: 5, marginLeft: 5, marginRight: 5}} title="Add New Blank" onPress={() => this.addBlank()}/>

                <View>
                    <Text style={{borderBottomWidth: 1, borderStyle: "solid", marginLeft: 10, marginRight: 10}} h4>Preview</Text>
                    <Divider style={{backgroundColor: '#d6d7da', marginLeft: 10, marginRight: 10}}/>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
                        <Text style={{fontSize: 25}}>{this.state.question.title}</Text>
                        <Text style={{fontSize: 25}}>{this.state.question.points}pts</Text>
                    </View>
                    <Text style={{marginLeft: 20, marginRight: 20}}>{this.state.question.description}</Text>

                    <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, padding: 10, borderWidth: 1, borderRadius: 3, borderColor: '#ededed'}}>
                        {this.renderBlanks()}
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
export default FillInTheBlanksQuestionWidget