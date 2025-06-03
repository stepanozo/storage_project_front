import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import {getEquipmentStatistics} from "../api/requestApi";
import {Statistics} from "../api/dto/Statistics";

export const StatisticsPage = () => {
    const [statistics, setStatistics] = useState<Statistics[]>([]);
    const [sortedStats, setSortedStats] = useState<Statistics[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        end: new Date()
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getEquipmentStatistics(dateRange.start, dateRange.end);
                setStatistics(data);
                setSortedStats(data);
                setSortDirection(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dateRange]);

    const toggleSort = () => {
        let newDirection: 'asc' | 'desc' | null;
        let newSortedStats = [...statistics];

        if (sortDirection === null) {
            newDirection = 'desc';
            newSortedStats.sort((a, b) => b.count - a.count);
        } else if (sortDirection === 'desc') {
            newDirection = 'asc';
            newSortedStats.sort((a, b) => a.count - b.count);
        } else {
            newDirection = null;
            newSortedStats = [...statistics];
        }

        setSortedStats(newSortedStats);
        setSortDirection(newDirection);
    };

    const handleDateChange = (type: 'start' | 'end', value: Date) => {
        setDateRange(prev => ({
            ...prev,
            [type]: value
        }));
    };

    if (loading) return <div className="text-center my-4">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div style={{
            minHeight: "300px",
            maxHeight: "600px",
            overflowY: "auto",
            width: "100%",
            maxWidth: "100vw", // Не больше ширины экрана
            padding: "0 15px" // Добавляем отступы по бокам
        }}>
            <h2 className="mb-4">Статистика выдачи оборудования</h2>

            <div className="row mb-4">
                <div className="col-md-3">
                    <label className="form-label">Начала временного интервала:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dateRange.start.toISOString().split('T')[0]}
                        onChange={(e) => handleDateChange('start', new Date(e.target.value))}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Конец временного интервала:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dateRange.end.toISOString().split('T')[0]}
                        onChange={(e) => handleDateChange('end', new Date(e.target.value))}
                    />
                </div>
            </div>

            <Table
                striped
                bordered
                hover
                style={{
                    width: "100%",
                    tableLayout: "fixed" // Фиксированная ширина колонок
                }}
            >
                <thead>
                <tr>
                    <th style={{ width: "60%" }}>Тип оборудования</th>
                    <th style={{ width: "40%" }}>
                        <div className="d-flex align-items-center justify-content-between">
                            <span>Количество выданных единиц</span>
                            <Button
                                variant="link"
                                size="sm"
                                onClick={toggleSort}
                                title={sortDirection === 'desc' ? 'Сортировать по возрастанию' :
                                    sortDirection === 'asc' ? 'Сбросить сортировку' :
                                        'Сортировать по убыванию'}
                                style={{ padding: "0 0 0 5px" }}
                            >
                                {sortDirection === 'desc' ? '▼' :
                                    sortDirection === 'asc' ? '▲' : '⇅'}
                            </Button>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedStats.map((item, index) => (
                    <tr key={index}>
                        <td style={{
                            wordWrap: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>
                            {item.name}
                        </td>
                        <td>{item.count}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};