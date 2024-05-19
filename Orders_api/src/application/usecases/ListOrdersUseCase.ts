export class listAllOrders {
    private repository: any;

    constructor(repository: any) {
        this.repository = repository;
    }

    async execute(): Promise<any> {
        try {
            return await this.repository.listAll();
        } catch (e: any) {
            return { error: e.message };
        }
    }
}
