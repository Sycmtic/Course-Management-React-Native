import React, { Component } from 'react'
import {View, Text} from 'react-native'
import {ListItem, Icon, Button} from 'react-native-elements'

class AssignmentItem extends Component {
    static navigationOptions = {title: 'Assignments'}
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ListItem
                    onPress={() => this.props.navigation
                        .navigate("AssignmentWidget", {assignmentId: this.props.assignment.id, onRefreshAssignment: this.props.onRefreshAssignment})}
                    subtitle={this.props.assignment.description}
                    title={this.props.assignment.title}/>
                <Button buttonStyle={{margin: 5, borderRadius: 5}} title="delete" backgroundColor="red" color="white"
                        onPress={() => this.props.delete(this.props.assignment.id)}/>
            </View>
        );
    }
}

export default AssignmentItem;