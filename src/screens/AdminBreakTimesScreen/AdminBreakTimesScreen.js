import React from 'react';
import { View } from 'react-native';
import styles from "./styles";
import BreakHistoryList from "../../components/Break/BreakHistoryList";

const AdminBreakTimesScreen = ({ route, navigation }) => {
    const { employee } = route.params;

    return (
        <View style={styles.screenContainer}> //view :konteyner oluşturmak için kullanılır
            {employee && (
                <>
                    <BreakHistoryList employee={employee} />
                </>
            )}
        </View>
    );
};

export default AdminBreakTimesScreen;
