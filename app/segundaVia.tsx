import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Modal, View, Pressable, Alert } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import { Dropdown } from 'react-native-element-dropdown';
import { Armario, Porteiro } from '@/types';
import { getArmariosOcupados, getPorteiros, patchMovimentacaoArmario, postMovimentacaoSegundaVia } from '@/api';
import { useNavigation } from 'expo-router';

export default function SegundaViaScreen() {

  const [porteiros, setPorteiros] = useState<Porteiro[]>([])
  const [armarios, setArmarios] = useState<Armario[]>([])
  const navigation = useNavigation();

  {/*Propriedades das assinaturas (visibilidade do modal e valores das assinaturas preenchidas)*/ }
  const [keeperModalVisible, setKeeperModalVisible] = useState(false);
  const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [keeperSignature, setKeeperSignature] = useState<string | null>(null);
  const [employeeSignature, setEmployeeSignature] = useState<string | null>(null);

  {/*Propriedades dropdown*/ }
  const [porteiroSelecionado, setPorteiroSelecionado] = useState('');
  const [armarioSelecionado, setArmarioSelecionado] = useState('');
  const [focusPorteiro, setFocusPorteiro] = useState(false);
  const [focusArmario, setFocusArmario] = useState(false);

  const handleKeeperSignature = (signature: string) => {
    setKeeperSignature(signature);
    setKeeperModalVisible(!keeperModalVisible);
  };

  // Função para limpar a assinatura
  const handleKeeperClear = () => {
    setKeeperSignature(null);
  };

  const handleEmployeeSignature = (signature: string) => {
    setEmployeeSignature(signature);
    setEmployeeModalVisible(!employeeModalVisible);
  };

  // Função para limpar a assinatura
  const handleEmployeeClear = () => {
    setEmployeeSignature(null);
  };

  const handleConfirm = () => {
    if (!armarioSelecionado) {
      Alert.alert("Escolher um armario")
      return
    }

    if (!porteiroSelecionado) {
      Alert.alert("Selecionar um porteiro")
      return
    }

    if (!keeperSignature || !employeeSignature) {
      Alert.alert("Favor preencher as assinaturas")
      return
    }

    Alert.alert(
      "Confirma o emprestimo?",
      `Emprestando a segunda via da chave`,
      [
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            postMovimentacaoSegundaVia(armarioSelecionado, employeeSignature, keeperSignature, 1) // tipo_movimentacao = 1 significa que esta emprestando
            Alert.alert("Segunda via emprestada");
            navigation.goBack()
          },
        },
      ]
    );
  }

  const fetchArmarios = async () => {
    const data = await getArmariosOcupados();
    setArmarios(data);
  }

  const fetchPorteiros = async () => {
    const data = await getPorteiros();
    setPorteiros(data);
  }

  useEffect(() => {
    fetchArmarios();
    fetchPorteiros();
  }, [])

  return (
    <SafeAreaView className="lajota">
      <Text className="texto-titulo">Tela de Segunda Via</Text>

      <View className='selects'>
        <Text>Armário</Text>
        <Dropdown
          style={[styles.dropdown, focusArmario && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={armarios}
          search
          maxHeight={300}
          labelField="Armario"
          valueField="ID"
          placeholder={!focusArmario ? 'Select item' : '...'}
          searchPlaceholder='Pesquisar...'
          value={armarioSelecionado}
          onFocus={() => setFocusArmario(true)}
          onBlur={() => setFocusArmario(false)}
          onChange={item => {
            setArmarioSelecionado(item.ID);
            setFocusArmario(false);
          }}
        />

        <Text>Porteiro</Text>
        <Dropdown
          style={[styles.dropdown, focusPorteiro && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={porteiros}
          maxHeight={300}
          labelField="PORTEIRO"
          valueField="ID"
          placeholder={!focusPorteiro ? 'Select item' : '...'}
          value={porteiroSelecionado}
          onFocus={() => setFocusPorteiro(true)}
          onBlur={() => setFocusPorteiro(false)}
          onChange={item => {
            setPorteiroSelecionado(item.ID);
            setFocusPorteiro(false);
          }}
        />
      </View>

      <View className='secao-assinatura'>
        <Modal
          animationType='slide'
          transparent={true}
          visible={keeperModalVisible}
          onRequestClose={() => setKeeperModalVisible(!keeperModalVisible)}
        >
          <SignatureCanvas
            onOK={handleKeeperSignature} // Quando o usuário terminar de assinar
            onClear={handleKeeperClear} // Quando o usuário limpar a assinatura
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
          onPress={() => setKeeperModalVisible(true)}>
          <Text className='texto-botao'>Assinatura Porteiro</Text>
        </Pressable>

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
