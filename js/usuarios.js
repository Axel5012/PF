import {
  getFirestore
} from "../lib/fabrica.js";
import {
  subeStorage
} from "../lib/storage.js";
import {
  cod, getForánea, muestraError
} from "../lib/util.js";
import {
  muestraUsuarios
} from "./navegacion.js";

const SIN_PAQUETE = /* html */
  `<option value="">
    -- Sin Paquete --
  </option>`;

const firestore = getFirestore();
const daoRol = firestore.
  collection("Rol");
const daoPaquete = firestore.
  collection("Paquete");
const daoUsuario = firestore.
  collection("Usuario");


export function
  selectPaquetes(select,
    valor) {
  valor = valor || "";
  daoPaquete.
    orderBy("nombre").
    onSnapshot(
      snap => {
        let html = SIN_PAQUETE;
        snap.forEach(doc =>
          html += htmlPaquete(
            doc, valor));
        select.innerHTML = html;
      },
      e => {
        muestraError(e);
        selectPaquetes(
          select, valor);
      }
    );
}


function
  htmlPaquete(doc, valor) {
  const selected =
    doc.id === valor ?
      "selected" : "";
  
  const data = doc.data();
  return (/* html */
    `<option
        value="${cod(doc.id)}"
        ${selected}>
      ${cod(data.nombre)}
    </option>`);
}

export function
  checksRoles(elemento, valor) {
  const set =
    new Set(valor || []);
  daoRol.onSnapshot(
    snap => {
      let html = "";
      if (snap.size > 0) {
        snap.forEach(doc =>
          html +=
          checkRol(doc, set));
      } else {
        html += /* html */
          `<li class="vacio">
              -- No hay roles
              registrados. --
            </li>`;
      }
      elemento.innerHTML = html;
    },
    e => {
      muestraError(e);
      checksRoles(
        elemento, valor);
    }
  );
}

export function
  checkRol(doc, set) {
  const data = doc.data();
  const checked =
    set.has(doc.id) ?
      "checked" : "";
  return (/* html */
    `<li>
      <label class="fila">
        <input type="checkbox"
            name="rolIds"
            value="${cod(doc.id)}"
          ${checked}>
        <span class="texto">
          <strong
              class="primario">
            ${cod(doc.id)}
          </strong>
          <span
              class="secundario">
          ${cod(data.descripción)}
          </span>
        </span>
      </label>
    </li>`);
}

export async function
  guardaUsuario(evt, formData,
    id) {
  try {
    evt.preventDefault();
    const paqueteId =
      getForánea(formData,
        "paqueteId");
    const rolIds =
      formData.getAll("rolIds");
    await daoUsuario.
      doc(id).
      set({
        paqueteId,
        rolIds
      });
    const avatar =
      formData.get("avatar");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}
