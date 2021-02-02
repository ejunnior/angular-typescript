import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { GetCreditorModel } from './creditor-get.model';

export class CreditorData implements InMemoryDbService {
    createDb() {
        const creditor: GetCreditorModel[] = [
            {
                id: 1,
                name: "Creditor 1"
            },
            {
                id: 2,
                name: "Creditor 2"
            }
        ]

        return { creditor: creditor };
    }
}