export default class EquipmentLogDTO {
    id: number;
    equipmentName: string;
    oldCount: number;
    newCount: number;
    userName: string;
    changeTime: Date;

    constructor(
        id: number,
        equipmentName: string,
        oldCount: number,
        newCount: number,
        userName: string,
        changeTime: Date | string
    ) {
        this.id = id;
        this.equipmentName = equipmentName;
        this.oldCount = oldCount;
        this.newCount = newCount;
        this.userName = userName;
        this.changeTime = typeof changeTime === 'string'
            ? new Date(changeTime)
            : changeTime;
    }
}