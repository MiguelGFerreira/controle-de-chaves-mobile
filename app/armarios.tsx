import { getEmprestimosSemAssinatura, patchMovimentacaoArmario } from '@/api';
import { Emprestimos } from '@/types';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Modal, Pressable, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import SignatureCanvas from 'react-native-signature-canvas';

export default function ArmarioScreen() {

  const navigation = useNavigation();
  const [emprestimos, setEmprestimos] = useState<Emprestimos[]>([]);
  const [armarioSelecionado, setArmarioSelecionado] = useState('');
  const [focusArmario, setFocusArmario] = useState(false);
  const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [employeeSignature, setEmployeeSignature] = useState<string | null>(null);

  const handleEmployeeSignature = (signature: string) => {
    setEmployeeSignature(signature);
    setEmployeeModalVisible(!employeeModalVisible);
  };

  // Função para limpar a assinatura
  const handleEmployeeClear = () => {
    setEmployeeSignature(null);
  };

  const handleConfirm = () => {
    if (!employeeSignature) {
      Alert.alert("Favor preencher a assinatura do funcionario")
      return
    }
    Alert.alert(
      "Confirma o registro?",
      `Registrando a assinatura do funcionario`,
      [
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            patchMovimentacaoArmario(armarioSelecionado, employeeSignature)
            Alert.alert("Assinatura registrada");
            navigation.goBack()
          },
        },
      ]
    );
  }

  const fetchEmprestimos = async () => {
    const data = await getEmprestimosSemAssinatura()
    setEmprestimos(data);
  }

  useEffect(() => {
    fetchEmprestimos()
  }, [])

  return (
    <SafeAreaView className="lajota">
      <Text className="texto-titulo">Tela das Chaves dos Armários</Text>

      <View className='selects'>
        <Text>Armário</Text>
        <Dropdown
          style={[styles.dropdown, focusArmario && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={emprestimos}
          search
          maxHeight={300}
          labelField="Armario"
          valueField="ID"
          placeholder={!focusArmario ? 'Selecione um Armário' : '...'}
          searchPlaceholder="Pesquisar..."
          value={armarioSelecionado}
          onFocus={() => setFocusArmario(true)}
          onBlur={() => setFocusArmario(false)}
          onChange={item => {
            setArmarioSelecionado(item.ID);
            setFocusArmario(false);
          }}
        />
      </View>

      <View className='secao-termo'>
        <Text className='texto-termo'>Declaro que estou ciente e de acordo com as seguintes responsabilidades:</Text>
        <Text className='texto-termo'>1. Utilizar o armário de forma correta e adequada</Text>
        <Text className='texto-termo'>2. Guardar a chave do armário com segurança</Text>
        <Text className='texto-termo'>3. Informar imediatamente ao responsável pelo controle dos armários em caso de perda da chave</Text>
        <Text className='texto-termo'>4. Em caso de perda da chave, assinar a observação de retirada da chave reserva, fazer uma cópia da chave e devolver a chave reserva à portaria no prazo de 48h horas</Text>
      </View>

      <View className='secao-assinatura'>
        <Modal
          animationType='slide'
          transparent={true}
          visible={employeeModalVisible}
          onRequestClose={() => setEmployeeModalVisible(!employeeModalVisible)}
        >
          <SignatureCanvas
            onOK={handleEmployeeSignature} // Quando o usuário terminar de assinar
            onClear={handleEmployeeClear} // Quando o usuário limpar a assinatura
            backgroundColor="white"
            penColor="black"
            clearText='Limpar'
            confirmText='Confirmar'
            descriptionText='Assina acima'
            minWidth={2}
            maxWidth={5}
          />
        </Modal>
        <Pressable
          className='botao-assinatura'
          onPress={() => setEmployeeModalVisible(true)}>
          <Text className='texto-botao'>Assinatura Funcionário</Text>
        </Pressable>
      </View>

      <View className='secao-confirmar'>
        <Pressable
          className='botao'
          onPress={handleConfirm}>
          <Text className='texto-botao'>Confirmar</Text>
        </Pressable>
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
