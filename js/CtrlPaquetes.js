import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

const lista = document.
  querySelector("#lista");
const daoPaquete =
  getFirestore().
    collection("Paquete");

getAuth().
  onAuthStateChanged(
    protege, muestraError);
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    consulta();
  }
}

function consulta() {
  daoPaquete.
    orderBy("nombre")
    .onSnapshot(
      htmlLista, errConsulta);
}


function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc =>
      html += htmlFila(doc));
  } else {
    html += /* html */
      `<li class="vacio">
         -- No hay paquetes
        registrados. --
      </li>`;
  }
  lista.innerHTML = html;
}


function htmlFila(doc) {
  const data = doc.data();
  const nombre = cod(data.nombre);
  const parámetros =
    new URLSearchParams();
  parámetros.append("id", doc.id);
  return ( /* html */
    `<li>
      <a class="fila" href=
  "paquete.html?${parámetros}">
        <strong class="primario">
          ${nombre}
        </strong>
      </a>
    </li>`);
}

function errConsulta(e) {
  muestraError(e);
  consulta();
}
