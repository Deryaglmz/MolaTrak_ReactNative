import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import getDoc and doc
import { auth, db } from "../../firebase/config"; // Ensure db is exported from your firebase config
import styles from './styles';
import BreakButton from "../../components/Break/BreakButton";
import BreakHistoryList from "../../components/Break/BreakHistoryList";
import {Divider} from "react-native-paper";

const EmployeeHomeScreen = () => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployeeDetails = async (uid) => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setEmployee({ uid, ...docSnap.data() });
            } else {
                console.log("Employee does not exist");
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchEmployeeDetails(user.uid);
            } else {
                setEmployee(null);
            }
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);

    if (!employee) {
        return <View style={styles.screenContainer}><Text>Yükleniyor...</Text></View>;
    }

    return (
        <View style={styles.screenContainer}>
            {employee && (
                <>
                    <Text style={styles.welcome}>Hoş geldin,{employee.fullName}</Text>
                    <Divider />
                    <BreakButton userId={employee.uid} />
                    <BreakHistoryList employee={employee} />
                </>
            )}
        </View>
    );
};

export default EmployeeHomeScreen;
