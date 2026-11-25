import { BricolageGrotesque_700Bold, useFonts } from '@expo-google-fonts/bricolage-grotesque';
import { Onest_400Regular, Onest_500Medium } from '@expo-google-fonts/onest';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { signIn, signUp } from '../services/auth';

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_700Bold,
    Onest_400Regular,
    Onest_500Medium,
  });
  if (!fontsLoaded) return <View style={styles.container} />;

  const isSignup = mode === 'signup';

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert('Eksik bilgi', 'E-posta ve şifre gerekli.');
      return;
    }
    if (isSignup) {
      const { error } = await signUp(email, password);
      if (error) { Alert.alert('Kayıt olunamadı', error.message); return; }
    } else {
      const { error } = await signIn(email, password);
      if (error) { Alert.alert('Giriş yapılamadı', error.message); return; }
    }
    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#0f0a1a', '#1a0f2a', '#3d1f0a']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.inner}>
          <Pressable onPress={() => router.back()} style={styles.back} hitSlop={12}>
            <Text style={styles.backText}>←</Text>
          </Pressable>

          <Text style={styles.title}>
            {isSignup ? 'Hesabını oluştur' : 'Tekrar hoş geldin'}
          </Text>
          <Text style={styles.subtitle}>
            {isSignup ? 'Anılarını ekibinle paylaşmaya başla' : 'Kaldığın yerden devam et'}
          </Text>

          <Text style={styles.label}>E-posta</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="ornek@mail.com"
            placeholderTextColor="#6a5a72"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#6a5a72"
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{isSignup ? 'Kayıt ol' : 'Giriş yap'}</Text>
          </Pressable>

          <Pressable onPress={() => setMode(isSignup ? 'login' : 'signup')} style={styles.toggle}>
            <Text style={styles.toggleText}>
              {isSignup ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0a1a' },
  flex: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  back: { position: 'absolute', top: 60, left: 24 },
  backText: { color: '#fff5ee', fontSize: 28 },
  title: { fontFamily: 'BricolageGrotesque_700Bold', fontSize: 32, color: '#fff5ee', letterSpacing: -1 },
  subtitle: { fontFamily: 'Onest_400Regular', fontSize: 15, color: '#e8c8a0', marginTop: 8, marginBottom: 36 },
  label: { fontFamily: 'Onest_500Medium', fontSize: 13, color: '#b8a0c0', marginBottom: 8, marginTop: 16 },
  input: {
    fontFamily: 'Onest_400Regular', fontSize: 16, color: '#fff5ee',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
  },
  button: { backgroundColor: '#ff9a3c', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 32 },
  buttonText: { fontFamily: 'Onest_500Medium', color: '#1a0f2a', fontSize: 18 },
  toggle: { alignItems: 'center', marginTop: 24 },
  toggleText: { fontFamily: 'Onest_400Regular', color: '#fff5ee', fontSize: 14, opacity: 0.8 },
});