import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "white"
    },
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    formControl: {
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        fontSize: 15,
        color: "#495057",
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ced4da',
        borderRadius: 5,
        height: 40
    },
    button: {
        justifyContent: 'flex-start',
        width: 80,
        height: 40,
        borderRadius: 5
    },
    activeTitle: {
        color: 'red',
    },
});

export default styles;