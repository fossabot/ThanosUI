export class TcpRequestDTO {
    private host: string;
    private port: number;
    private requestMsg: string;

    constructor(host: string, port: number, request: string) {
        this.host = host;
        this.port = port;
        this.requestMsg = request;
    }

}
