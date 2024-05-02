import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from "react-native-vector-icons/AntDesign";

const AdminHomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Yönetici Kontrol Paneli</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AdminEmployee')}>
                <Icon name="user" size={20} style={{ marginRight: 5, color: "#fff"}} />
                <Text style={styles.buttonTitle}>Çalışanlar Yönetimi</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AdminReports')}>
                <Icon name="barschart" size={20} style={{ marginRight: 5, color: "#fff"}} />
                <Text style={styles.buttonTitle}>Mola Raporu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminHomeScreen;
