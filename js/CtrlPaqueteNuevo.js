import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraPaquetes
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoPaquete =
  getFirestore().
    collection("Paquete");
/** @type {HTMLFormElement} */
const forma = document["forma"];
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
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const nombre = getString(
      formData, "nombre").trim();
    /**
     * @type {
        import("./tipos.js").
                Paquete} */
    const modelo = {
      nombre
    };
    await daoPaquete.
      add(modelo);
    muestraPaquetes();
  } catch (e) {
    muestraError(e);
  }
}
