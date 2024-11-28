import axios from 'axios';
const baseUrl = 'http://10.0.73.216:83/controleDeChaves/express-chaves';

export async function getChavesByArmario(armario: string) {
	try {
		const response = await axios.get(`${baseUrl}/chaves/armario/${armario}`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar chaves: ', `${baseUrl}/chaves/armario/${armario}`);
	}
}

export async function getPorteiros() {
	try {
		const response = await axios.get(`${baseUrl}/porteiros`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar porteiros: ', error);
	}
}

export async function getFuncionarios() {
	try {
		const response = await axios.get(`${baseUrl}/permissao/funcionarios`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar funcionarios: ', error);
	}
}

export async function getFuncionariosComPermissao(armario: string, numero: string) {
	try {
		const response = await axios.get(`${baseUrl}/permissao/${armario}/${numero}`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar funcionarios (com permissao): ', `${baseUrl}/permissao/${armario}/${numero}`);
	}
}
