import { Mode } from './Mode';
import { Schema } from './Schema';
import { ContractService } from '../../service/contract.service';

export interface SchemaDialogData {
    mode: Mode;
    title: string;
    provider: string;
    name: string;
    version: string;
    contractService: ContractService;
}
