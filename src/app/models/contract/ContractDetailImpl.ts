import { ContractFieldImpl } from './ContractFieldImpl';

export class ContractDetailImpl {
    id: string;
    provider: string;
    consumer: string;
    name: string;
    version: string;
    schemaId: string;
    schemaProvider: string;
    schemaName: string;
    schemaVersion: string;
    schemaIndex: string;
    request: ContractFieldImpl[];
    response: ContractFieldImpl[];

    constructor(obj?: any) {
        Object.assign(this, obj);
    }

    setSchemaDetailInfo(schemaId: string, schemaProvider: string, schemaName: string, schemaVersion: string,
                        schemaIndex: string, req: ContractFieldImpl[], res: ContractFieldImpl[]) {
        this.schemaId = schemaId;
        this.schemaProvider = schemaProvider;
        this.schemaName = schemaName;
        this.schemaVersion = schemaVersion;
        this.schemaIndex = schemaIndex;
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
