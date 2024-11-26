import axios from 'axios';
const baseUrl = 'http://10.0.73.216:83/controleDeChaves/express-chaves';

export async function getChavesByArmario(armario: string) {
	try {
		const response = await axios.get(`${baseUrl}/chaves/${armario}`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar chaves: ', error);
	}
}
