// BreakButton.js
import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { collection, addDoc, query, where, orderBy, getDocs, updateDoc, doc } from "firebase/firestore";
import {db} from "../../firebase/config";
import { styles } from './styles';

const BreakButton = ({ userId }) => {
    const [onBreak, setOnBreak] = useState(false);

    useEffect(() => {
        const checkForOngoingBreak = async () => {
            const q = query(collection(db, "breaks"), where("userId", "==", userId), where("endTime", "==", null));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setOnBreak(true);
            }
        };

        checkForOngoingBreak();
    }, [userId]);

    const handleBreakToggle = async () => {
        if (!onBreak) {
            // Start a new break
            await addDoc(collection(db, "breaks"), {
                userId,
                startTime: new Date(),
                endTime: null,
            });
            setOnBreak(true);
        } else {
            // End the ongoing break
            const q = query(collection(db, "breaks"), where("userId", "==", userId), where("endTime", "==", null), orderBy("startTime", "desc"));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const breakDoc = querySnapshot.docs[0];
                await updateDoc(doc(db, "breaks", breakDoc.id), {
                    endTime: new Date(),
                });
            }
            setOnBreak(false);
        }
    };

    const buttonStyle = onBreak ? styles.warningButton : styles.primaryButton;

    return (
        <TouchableOpacity onPress={handleBreakToggle} style={buttonStyle}>
            <Text style={styles.buttonText}>{onBreak ? "Mola Bitir" : "Mola Başlat"}</Text>
        </TouchableOpacity>
    );
};

export default BreakButton;
