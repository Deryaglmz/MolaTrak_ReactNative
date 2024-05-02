import Icon from "react-native-vector-icons/AntDesign";
import {Text, View} from "react-native";

const AboutButton = ({ label })  => {
    return (
        <View style={{ display: "flex", flexDirection:"row", alignItems: "center", marginRight: 20, padding: 5, backgroundColor: "#fff", borderRadius: 20 }}>
            <Icon name="infocirlceo" size={20} style={{color: "#4F6D7A"}} />
            {label && ( <Text style={{ color: "#bf3434", marginLeft: 5 }}>{ label }</Text> )}
        </View>
    );
}

export default AboutButton;