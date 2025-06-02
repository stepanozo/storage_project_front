import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import StatusLogDTO from "../api/dto/StatusLogDTO";
import {getAllStatusLogs} from "../api/statusLogApi";
import StatusLogTable from "../components/StatusLogTable";

export const StatusLogsPage = () => {

  const [logs, setLogs] = useState<StatusLogDTO[]>([]);
  useEffect(() => {
      getAllStatusLogs()
          .then((data) => setLogs(data.sort((a, b) =>
              b.changeTimestamp.getTime() - a.changeTimestamp.getTime()
          )))
  }, []);

  const refreshLogs = () => {
      getAllStatusLogs()
          .then((data) => setLogs(data.sort((a, b) =>
              b.changeTimestamp.getTime() - a.changeTimestamp.getTime()
          )))
  }


  return (
    <Row>
      <Col>
        <StatusLogTable logs={logs}/>
      </Col>
    </Row>
  );
}
