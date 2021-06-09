class MiFooter
extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `<p>
        &copy; 2021
        Hernandez Flores Axel Sebastian.
      </p>`;
    }
}

customElements.define(
    "mi-footer", MiFooter);