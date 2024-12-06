import { getChavesByArmario, getFuncionarios, getFuncionariosComPermissao, getPorteiros, postEmprestimo } from '@/api';
import { Chave, Funcionario, Porteiro } from '@/types';
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Alert, Modal, Pressable, View, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

import SignatureCanvas from 'react-native-signature-canvas';

const armariosData = [
  { label: 'Armário 1', value: '01' },
  { label: 'Armário 2', value: '02' },
  { label: 'Armário 3', value: '03' },
];

export default function EmprestimoScreen() {
  const [chaves, setChaves] = useState<Chave[]>([])
  const [porteiros, setPorteiros] = useState<Porteiro[]>([])
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [obs, setObs] = useState('')
  const navigation = useNavigation();

  {/*Propriedades das assinaturas (visibilidade do modal e valores das assinaturas preenchidas)*/ }
  const [keeperModalVisible, setKeeperModalVisible] = useState(false);
  const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [keeperSignature, setKeeperSignature] = useState<string | null>(null);
  const [employeeSignature, setEmployeeSignature] = useState<string | null>(null);

  {/*Propriedades de valores selecionados dos dropdown*/ }
  const [armarioSelecionado, setArmarioSelecionado] = useState('')
  const [chaveSelecionada, setChaveSelecionada] = useState<Chave>()
  const [porteiroSelecionado, setPorteiroSelecionado] = useState('')
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('')

  {/*Propriedades de foco dos dropdown*/ }
  const [focusArmario, setFocusArmario] = useState(false)
  const [focusChave, setFocusChave] = useState(false)
  const [focusPorteiro, setFocusPorteiro] = useState(false)
  const [focusFuncionario, setFocusFuncionario] = useState(false)


  const handleArmarioChange = async (value: string) => {
    const data = await getChavesByArmario(value);
    setChaves(data);
  }

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
    if (!employeeSignature || !keeperSignature) {
      Alert.alert("Favor preencher assinaturas");
      return
    }

    if (!chaveSelecionada) {
      Alert.alert("Escolher a chave")
      return
    }

    if (!porteiroSelecionado) {
      Alert.alert("Escolher porteiro")
      return
    }

    if (!funcionarioSelecionado) {
      Alert.alert("Escolher funcionario")
      return
    }
    
    Alert.alert(
			"Confirma o emprestimo?",
      `Emprestando a chave`,
			[
				// Does nothing but dismiss the dialog when tapped
				{
					text: "Não",
				},
				{
					text: "Sim",
					onPress: () => {
						postEmprestimo(employeeSignature!, keeperSignature!, armarioSelecionado+chaveSelecionada?.NUMERO, funcionarioSelecionado, obs, porteiroSelecionado)
            Alert.alert("Chave emprestada");
            navigation.goBack()
					},
				},
			]
		);
  }

  const fetchPorteiros = async () => {
    const data = await getPorteiros();
    setPorteiros(data);
  }

  const fetchFuncionarios = async () => {
    const data = await getFuncionarios();
    setFuncionarios(data);
  }

  const fetchFuncionarioComPermissao = async (armario: string, numero: string) => {
    const data = await getFuncionariosComPermissao(armario, numero);
    setFuncionarios(data);
  }

  useEffect(() => {
    fetchPorteiros();
    //fetchFuncionarios();
  }, [])

  return (
    <ScrollView>
      <SafeAreaView className="lajota">
        <View className='cabecalho'>
          <Text className='texto-cabecalho'>FQ-SPA-PPRSPA001-002 - Versão 04</Text>
          <Text className='texto-cabecalho'>Vigência: 22/02/2024</Text>
          <Text className="texto-titulo">Tela de Empréstimo de Chaves</Text>
        </View>

        <View className='selects'>
          <Text>Armário</Text>
          <Dropdown
            style={[styles.dropdown, focusArmario && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={armariosData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!focusArmario ? 'Selecione um Armário' : '...'}
            value={armarioSelecionado}
            onFocus={() => setFocusArmario(true)}
            onBlur={() => setFocusArmario(false)}
            onChange={item => {
              setArmarioSelecionado(item.value);
              setFocusArmario(false);
              handleArmarioChange(item.value);
            }}
          />

          <Text>N° Chave</Text>
          <Dropdown
            style={[styles.dropdown, focusChave && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={chaves}
            search
            maxHeight={300}
            labelField="DESCRIÇÃO"
            valueField="NUMERO"
            placeholder={!focusChave ? 'Select item' : '...'}
            searchPlaceholder="Pesquisar..."
            value={chaveSelecionada}
            onFocus={() => setFocusChave(true)}
            onBlur={() => setFocusChave(false)}
            onChange={item => {
              setChaveSelecionada(item);
              setFocusChave(false);
              item.RESTRITO === 'S' ? fetchFuncionarioComPermissao(armarioSelecionado, item.NUMERO) : fetchFuncionarios()
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

          <Text>Funcionário</Text>
          <Dropdown
            style={[styles.dropdown, focusFuncionario && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={funcionarios}
            search
            maxHeight={300}
            labelField="nome"
            valueField="matricula"
            placeholder={!focusFuncionario ? 'Select item' : '...'}
            searchPlaceholder="Pesquisar..."
            value={funcionarioSelecionado}
            onFocus={() => setFocusFuncionario(true)}
            onBlur={() => setFocusFuncionario(false)}
            onChange={item => {
              setFuncionarioSelecionado(item.matricula);
              setFocusFuncionario(false);
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

        <Text>Obs</Text>
        <TextInput onChangeText={setObs} value={obs} placeholder='Observações' className='border w-full mb-4' />

        <View className='secao-confirmar'>
          <Pressable
            className='botao'
            onPress={handleConfirm}>
            <Text className='texto-botao'>Confirmar</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </ScrollView>
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
