export class MockMapping {
    provider: string;
    consumer: string;
    port: number;

    constructor(provider: string, consumer: string, port: number) {
        this.provider = provider;
        this.consumer = consumer;
        this.port = port;
    }
}

