import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    screenContainer: {
        flex: 1,
        padding: 20,
    },
    welcome: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer2: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        width: 250,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#4F6D7A',
        width: 90,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
        alignSelf: "flex-start",
        width: '100%',
        overflow: 'scroll',
        maxHeight: '80%'
    },
    entityContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap:'wrap',
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityContainer2: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        marginTop: 16,
        borderBottomColor: '#cccccc',
    },
    entityText: {
        fontSize: 20,
        color: '#333333',
        marginLeft: 15,
        marginRight: 15
    },
    deleteButton:{
        borderRadius: 5,
        backgroundColor: 'orangered',
        padding: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    updateButton:{
        borderRadius: 5,
        backgroundColor: 'royalblue',
        padding: 10,
        alignItems: "center",
        justifyContent: 'center',
        marginRight: 10,
    },
})