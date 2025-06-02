import StatusLogDTO from "./StatusLogDTO";
import EquipmentLogDTO from "./EquipmentLog";

export default class UnifiedLogEntry {
    message: string;
    timestamp: Date;
    logType: 'status' | 'equipment';
    originalData: any;

    constructor(
        message: string,
        timestamp: Date | string,
        logType: 'status' | 'equipment',
        originalData?: any
    ) {
        this.message = message;
        this.timestamp = typeof timestamp === 'string'
            ? new Date(timestamp)
            : timestamp;
        this.logType = logType;
        this.originalData = originalData;
    }

    // Форматированное время для отображения
    get formattedTime(): string {
        return this.timestamp.toLocaleString();
    }

    // Статический метод для создания из StatusLogDTO
    static fromStatusLog(log: StatusLogDTO): UnifiedLogEntry {
        const message = `Статус изменен: ${log.oldStatus || 'нет'} → ${log.newStatus}`;
        return new UnifiedLogEntry(
            message,
            log.changeTimestamp,
            'status',
            log
        );
    }

    // Статический метод для создания из EquipmentLogDTO
    static fromEquipmentLog(log: EquipmentLogDTO): UnifiedLogEntry {
        const diff = log.newCount - log.oldCount;
        const message = `Количество изменено: ${log.oldCount} → ${log.newCount} (${diff > 0 ? '+' : ''}${diff})`;
        return new UnifiedLogEntry(
            message,
            log.changeTime,
            'equipment',
            log
        );
    }
}