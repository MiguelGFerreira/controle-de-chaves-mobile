import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import SignatureCanvas from 'react-native-signature-canvas';

export default function SignatureScreen() {
  const [signature, setSignature] = useState<string | null>(null);

  // Função para pegar a assinatura gerada
  const handleSignature = (signature: string) => {
    setSignature(signature);
  };

  // Função para limpar a assinatura
  const handleClear = () => {
    setSignature(null);
  };

  // Função para salvar a assinatura ou fazer algo com ela
  const handleSave = () => {
    if (signature) {
      Alert.alert('Assinatura salva', signature);
    } else {
      Alert.alert('Erro', 'Por favor, forneça uma assinatura.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Assine abaixo</Text>
      {/* Componente para capturar a assinatura */}
      <SignatureCanvas
        onOK={handleSignature} // Quando o usuário terminar de assinar
        onClear={handleClear} // Quando o usuário limpar a assinatura
        backgroundColor="white"
        penColor="black"
        minWidth={2}
        maxWidth={5}
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Salvar" onPress={handleSave} />
        <Button title="Limpar" onPress={handleClear} />
      </View>

      {/* Exibe a assinatura em base64, se houver */}
      {signature && (
        <View style={{ marginTop: 20 }}>
          <Text>Assinatura em Base64:</Text>
          <Text>{signature}</Text>
        </View>
      )}
    </View>
  );
}
