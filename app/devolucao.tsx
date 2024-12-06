import { getDevolucoes } from '@/api';
import { DevolucaoItem } from '@/components/DevolucaoItem';
import { DevolucaoProps } from '@/types';
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, FlatList } from 'react-native';


export default function DevolucaoScreen() {
  const [devolucoes, setDevolucoes] = useState<DevolucaoProps[]>([])

  const fetchDevolucoes = async () => {
    const data = await getDevolucoes();
    setDevolucoes(data);
  }

  useEffect(() => {
    fetchDevolucoes()
  },[])

  return (
    <SafeAreaView className="lajota">
      <View className='cabecalho'>
        <Text className='texto-cabecalho'>FQ-SPA-PPRSPA001-002 - Versão 04</Text>
        <Text className='texto-cabecalho'>Vigência: 22/02/2024</Text>
        <Text className="texto-titulo">Tela de Devolução</Text>
      </View>

      <FlatList
        data={devolucoes}
        className='flatlist-container'
        renderItem={({item}) => (
          <DevolucaoItem
            ID={item.ID}
            DATA_ENTREGA={item.DATA_ENTREGA}
            DATA_DEVOLUCAO=''
            ID_CHAVE={item.ID_CHAVE}
            FUNCIONARIO={item.FUNCIONARIO}
            PORTEIRO={item.PORTEIRO}
          />
        )}
        keyExtractor={item => item.ID}
      />

    </SafeAreaView>
  );
};
