import { ContractFieldImpl } from './ContractFieldImpl';

export class ContractDetailImpl {
    provider: string;
    consumer: string;
    name: string;
    version: string;
    schemaId: string;
    schemaProvider: string;
    schemaName: string;
    schemaVersion: string;
    request: ContractFieldImpl[];
    response: ContractFieldImpl[];

    constructor(schemaId: string, schemaProvider: string, schemaName: string, schemaVersion: string,
                req: ContractFieldImpl[], res: ContractFieldImpl[]) {
        this.schemaId = schemaId;
        this.schemaProvider = schemaProvider;
        this.schemaName = schemaName;
        this.schemaVersion = schemaVersion;
        this.request = req;
        this.response = res;
    }

    containAtLessOneField(): boolean {
        if (this.containResContractField() && this.containReqContractField()) {
            return true;
        } else {
            return false;
        }
    }
    private containReqContractField(): boolean {
        const result = this.request.find(field => (field.contractContent && field.contractContent !== ''));
        if (typeof result === 'undefined') {
            return false;
        } else {
            return true;
        }
    }

    private containResContractField(): boolean {
        const result = this.response.find(field => (field.contractContent && field.contractContent !== ''));
        if (typeof result === 'undefined') {
            return false;
        } else {
            return true;
        }
    }

}
