export class Order{
  total: number;
  date: Date;
  Status: 'Pagado' | 'Creado' | 'Enviado';

  constructor(total: number, Status: 'Pagado' | 'Creado' | 'Enviado'){
    this.total = total;
    this.date = new Date(); // Se establece la fecha actual automáticamente
    this.Status = Status;
  }
  to_dict():Record<string, any>{
    return {
      total: this.total,
      date: this.date,
      Status: this.Status
    }
  }
}