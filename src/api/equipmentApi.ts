import {Nomenclature} from "../model/Nomenclature";
import {Equipment} from "../model/Equipment";
import EquipmentLogDTO from "./dto/EquipmentLog";

const baseUrl = 'http://localhost:8080';

export const getNomenclature = (id: number) =>
  fetch(`${baseUrl}/api/equipment/get_nomenclature/${id}`, {
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

export const getAllNomenclatures = (): Promise<Nomenclature[]> =>
  fetch(`${baseUrl}/api/equipment/nomenclature_list`, {
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

export const getAllEquipment = (): Promise<Equipment[]> =>
  fetch(`${baseUrl}/api/equipment/list`, {
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

export const changeEquipmentCount = (id: number, count: number): Promise<any> =>
  fetch(`${baseUrl}/api/equipment/change_count/${id}?count=${count}`, {
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

export const changeNomenclatureTitle = (id: number, title: string): Promise<any> =>
  fetch(`${baseUrl}/api/equipment/change_name/${id}?title=${title}`, {
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

export const deleteEquipment = (id: number): Promise<any> =>
  fetch(`${baseUrl}/api/equipment/delete_equipment/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  }).then(response => {
    if(response.status === 200)
      return response.text()
    else if (response.status === 404)
      return response.text()
        .then(data => {throw new Error(data) })
    else
      throw new Error('Произошла ошибка')
  })

export const deleteNomenclature = (id: number): Promise<any> =>
  fetch(`${baseUrl}/api/equipment/delete_nomenclature/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  }).then(response => {
    if(response.status === 200)
      return response.text()
    else
      return response.text()
        .then(data => {throw new Error(data) })
  })

export const addEquipment = (nomenclature_id: number, count: number): Promise<any> =>
  fetch(`${baseUrl}/api/equipment/add_equipment/${nomenclature_id}?count=${count}`, {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  }).then(response => {
    if(response.status === 200)
      return response.text()
    else if (response.status === 404)
      return response.text()
        .then(data => {throw new Error(data) })
    else
      throw new Error('Произошла ошибка')
  })

export const addNomenclature = (title: string): Promise<any> =>
  fetch(`${baseUrl}/api/equipment/add_nomenclature/${title}`, {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  }).then(response => {
    if(response.status === 200)
      return response.text()
    else
      return response.text()
        .then(data => {throw new Error(data) })
  })

export const getAllEquipmentLogs = (): Promise<EquipmentLogDTO[]> =>
    fetch(`${baseUrl}/api/equipment/logs`, {
        method: "GET",
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.status === 200) {
                return response.json() as Promise<EquipmentLogDTO[]>;
            } else if (response.status === 204) {
                return [];
            } else {
                return response.text()
                    .then(data => { throw new Error(data || 'Failed to fetch equipment logs') });
            }
        });
