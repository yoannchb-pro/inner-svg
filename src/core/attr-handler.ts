import { findInjectedElementIndex } from "utils";
import { InjectSVG } from "./InnerSVG";

/**
 * Handle attribute data-i-svg
 * @param elements
 */
function AttributesHandler(elements: HTMLElement[] | NodeListOf<HTMLElement>) {
  for (const element of elements) {
    const alreadySetup = findInjectedElementIndex(element) !== -1;
    const dontNeedInjection = element.dataset?.iSvg === undefined;

    if (alreadySetup || dontNeedInjection) continue;

    new InjectSVG(element, element.dataset.iSvg);
  }
}

export default AttributesHandler;
