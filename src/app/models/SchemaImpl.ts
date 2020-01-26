import { SchemaField } from './SchemaField';
import { Schema } from './Schema';

export class SchemaImpl implements Schema {
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
}
