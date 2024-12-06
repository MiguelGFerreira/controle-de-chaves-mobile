export interface Chave {
	NUMERO: string,
	DESCRIÇÃO: string,
	RESTRITO: string
}

export interface Porteiro {
	ID: string,
	PORTEIRO: string
}

export interface Funcionario {
	matricula: string,
	nome: string
}

export interface DevolucaoProps {
	ID: string,
    DATA_ENTREGA: string,
    DATA_DEVOLUCAO: string,
    ID_CHAVE: string,
    FUNCIONARIO: string,
    PORTEIRO: string,
}

export interface DevolucaoSegundaViaProps {
	ID: string,
	Numero: string,
	Nome: string
}

export interface Emprestimos {
	ID: string,
	Armario: string,
}

export interface Armario {
	ID: string,
	Armario: string,
}