import React, { Component } from 'react'
import {View, Text} from 'react-native'
import {ListItem, Icon, Button} from 'react-native-elements'

class ExamItem extends Component {
    static navigationOptions = {title: 'Exams'}
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ListItem
                    onPress={() => this.props.navigation
                        .navigate("ExamWidget", {examId: this.props.exam.id, onRefreshExam: this.props.onRefreshExam})}
                    subtitle={this.props.exam.description}
                    title={this.props.exam.title}/>
                <Button buttonStyle={{margin: 5, borderRadius: 5}} title="delete" backgroundColor="red" color="white"
                        onPress={() => this.props.delete(this.props.exam.id)}/>
            </View>
        );
    }
}

export default ExamItem;