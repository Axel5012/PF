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
    selectPaquetes(
      forma.paqueteId, "");
    checksRoles(listaRoles, []);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  const formData =
    new FormData(forma);
  /** @type {string} */
  const id = getString(formData, "cue").trim();
  /** @type {Date} */
  const fecha1 = getString(formData, "fecha1").trim();
  /** @type {Date} */
  const fecha2 = getString(formData, "fecha2").trim();
  /** @type {Number} */
  const num = getString(formData, "num").trim();
  const modelo = {
    id,
    fecha1,
    fecha2,
    num
  };
  await guardaUsuario.add(modelo);
  forma.texto.value = "";
  }

