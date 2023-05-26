import { findInjectedElementIndex } from "utils";
import { InjectedElements } from "./InnerSVG";
import AttributesHandler from "./attr-handler";

/**
 * Init an observer to see any change of the data-i-svg attribute
 */
function initObserver() {
  const observerDOM = new MutationObserver(function (mutations) {
    const addedNodes: HTMLElement[] = [];

    for (const mutation of mutations ?? []) {
      //attributes changed
      if (mutation.type === "attributes") {
        const element = mutation.target as HTMLElement;
        const injectedIndex = findInjectedElementIndex(element);

        const isNewInjection = injectedIndex === -1;

        if (isNewInjection) {
          addedNodes.push(element);
        } else {
          const path = element.dataset.iSvg;
          InjectedElements[injectedIndex].instance.updatePath(path);
        }
      }

      //added nodes
      for (const addedNode of mutation.addedNodes) {
        addedNodes.push(addedNode as HTMLElement);
      }

      //removed nodes
      for (const removedNode of mutation.removedNodes) {
        const injectedIndex = findInjectedElementIndex(removedNode);
        if (injectedIndex !== -1)
          InjectedElements[injectedIndex].instance.destruct();
      }
    }

    if (addedNodes.length > 0) AttributesHandler(addedNodes);
  });

  observerDOM.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

export default initObserver;
