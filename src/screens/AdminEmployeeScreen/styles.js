import {StyleSheet} from "react-native";

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
    item: {
        display: "flex",
        backgroundColor: '#4F6D7A',
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderRadius: 5
    },
    title: {
        fontSize: 16,
        color: "#fff",
        marginHorizontal: 10,
        textTransform: "capitalize"
    },
    actionBtns: {
        display: "flex",
        flexDirection: 'row',
        height: "100%",
    },
    breaksBtn: {
        backgroundColor: "rgba(239,230,221,0.4)",
        justifyContent: 'center',
        width: 60
    },
    breaksBtnText: {
        color: "#fff",
        textAlign: "center",
    },
    addBtn: {
        backgroundColor: "#4F6D7A",
        padding: 20
    },
    addBtnText: {
        color: "#fff",
        textAlign: "center",
    },
    editBtn: {
        backgroundColor: "#e5a05b",
        justifyContent: 'center',
        width: 60
    },
    editBtnText: {
        color: "#fff",
        textAlign: "center",
    },
    deleteBtn: {
        backgroundColor: "#bf3434",
        justifyContent: 'center',
        width: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    deleteBtnText: {
        color: "#fff",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // Set a fixed width for the modal
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#4F6D7A"
    },
    modalInput: {
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#dedede",
        borderRadius: 5,
        backgroundColor: '#f7f7f7'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },

});

export default styles;