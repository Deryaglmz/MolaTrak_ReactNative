import React, { useState, useEffect } from 'react';
import { View, Text, SectionList } from 'react-native';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { styles } from './styles';

const BreakHistoryList = ({ employee }) => {
    const [groupedBreakHistory, setGroupedBreakHistory] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "breaks"), where("userId", "==", employee.id), orderBy("startTime", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const breaks = {};
            querySnapshot.forEach((doc) => {
                const breakData = { ...doc.data(), id: doc.id };

                const startDate = breakData.startTime.toDate();
                const formattedDate = startDate.toLocaleDateString('tr-TR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                if (!breaks[formattedDate]) {
                    breaks[formattedDate] = [];
                }
                breaks[formattedDate].push(breakData);
            });

            // Transform the object into an array of sections
            const groupedBreaks = Object.keys(breaks).map(date => ({ title: date, data: breaks[date] }));
            setGroupedBreakHistory(groupedBreaks);
        });
        return () => unsubscribe();
    }, [employee]);

    const renderBreakItem = ({ item }) => {
        const startTimeFormatted = item.startTime.toDate().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true // Use 12-hour format. Set to false for 24-hour format.
        });
        const endTimeFormatted = item.endTime ? item.endTime.toDate().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }) : <LiveTimer startTime={item.startTime} />;

        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>Başlangıç: {startTimeFormatted}</Text>
                <Text style={styles.listItemText}>Bitiş: {endTimeFormatted}</Text>
            </View>
        );
    };

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    // Component for displaying live timer for ongoing breaks
    const LiveTimer = ({ startTime }) => {
        const [timePassed, setTimePassed] = useState('');

        useEffect(() => {
            const interval = setInterval(() => {
                const now = new Date();
                const start = startTime.toDate();
                const difference = new Date(now - start);
                const formatted = `${difference.getUTCHours()}h ${difference.getUTCMinutes()}m ${difference.getUTCSeconds()}s`;
                setTimePassed(formatted);
            }, 1000);

            return () => clearInterval(interval);
        }, [startTime]);

        return <Text style={styles.timerText}>{timePassed}</Text>;
    };

    return (
        <SectionList
            sections={groupedBreakHistory}
            keyExtractor={(item, index) => item.id + index}
            renderItem={renderBreakItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={true}
        />
    );
};


export default BreakHistoryList;