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
