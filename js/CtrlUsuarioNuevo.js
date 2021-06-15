import {
  getAuth
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  checksRoles,
  guardaUsuario,
  selectPaquetes
} from "./usuarios.js";

const forma = document["forma"];
const listaRoles = document.querySelector("#listaRoles");

getAuth().onAuthStateChanged(protege, muestraError);

async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
    selectPaquetes(
      forma.paqueteId, "");
    checksRoles(listaRoles, []);
  }
}

async function guarda(evt) {
  try{
  const formData = new FormData(forma);
  const fecha1 = getString(formData, "fecha1").trim();
  const fecha2 = getString(formData, "fecha2").trim();
  const num = getString(formData, "num").trim();
  const id = getString(formData, "cue").trim();
  await guardaUsuario(evt,formData, id);
  await guardaUsuario(evt,formData, fecha1);
  await guardaUsuario(evt,formData, fecha2);
  await guardaUsuario(evt,formData, num);
}
