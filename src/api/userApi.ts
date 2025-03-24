import {Nomenclature} from "../model/Nomenclature";
import {Equipment} from "../model/Equipment";
import {NewRequestDTO} from "./NewRequestDTO";
import {LoginDTO} from "./LoginDTO";

const baseUrl = 'http://localhost:8080';

export const doLogin = (loginDTO: LoginDTO): Promise<any> =>
  fetch(`${baseUrl}/api/auth`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Указываем, что отправляем JSON
    },
    body: JSON.stringify(loginDTO)
  }).then(response => {
    if (response.status === 200) {
      return response.json()
    }
    else
      return response.text().then(data => {throw new Error(data) })
  })