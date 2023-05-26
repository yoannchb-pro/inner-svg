import { InjectSVG } from "core/InnerSVG";
import AttributesHandler from "core/attr-handler";
import initObserver from "core/observer";

document.addEventListener("DOMContentLoaded", function () {
  AttributesHandler(document.querySelectorAll("[data-i-svg]"));
  initObserver();
});

/**
 * Inject an svg into the dom
 * @param element
 * @param path
 * @returns
 */
function innerSVG(element: HTMLElement, path: string) {
  return new InjectSVG(element, path);
}

export default innerSVG;
