import Icon from "react-native-vector-icons/AntDesign";
import {Text, View} from "react-native";

const LogoutButton = ({ label })  => {
    return (
        <View style={{ display: "flex", flexDirection:"row", alignItems: "center", marginRight: 10, padding: 5, backgroundColor: "#fff", borderRadius: 20 }}>
            <Icon name="logout" size={20} style={{ marginRight: 5, color: "#bf3434"}} />
            <Text style={{ color: "#bf3434" }}>{ label }</Text>
        </View>
    );
}

export default LogoutButton;