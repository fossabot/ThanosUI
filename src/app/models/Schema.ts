import { SchemaField } from './SchemaField';

export interface Schema {
    provider: string;
    name: string;
    version: string;
    request: SchemaField[];
    response: SchemaField[];
}
