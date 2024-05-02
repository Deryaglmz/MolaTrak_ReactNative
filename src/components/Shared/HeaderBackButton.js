import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const HeaderBackButton = ({ onPress, ...otherProps }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="arrowleft" size={24} color="white" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10 // Adjust as needed
    },
    buttonText: {
        color: 'white',
        marginLeft: 5
    }
});

export default HeaderBackButton;