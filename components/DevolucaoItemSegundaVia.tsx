import { DevolucaoSegundaViaProps } from "@/types"
import { Link } from "expo-router";
import { Text, View } from "react-native"

export const DevolucaoItemSegundaVia = ({ ID, Nome, Numero }: DevolucaoSegundaViaProps) => {
	return (
		<Link href={`/devolucaoSegundaVia/${ID}`}>
			<View className="flatlist-pressable">
				<Text className="flatlist-texto">Id: {ID}</Text>
				<Text className="flatlist-texto">Funcionario: {Nome}</Text>
				<Text className="flatlist-texto">Armario: {Numero}</Text>
			</View>
		</Link>
	)
}