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
          const injection = InjectedElements[injectedIndex].instance;
          if (mutation.attributeName.includes("data-i-svg"))
            injection.updatePath(path);
          else injection.copySameAttributesFromOriginalElement();
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
