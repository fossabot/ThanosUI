export class SchemaField {
    name: string;
    type: string;
    length: number;
    content: string;

    constructor(name: string, type: string, content: string ) {
        this.name = name;
        this.type = type;
        this.content = content;
    }
}
