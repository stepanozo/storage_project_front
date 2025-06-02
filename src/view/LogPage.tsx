import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {getAllStatusLogs} from "../api/statusLogApi";
import StatusLogTable from "../components/StatusLogTable";
import {getAllEquipmentLogs} from "../api/equipmentApi";
import UnifiedLogEntry from "../api/dto/UnifiedLogEntry";

export const LogPage = () => {
    const [logs, setLogs] = useState<UnifiedLogEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndCombineLogs = async () => {
            setLoading(true);

            // Параллельно загружаем оба типа логов
            const [statusLogs, equipmentLogs] = await Promise.all([
                getAllStatusLogs(),
                getAllEquipmentLogs()
            ]);

            // Преобразуем и объединяем логи
            const combinedLogs = [
                ...statusLogs.map(log => UnifiedLogEntry.fromStatusLog(log)),
                ...equipmentLogs.map(log => UnifiedLogEntry.fromEquipmentLog(log))
            ];

            // Сортируем по времени (новые сверху)
            return combinedLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        };
        fetchAndCombineLogs().then(logs => setLogs(logs));
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Загрузка логов...</div>;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    return (
        <Row>
            <Col>
                <StatusLogTable logs={logs}/>
            </Col>
        </Row>
    );
};
