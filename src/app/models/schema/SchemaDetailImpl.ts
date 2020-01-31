import { SchemaField } from './SchemaField';
import { SchemaDetail } from './SchemaDetail';
import { ContractDetailImpl } from '../contract/ContractDetailImpl';
import { ContractFieldImpl } from '../contract/ContractFieldImpl';

export class SchemaDetailImpl implements SchemaDetail {
    id: string;
    provider: string;
    name: string;
    version: string;
    request: SchemaField[];
    response: SchemaField[];

    constructor(obj?: any) {
        Object.assign(this, obj);
    }

    isValid(): boolean {
        if (!this.provider || 0 === this.provider.length) {
            return false;
        } else if (!this.name || 0 === this.name.length) {
            return false;
        } else if (!this.version || 0 === this.version.length) {
            return false;
        } else {
            return true;
        }
    }

    private getSchemaIndex(): string {
        return this.provider + '-' + this.name + '-' + this.version;
    }

    toContractDetailImpl(): ContractDetailImpl {
        const contractRequest = this.request
            .map(schemaRequest => new ContractFieldImpl(schemaRequest));

        const contractResponse = this.response
            .map(schemaResponse => new ContractFieldImpl(schemaResponse));

        const result = new ContractDetailImpl();
        result.setSchemaDetailInfo(this.id, this.provider, this.name, this.version,
            this.getSchemaIndex(), contractRequest, contractResponse);
        return result;
    }
}
