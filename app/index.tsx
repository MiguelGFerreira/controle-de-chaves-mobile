import { Link } from "expo-router";
import { Text, View, SafeAreaView } from "react-native";
import "../global.css"

export default function Index() {
  return (
    <SafeAreaView className="lajota justify-center">
      <Text className="texto-titulo">Controle de Chaves</Text>

      <View className="space-y-4 gap-4">
        <Link href='/emprestimo' className="botao">
          <Text className="texto-botao">Empréstimo de Chaves</Text>
        </Link>

        <Link href='/devolucao' className="botao">
          <Text className="texto-botao">Devolução de Chaves</Text>
        </Link>

        <Link href='/armarios' className="botao">
          <Text className="texto-botao">Chaves dos Armários</Text>
        </Link>

        <Link href='/segundaVia' className="botao">
          <Text className="texto-botao">Segunda Via de Chaves</Text>
        </Link>

        <Link href='/devolverSegundaVia' className="botao">
          <Text className="texto-botao">Devolver Segunda Via</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
