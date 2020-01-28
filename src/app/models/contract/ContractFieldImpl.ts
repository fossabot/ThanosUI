import { SchemaField } from '../schema/SchemaField';

export class ContractFieldImpl {
    name: string;
    length: number;
    type: string;
    schemaContent: string;
    contractContent?: string;

    constructor(schemaField: SchemaField) {
        this.name = schemaField.name;
        this.length = schemaField.length;
        this.type = schemaField.type;
        this.schemaContent = schemaField.content;
    }
}
