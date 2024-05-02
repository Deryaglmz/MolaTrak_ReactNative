// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: 'rgba(126,213,111,0.8)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    warningButton: {
        backgroundColor: '#bf3434',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    listItem: {
        backgroundColor: '#f8f9fa',
        marginBottom: 10,
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    listItemText: {
        fontSize: 14,
    },
    sectionHeader: {
        backgroundColor: '#4F6D7A',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 10
    },
    timerText: {
        color: '#D64550',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
