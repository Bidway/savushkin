import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services'; // Ваш HTTP-клиент

const AuditLogPage = () => {
    const { id } = useParams();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const response = await api.get(`api/projects/audit/${id}`);
                setLogs(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch audit logs');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [id]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getActionLabel = (action) => {
        const labels = {
            'ADD': 'Добавление',
            'MOD': 'Изменение',
            'DEL': 'Удаление'
        };
        return labels[action] || action;
    };

    if (loading) return <div className="loading">Загрузка логов...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="audit-log-container">
            <h2>История изменений проекта #{id}</h2>

            <table className="audit-log-table">
                <thead>
                <tr>
                    <th>Действие</th>
                    <th>Пользователь</th>
                    <th>Дата</th>
                    <th>Измененное поле</th>
                    <th>Старое значение</th>
                    <th>Новое значение</th>
                </tr>
                </thead>
                <tbody>
                {logs.length === 0 ? (
                    <tr>
                        <td colSpan="6">Нет данных об изменениях</td>
                    </tr>
                ) : (
                    logs.map((log, index) => (
                        <tr key={`${log.revisionId}-${index}`}>
                            <td className={`action-${log.action.toLowerCase()}`}>
                                {getActionLabel(log.action)}
                            </td>
                            <td>{log.modifiedBy}</td>
                            <td>{formatDate(log.modifiedAt)}</td>
                            <td>{log.changedField || '-'}</td>
                            <td>{log.oldValue || '-'}</td>
                            <td>{log.newValue || '-'}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AuditLogPage;