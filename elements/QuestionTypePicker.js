import React, { Component } from 'react'
import {Picker, Text, View} from 'react-native'

class QuestionTypePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionType: ''
        }
    }

    render() {
        return (
            <View>
                <Picker
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({questionType: itemValue});
                        this.props.onUpdate(itemValue);
                    }}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="truefalse" label="True or false" />
                    <Picker.Item value="choice" label="Multiple choice" />
                    <Picker.Item value="blanks" label="Fill in the blanks" />
                    <Picker.Item value="essay" label="Essay" />
                </Picker>
            </View>
        )
    }
}

export default QuestionTypePicker