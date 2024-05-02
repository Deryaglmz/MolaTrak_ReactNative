import React, { useState, useEffect } from 'react';
import { View, Text, SectionList } from 'react-native';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";

const AdminReportsScreen = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            const usersSnapshot = await getDocs(collection(db, "users"));
            const users = {};
            usersSnapshot.forEach(doc => {
                users[doc.id] = doc.data().fullName || doc.data().email; // Assuming you want to display fullName or email as a fallback
            });

            const breaksSnapshot = await getDocs(query(collection(db, "breaks"), orderBy("startTime", "asc")));
            const breaksByMonth = {};

            breaksSnapshot.forEach(doc => {
                const { userId, startTime, endTime } = doc.data();
                if (!endTime) return; // Skip ongoing breaks

                const breakDuration = endTime.toDate() - startTime.toDate();
                const monthYear = startTime.toDate().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

                if (!breaksByMonth[monthYear]) {
                    breaksByMonth[monthYear] = {};
                }
                if (!breaksByMonth[monthYear][userId]) {
                    breaksByMonth[monthYear][userId] = 0;
                }
                breaksByMonth[monthYear][userId] += breakDuration;
            });

            // Transforming data for SectionList
            const reportData = Object.keys(breaksByMonth).map(monthYear => ({
                title: monthYear,
                data: Object.keys(breaksByMonth[monthYear]).map(userId => ({
                    userId,
                    userName: users[userId],
                    totalBreakTime: breaksByMonth[monthYear][userId]
                }))
            }));

            setReport(reportData);
        };

        fetchReport();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Rapor</Text>

            <SectionList
                sections={report}
                keyExtractor={(item, index) => item.userId + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.userName}>{item.userName}:</Text>
                        <View style={styles.hours}>
                            <Icon name="clockcircleo" size={15} style={{ marginRight: 5, color: "#4F6D7A"}} />
                            <Text style={styles.hoursText}>{(item.totalBreakTime / (1000 * 60 * 60)).toFixed(2)} saat</Text>
                        </View>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                stickySectionHeadersEnabled={true}
            />
        </View>
    );
};

export default AdminReportsScreen;
