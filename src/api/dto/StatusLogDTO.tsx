export default class StatusLogDTO {
    id: number;
    equipmentNomenclatureName: string;
    count: number;
    oldStatus: string | null;
    newStatus: string;
    userName: string;
    changeTimestamp: Date;

    constructor(
        id: number,
        equipmentNomenclatureName: string,
        count: number,
        oldStatus: string | null,
        newStatus: string,
        userName: string,
        changeTimestamp: Date
    ) {
        this.id = id;
        this.equipmentNomenclatureName = equipmentNomenclatureName;
        this.count = count;
        this.oldStatus = oldStatus;
        this.newStatus = newStatus;
        this.userName = userName;
        this.changeTimestamp = changeTimestamp;
    }
}