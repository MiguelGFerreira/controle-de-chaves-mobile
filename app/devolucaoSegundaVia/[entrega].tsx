import { postMovimentacaoSegundaVia } from '@/api';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, Pressable, SafeAreaView, Text, View } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

export default function Page() {
	const { entrega } = useLocalSearchParams();
	const navigation = useNavigation();

	{/*Propriedades das assinaturas (visibilidade do modal e valores das assinaturas preenchidas)*/ }
	const [keeperModalVisible, setKeeperModalVisible] = useState(false);
	const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
	const [keeperSignature, setKeeperSignature] = useState<string | null>(null);
	const [employeeSignature, setEmployeeSignature] = useState<string | null>(null);

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

		Alert.alert(
			"Confirma a devolução da chave?",
			`Devolvendo a chave`,
			[
				// Does nothing but dismiss the dialog when tapped
				{
					text: "Não",
				},
				{
					text: "Sim",
					onPress: () => {
						postMovimentacaoSegundaVia(entrega as string, employeeSignature, keeperSignature, 0) // tipo_movimentacao = 0 significa que esta devolvendo
						Alert.alert("Chave Devolvida")
						navigation.goBack();
					},
				},
			]
		);
	}

	return (
		<SafeAreaView className='lajota'>
			<View className='cabecalho'>
				<Text className="texto-titulo">Devolução da Segunda Via</Text>
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
}
