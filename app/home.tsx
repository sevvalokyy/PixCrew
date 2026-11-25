import { BricolageGrotesque_700Bold, useFonts } from '@expo-google-fonts/bricolage-grotesque';
import { Onest_400Regular, Onest_500Medium } from '@expo-google-fonts/onest';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getCurrentUser, signOut } from '../services/auth';
import { createGroup, listMyGroups, type Group } from '../services/groups';

export default function HomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({ BricolageGrotesque_700Bold, Onest_400Regular, Onest_500Medium });

  const loadGroups = useCallback(async () => {
    setGroups(await listMyGroups());
  }, []);

  useEffect(() => {
    getCurrentUser().then((user) => setEmail(user?.email ?? null));
    loadGroups();
  }, [loadGroups]);

  async function handleCreateGroup() {
    if (!groupName.trim()) {
      Alert.alert('Eksik bilgi', 'Grup adı gerekli.');
      return;
    }
    setLoading(true);
    const { error } = await createGroup(groupName);
    setLoading(false);
    if (error) {
      Alert.alert('Hata', error);
      return;
    }
    setGroupName('');
    loadGroups();
  }

  async function handleSignOut() {
    await signOut();
    router.replace('/');
  }

  if (!fontsLoaded) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#0f0a1a', '#1a0f2a', '#3d1f0a']} locations={[0, 0.55, 1]} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Text style={styles.hi}>PixCrew</Text>
        <Text style={styles.email}>{email ?? '...'}</Text>

        <Text style={styles.section}>Yeni grup</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Örn: Büyükada '25"
            placeholderTextColor="#6a5a72"
          />
          <Pressable style={styles.addBtn} onPress={handleCreateGroup} disabled={loading}>
            <Text style={styles.addBtnText}>{loading ? '...' : 'Oluştur'}</Text>
          </Pressable>
        </View>

        <Text style={styles.section}>Gruplarım</Text>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.empty}>Henüz grup yok. İlk grubunu oluştur.</Text>}
          renderItem={({ item }) => (
            <View style={styles.groupCard}>
              <Text style={styles.groupName}>{item.name}</Text>
            </View>
          )}
        />

        <Pressable style={styles.signOut} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Çıkış yap</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0a1a' },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 80 },
  hi: { fontFamily: 'BricolageGrotesque_700Bold', fontSize: 36, color: '#fff5ee' },
  email: { fontFamily: 'Onest_400Regular', fontSize: 14, color: '#ff9a3c', marginTop: 4 },
  section: { fontFamily: 'Onest_500Medium', fontSize: 13, color: '#b8a0c0', marginTop: 32, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  row: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1, fontFamily: 'Onest_400Regular', fontSize: 16, color: '#fff5ee',
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
  },
  addBtn: { backgroundColor: '#ff9a3c', borderRadius: 12, paddingHorizontal: 20, justifyContent: 'center' },
  addBtnText: { fontFamily: 'Onest_500Medium', color: '#1a0f2a', fontSize: 15 },
  empty: { fontFamily: 'Onest_400Regular', fontSize: 14, color: '#8a7080', marginTop: 8 },
  groupCard: {
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14, padding: 18, marginBottom: 10,
  },
  groupName: { fontFamily: 'Onest_500Medium', fontSize: 17, color: '#fff5ee' },
  signOut: { alignItems: 'center', paddingVertical: 20 },
  signOutText: { fontFamily: 'Onest_400Regular', color: '#fff5ee', fontSize: 14, opacity: 0.7 },
});