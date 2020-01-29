export class ContractKeyImpl {
    id: string;
    provider: string;
    consumer: string;
    name: string;
    version: string;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
