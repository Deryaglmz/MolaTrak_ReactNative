// Imports 
import React, { useState } from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { db, auth } from '../../firebase/config';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


// Login screen component
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPress = async () => {
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                {/* App logo */}
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />

                <Text style={styles.title}>MolaTrak</Text>
                <Text style={styles.subtitle}>Oturum aç</Text>

                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Şifre'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* Login button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Oturum aç</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}