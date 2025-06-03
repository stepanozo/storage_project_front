import {NewRequestDTO} from "./dto/NewRequestDTO";
import {Request} from "../model/Request";
import {Statistics} from "./dto/Statistics";

const baseUrl = 'http://localhost:8080';

export const getAllRequests = (): Promise<Request[]> =>
  fetch(`${baseUrl}/api/request/list`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  })
    .then(response => {
      if(response.status === 200)
        return response.json()
      else
        return response.text()
          .then(data => {throw new Error(data) })
    })

export const createRequest = (newRequestDTO: NewRequestDTO): Promise<any> =>
  fetch(`${baseUrl}/api/request/create_request`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(newRequestDTO)
  }).then(response => {
    if(response.status === 200)
      return response.text()
    else
      return response.text()
        .then(data => {throw new Error(data) })
  })

export const cancelRequest = (id: number): Promise<any> =>
  fetch(`${baseUrl}/api/request/cancel/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  })
    .then(response => {
      if(response.status === 200)
        return response.text()
      else
        return response.text()
          .then(data => {throw new Error(data) })
    })

export const confirmReceivingRequest = (id: number): Promise<any> =>
  fetch(`${baseUrl}/api/request/confirm_receiving/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  })
    .then(response => {
      if(response.status === 200)
        return response.text()
      else
        return response.text()
          .then(data => {console.log('govno'); throw new Error(data) })
    })

export const getEquipmentStatistics = (from: Date, to: Date): Promise<Statistics[]> => {
    const formatDate = (date: Date) => {
        return date.toISOString().replace(/\.\d{3}Z$/, '');
    };

    return fetch(`${baseUrl}/api/request/statistics?fromDate=${encodeURIComponent(formatDate(from))}&toDate=${encodeURIComponent(formatDate(to))}`, {
        method: 'GET',
        headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }
            return response.json() as Promise<Statistics[]>;
        });
};