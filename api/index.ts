import { convertDataURIToBinary } from '@/utils';
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

export async function getEmprestimosSemAssinatura() {
	try {
		const response = await axios.get(`${baseUrl}/armarios/emprestimos`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar emprestimos sem assinatura: ', error);
	}
}

export async function getArmariosOcupados() {
	try {
		const response = await axios.get(`${baseUrl}/armarios/ocupados`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar armarios ocupados: ', error);
	}
}

export async function postEmprestimo(ass_func: string, ass_port: string, id_chave: string, matricula: string, obs: string, id_porteiro: string) {
	let data = JSON.stringify({
		"assinatura_funcionario": ass_func,
		"assinatura_porteiro": ass_port,
		"id_chave": id_chave,
		"matricula": matricula,
		"observacao": obs,
		"id_porteiro": id_porteiro
	});

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${baseUrl}/entregas`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	axios.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.error('Erro ao inserir emprestimo: ', error);
		});
}

export async function getDevolucoes() {
	try {
		const response = await axios.get(`${baseUrl}/entregas/abertas`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar entregas abertas: ', error);
	}
}

export async function patchDevolucao(idEntrega: string, assinatura_funcionario: string, assinatura_porteiro: string) {
	let data = JSON.stringify({
		"assinatura_funcionario": assinatura_funcionario,
		"assinatura_porteiro": assinatura_porteiro
	});
	//console.log(data);
	//console.log(idEntrega);

	let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `${baseUrl}/entregas/${idEntrega}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	axios.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.error('Erro ao devolver a chave: ', error)
		})
}

export async function patchMovimentacaoArmario(idMovimentacao: string, assinatura_funcionario: string) {
	let data = JSON.stringify({
		"assinatura_funcionario": assinatura_funcionario,
	});
	//console.log(data);
	//console.log(idMovimentacao);

	let config = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: `${baseUrl}/armarios/assinatura/${idMovimentacao}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	axios.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.error('Erro ao registrar assinatura: ', error)
		})
}

export async function postMovimentacaoSegundaVia(armario: string, assinatura_funcionario: string, assinatura_porteiro: string, tipoMovimentacao: number) {
	let data = JSON.stringify({
		"assinatura_funcionario": assinatura_funcionario,
		"assinatura_porteiro": assinatura_porteiro,
		"id_armario": armario,
		"tipo_movimentacao": tipoMovimentacao
	});

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${baseUrl}/entregas`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	axios.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.error('Erro ao inserir emprestimo: ', error);
		});
}

export async function getDevolucoesSegundaVia() {
	try {
		const response = await axios.get(`${baseUrl}/armarios/segundaVia`);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar segundas vias: ', error);
	}
}