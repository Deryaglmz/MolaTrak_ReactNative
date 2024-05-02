import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        textAlign: "center",
        fontSize: 27,
        fontWeight: "700",
        color: "#fff",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#4F6D7A",
        alignSelf: "center"
    },
    sectionHeader: {
        backgroundColor: '#4F6D7A',
        color: 'white',
        fontSize: 20,
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f8f9fa',
        borderColor: '#ddd',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemText: {
        fontSize: 16
    },
    screenContainer: {
        flex: 1,
        padding: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#4F6D7A',
        width: 90,
        alignItems: "center",
        justifyContent: 'center',
        marginRight: 10,
    },
    userName: {
        textTransform: "capitalize"
    },
    hours: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    hoursText: {
        fontWeight: "bold"
    }
});

export default styles;
