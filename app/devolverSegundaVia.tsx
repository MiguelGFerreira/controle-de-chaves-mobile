import { getDevolucoesSegundaVia } from "@/api";
import { DevolucaoItemSegundaVia } from "@/components/DevolucaoItemSegundaVia";
import { DevolucaoSegundaViaProps } from "@/types";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";

export default function devolverSegundaVia() {
	const [devolucoes, setDevolucoes] = useState<DevolucaoSegundaViaProps[]>([])


	const fetchDevolucoesSegundaVia = async () => {
		const data = await getDevolucoesSegundaVia()
		setDevolucoes(data)
	}

	useEffect(() => {
		fetchDevolucoesSegundaVia()
	},[])

	return (
		<SafeAreaView className="lajota">
			<Text className="texto-titulo">Tela de Segunda Via</Text>

			<FlatList
				data={devolucoes}
				className="flatlist-container"
				renderItem={({item}) => (
					<DevolucaoItemSegundaVia
						ID={item.ID}
						Nome={item.Nome}
						Numero={item.Numero}
					/>
				)}
				keyExtractor={item => item.ID}
			/>
		</SafeAreaView>
	)
}