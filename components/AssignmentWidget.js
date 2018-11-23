import React, {Component} from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Text, FormLabel, FormValidationMessage, Button, Divider } from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import styles from "../styles/styles";

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'AssignmentWidget'}
    constructor(props) {
        super(props);
        this.state = {
            assignmentId: '',
            assignment: {}
        }
        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.pointsChanged = this.pointsChanged.bind(this);

        this.assignmentService = AssignmentService.instance;
    }
    componentDidMount() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId")
        this.setState({assignmentId: assignmentId});
        fetch(`http://localhost:8080/api/assignment/${assignmentId}`)
            .then(response => (response.json()))
            .then(assignment => this.setState({assignment}))
    }
    titleChanged(title) {
        this.setState({assignment: {...this.state.assignment, title: title}});
    }
    descriptionChanged(description) {
        this.setState({assignment: {...this.state.assignment, description: description}});
    }
    pointsChanged(points) {
        this.setState({assignment: {...this.state.assignment, points: points}});
    }

    saveAssignment(assignment) {
        this.assignmentService
            .saveAssignment(assignment)
            .then(response => this.setState({assignment: response}))
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FormLabel>Title</FormLabel>
                <TextInput style={styles.formControl} onChangeText={title => this.titleChanged(title)} value={this.state.assignment.title}/>
                <FormValidationMessage>Title is required</FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <TextInput style={styles.formControl} onChangeText={description => this.descriptionChanged(description)} value={this.state.assignment.description}/>
                <FormValidationMessage>Description is required</FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <TextInput style={styles.formControl} onChangeText={points => this.pointsChanged(points)} value={this.state.assignment.points}/>
                <FormValidationMessage>Points is required</FormValidationMessage>

                <Text style={{borderBottomWidth: 1, borderStyle: "solid", marginLeft: 10, marginRight: 10}} h4>Preview</Text>
                <Divider style={{backgroundColor: '#d6d7da', marginLeft: 10, marginRight: 10}}/>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
                    <Text style={{fontSize: 25}}>{this.state.assignment.title}</Text>
                    <Text style={{fontSize: 25}}>{this.state.assignment.points}pts</Text>
                </View>
                <Text style={{marginLeft: 20, marginRight: 20}}>{this.state.assignment.description}</Text>
                <FormLabel>Essay answer</FormLabel>
                <TextInput
                    style={[styles.formControl, {height: 100}]}
                    multiline={true}
                    numberOfLines={5}
                />
                <FormLabel>Upload a file</FormLabel>
                <View style={{flexDirection: 'row', height: 40, borderWidth: 1, borderStyle: 'solid', borderColor: '#ced4da', marginLeft: 20, marginRight: 20, backgroundColor: "white", paddingLeft: 5, paddingTop: 4}}>
                    <Button style={styles.button} backgroundColor="#F0F8FF"
                            textStyle={{
                                fontSize: 12
                            }}
                        buttonStyle={{
                            padding: 5,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: 80,
                            borderColor: "#B8B8B8",
                            height: 30,
                            right: 15
                        }}
                    color="black"
                    title="Choose File"/>
                    <Text style={{
                        fontSize: 15,
                        right: 20,
                        top: 5
                    }}>No file chosen</Text>
                </View>
                <FormLabel>Submit a link</FormLabel>
                <TextInput style={styles.formControl}/>
                <View style={{flexDirection: "row"}}>
                    <Button buttonStyle={styles.button} style={{left: 5, marginTop: 10, marginBottom: 10}} textStyle={{fontSize: 15, fontWeight: 'bold'}} title="Cancel" backgroundColor="red" color="white"
                            onPress={() => this.props.navigation.goBack()}/>
                    <Button buttonStyle={styles.button} style={{right: 20, marginTop: 10, marginBottom: 10}} textStyle={{fontSize: 15, fontWeight: 'bold'}} title="Submit" backgroundColor="blue" color="white"
                            onPress={() => {
                                this.saveAssignment(this.state.assignment)
                                const onRefreshAssignment = this.props.navigation.getParam("onRefreshAssignment");
                                onRefreshAssignment(this.state.assignment);
                                this.props.navigation.goBack()}
                            }/>
                </View>
            </ScrollView>
        )
    }
}

export default AssignmentWidget