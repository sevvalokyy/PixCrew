import { BricolageGrotesque_700Bold, useFonts } from '@expo-google-fonts/bricolage-grotesque';
import { Onest_400Regular, Onest_500Medium } from '@expo-google-fonts/onest';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_700Bold,
    Onest_400Regular,
    Onest_500Medium,
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0a1a', '#1a0f2a', '#3d1f0a']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.blob, styles.blobOne]} />
      <View style={[styles.blob, styles.blobTwo]} />

      <View style={styles.content}>
        <View style={styles.polaroid}>
          <View style={styles.photo} />
          <Text style={styles.polaroidCaption}>Büyükada '25</Text>
        </View>

        <Text style={styles.brand}>PixCrew</Text>
        <Text style={styles.subtitle}>
          The modern way to share travel memories
        </Text>

        <Pressable style={styles.button} onPress={() => router.push('/auth')}>
          <Text style={styles.buttonText}>Başla</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/auth')}>
          <Text style={styles.link}>Zaten hesabım var</Text>
        </Pressable>

        <Text style={styles.tagline}>ücretsiz · reklamsız · seninle</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0a1a', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  blob: { position: 'absolute', borderRadius: 9999 },
  blobOne: { width: 320, height: 320, backgroundColor: '#ff7a00', opacity: 0.30, top: -80, right: -100 },
  blobTwo: { width: 220, height: 220, backgroundColor: '#ff9a3c', opacity: 0.18, bottom: -40, left: -70 },
  content: { alignItems: 'center', paddingHorizontal: 32 },
  polaroid: {
    backgroundColor: '#fdfbf7', padding: 10, paddingBottom: 14, borderRadius: 4,
    marginBottom: 36, transform: [{ rotate: '-4deg' }],
    shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 10,
  },
  photo: { width: 150, height: 150, borderRadius: 2, backgroundColor: '#2a1f3d' },
  polaroidCaption: { fontFamily: 'Onest_500Medium', fontSize: 15, color: '#3a2850', textAlign: 'center', marginTop: 10 },
  brand: { fontFamily: 'BricolageGrotesque_700Bold', fontSize: 54, color: '#fff5ee', letterSpacing: -1.5 },
  subtitle: { fontFamily: 'Onest_400Regular', fontSize: 16, color: '#e8c8a0', textAlign: 'center', marginTop: 12, marginBottom: 48, lineHeight: 23 },
  button: { backgroundColor: '#ff9a3c', paddingVertical: 16, paddingHorizontal: 64, borderRadius: 30 },
  buttonText: { fontFamily: 'Onest_500Medium', color: '#1a0f2a', fontSize: 18 },
  link: { fontFamily: 'Onest_400Regular', color: '#fff5ee', fontSize: 15, marginTop: 20, opacity: 0.8 },
  tagline: { fontFamily: 'Onest_400Regular', color: '#8a7080', fontSize: 13, marginTop: 40, letterSpacing: 0.5 },
});