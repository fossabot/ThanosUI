import { SchemaField } from './SchemaField';

export interface SchemaDetail {
    provider: string;
    name: string;
    version: string;
    request: SchemaField[];
    response: SchemaField[];
}
