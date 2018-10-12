import { Serializable } from './serializable.model';

export class DentalSchool implements Serializable<DentalSchool> {
    id: string;
    name: string;
    alias: string;

    deserialize(data: any): DentalSchool {
        return <DentalSchool>Object.assign({}, {
            id: data.id,
            name: data.name,
            alias: data.alias
        });
    }
}
