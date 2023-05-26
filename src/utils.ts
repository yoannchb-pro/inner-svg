import { InjectedElements } from "core/InnerSVG";

/**
 * Find an injected elements index to resolve his class
 * @param element
 * @returns
 */
function findInjectedElementIndex(element: Node | HTMLElement) {
  return InjectedElements.findIndex((e) => e.element === element);
}

export { findInjectedElementIndex };
