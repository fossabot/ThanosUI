import { SchemaField } from './SchemaField';

export interface SchemaDetail {
    id: string;
    provider: string;
    name: string;
    version: string;
    request: SchemaField[];
    response: SchemaField[];
}
