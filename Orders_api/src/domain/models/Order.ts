export interface Order {
    id: string;
    total: number;
    date: Date;
    status: 'Pagado' | 'Creado' | 'Enviado';
  }
  