import {Nomenclature} from "../model/Nomenclature";
import {NewRequestDTO} from "./NewRequestDTO";
import {Request} from "../model/Request";

const baseUrl = 'http://localhost:8080';

interface newRequestDto {

}

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