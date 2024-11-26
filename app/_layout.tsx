import { Stack } from "expo-router";
import "../global.css"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='emprestimo' options={{ title: 'Empréstimo' }} />
      <Stack.Screen name='devolucao' options={{ title: 'Devolução' }} />
      <Stack.Screen name='armarios' options={{ title: 'Armários' }} />
      <Stack.Screen name='segundaVia' options={{ title: 'Segunda Via' }} />
    </Stack>
  );
}
