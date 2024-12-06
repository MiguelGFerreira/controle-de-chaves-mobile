import { DevolucaoProps } from "@/types"
import { Link } from "expo-router";
import { Text, View } from "react-native"

export const DevolucaoItem = ({ ID, DATA_ENTREGA, ID_CHAVE, FUNCIONARIO, PORTEIRO }: DevolucaoProps) => {
	return (
		<Link href={`/${ID}`}>
			<View className="flatlist-pressable">
				<Text className="flatlist-texto">Id: {ID}</Text>
				<Text className="flatlist-texto">Entrega: {DATA_ENTREGA}</Text>
				<Text className="flatlist-texto">Chave: {ID_CHAVE}</Text>
				<Text className="flatlist-texto">Funcionario: {FUNCIONARIO}</Text>
				<Text className="flatlist-texto">Porteiro: {PORTEIRO}</Text>
			</View>
		</Link>
	)
}