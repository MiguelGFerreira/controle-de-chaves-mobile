import { getChavesByArmario } from '@/api';
import { Chave } from '@/types';
import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const armariosData = [
  { label: 'Armário 1', value: '01' },
  { label: 'Armário 2', value: '02' },
  { label: 'Armário 3', value: '03' },
];

const chaveData = [
  { label: 'Armário 1', value: '1' },
  { label: 'Armário 2', value: '2' },
  { label: 'Armário 3', value: '3' },
];

export default function EmprestimoScreen() {
  const [chaves, setChaves] = useState<Chave[]>([])
  const [armarioSelecionado, setArmarioSelecionado] = useState('');
  const [isFocusArmario, setIsFocusArmario] = useState(false);
  const [chaveSelecionada, setChaveSelecionada] = useState('');
  const [isFocusChave, setIsFocusChave] = useState(false);

  const handleArmarioChange = async (value: string) => {
    const data = await getChavesByArmario(value);
    setChaves(data);
  }

  return (
    <SafeAreaView className="lajota">
      <Text className='texto-cabecalho'>FQ-SPA-PPRSPA001-002 - Versão 04</Text>
      <Text className='texto-cabecalho'>Vigência: 22/02/2024</Text>
      <Text className="texto-titulo">Tela de Empréstimo de Chaves</Text>
      <Text>Armário</Text>
      <Dropdown
        style={[styles.dropdown, isFocusArmario && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={armariosData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusArmario ? 'Selecione um Armário' : '...'}
        value={armarioSelecionado}
        onFocus={() => setIsFocusArmario(true)}
        onBlur={() => setIsFocusArmario(false)}
        onChange={item => {
          setArmarioSelecionado(item.value);
          setIsFocusArmario(false);
          handleArmarioChange(item.value)
        }}
      />

      <Text>N° Chave</Text>
      <Dropdown
        style={[styles.dropdown, isFocusChave && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={chaves}
        search
        maxHeight={300}
        labelField="DESCRIÇÃO"
        valueField="NUMERO"
        placeholder={!isFocusChave ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={chaveSelecionada}
        onFocus={() => setIsFocusChave(true)}
        onBlur={() => setIsFocusChave(false)}
        onChange={item => {
          setChaveSelecionada(item.NUMERO);
          setIsFocusChave(false);
        }}
      />
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
