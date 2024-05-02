import { Image, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function PreLoginScreen({ navigation }) {
    const onLoginPress = () => {
        navigation.navigate('Login');
    };

    const onAdminSignupPress = () => {
        navigation.navigate('AdminRegistration');
    };

    const onEmpSignupPress = () => {
        navigation.navigate('EmployeeRegistration');
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    width={90}
                    height={90}
                    source={require('../../../assets/icon.png')}
                />

                <Text style={styles.title}>MolaTrak</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Oturum aç</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onAdminSignupPress()}>
                    <Text style={styles.buttonTitle}>Yönetici Kayıt Olun</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onEmpSignupPress()}>
                    <Text style={styles.buttonTitle}>Çalışan Kayıt Olun</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}