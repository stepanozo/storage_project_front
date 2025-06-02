import StatusLogDTO from "./dto/StatusLogDTO";

const baseUrl = 'http://localhost:8080';

export const getAllStatusLogs = (): Promise<StatusLogDTO[]> =>
    fetch(`${baseUrl}/api/status/list`, {
        method: "GET",
        headers: {
            "Authorization": `${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => data.map((log: any) => new StatusLogDTO(
                        log.id,
                        log.equipmentNomenclatureName,
                        log.count,
                        log.oldStatus,
                        log.newStatus,
                        log.userName,
                        new Date(log.changeTimestamp)
                    )));
            } else {
                return response.text()
                    .then(text => { throw new Error(text) });
            }
        });