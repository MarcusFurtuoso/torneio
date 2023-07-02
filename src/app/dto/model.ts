export interface Categoria {
  id: number;
  nome: string;
}

export interface Torneio {
  id: number;
  nome: string;
  premiacao: string;
  categorias: Categoria[];
}

export interface Inscricao {
  categoriaId: number;
  usuario1: number;
  usuario2: number;
}

export interface Usuario {
  id: number;
  nome: string;
  login: string;
}

export class LoginForm {
  login!: string;
  senha!: string;
}

export class CadastroForm {
  nome!: string;
  login!: string;
  senha!: string;
}

export class InscricaoForm {
  categoriaId!: number;
  usuario1Id!: number;
  usuario2Id!: number;
}

export class UsuarioRespostaApi {
  id!: number;
  nome!: string;
  login!: number; 
}