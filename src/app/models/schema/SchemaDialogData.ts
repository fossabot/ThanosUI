import { Mode } from './Mode';
import { ContractService } from '../../service/contract.service';

export interface SchemaDialogData {
    mode: Mode;
    id: string;
    title: string;
    provider: string;
    name: string;
    version: string;
    contractService: ContractService;
}
