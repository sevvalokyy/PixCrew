import { Tabs } from 'expo-router';
import React from 'react';

// Şimdilik tek ekran (karşılama) var, bu yüzden alttaki sekme çubuğunu gizliyoruz.
// İleride ana uygulama sekmeleri (gruplar, profil) eklenince burada açılır.
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="index" options={{ title: 'PixCrew' }} />
    </Tabs>
  );
}
