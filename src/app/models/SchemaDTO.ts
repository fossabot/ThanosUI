import { SchemaFieldDTO } from './SchemaFieldDTO';

export class SchemaDTO {
    id: string;
    provider: string;
    name: string;
    version: string;
    request: SchemaFieldDTO[];
    response: SchemaFieldDTO[];

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
}
