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
  selectPasatiempos
} from "./usuarios.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const listaRoles = document.
  querySelector("#listaRoles");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
    selectPasatiempos(
      forma.pasatiempoId, "");
    checksRoles(listaRoles, []);
  }
}

/** @param {Event} evt */
/**async function guarda(evt) {
  const formData =
    new FormData(forma);
  const id = getString(
    formData, "cue").trim();
  await guardaUsuario(evt,
    formData, id);**/
async function guarda(evt) {
	evt.preventDefault();
  const formData =
    new FormData(forma);
  const fecha1 = getString(formData, "fecha1").trim();
  const fecha2 = getString(formData, "fecha2").trim();
  const id = getString(
    formData, "cue").trim();
  await guardaUsuario(evt,
    formData, id, fecha1, fecha2);
}
}
