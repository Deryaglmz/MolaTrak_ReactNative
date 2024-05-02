import React, { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import styles from "./styles";
import {fetchUserRole} from "../../firebase/checkAccess";

export default function LoadScreen({ navigation }) {
    useEffect(() => {
        const checkAuthAndRole = async () => {
            const { isAuthenticated, isAdmin } = await fetchUserRole();
            if (!isAuthenticated) {
                navigation.replace('PreLogin');
                return;
            }
            if (isAdmin) {
                navigation.replace('AdminHome');
            } else {
                navigation.replace('EmployeeHome');
            }
        };

        checkAuthAndRole();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Yükleniyor...</Text>
        </View>
    );
}
