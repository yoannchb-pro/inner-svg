import { findInjectedElementIndex } from "utils";

const InjectedElements: { element: HTMLElement; instance: InjectSVG }[] = [];

type LoadFn = (injection: InjectSVG) => any;

class InjectSVG {
  public svg: SVGElement;
  private firstLoadFn: LoadFn;
  private eachLoadFn: LoadFn;

  constructor(public element: HTMLElement, public path: string) {
    InjectedElements.push({ element, instance: this });
    this.path = this.initPath(path);
    this.init();
  }

  /**
   * Called when the first svg is injected (not when the path change)
   * @param fn
   */
  onFirstLoad(fn: LoadFn) {
    this.firstLoadFn = fn;
  }

  /**
   * Called every time a new svg is injected (like when the path change)
   * @param fn
   */
  onEachLoad(fn: LoadFn) {
    this.eachLoadFn = fn;
  }

  /**
   * Inject the svg
   */
  private async init() {
    let firstLoad = true;
    if (this.svg) {
      firstLoad = false;
      this.svg.remove();
    }
    await this.loadSVG();
    this.copySameAttributesFromOriginalElement();
    this.element.style.display = "none";
    this.element.parentNode.insertBefore(this.svg, this.element);

    if (firstLoad && this.firstLoadFn) this.firstLoadFn(this);
    if (this.eachLoadFn) this.eachLoadFn(this);
  }

  /**
   * Laod the svg
   */
  private async loadSVG() {
    const req = await fetch(this.path);
    const svgText = await req.text();
    this.svg = this.initSVG(svgText);
  }

  /**
   * Create the svg element
   * @param svgText
   * @returns
   */
  private initSVG(svgText: string): SVGElement {
    const temp = document.createElement("div");
    temp.innerHTML = svgText;
    for (const child of temp.childNodes) {
      if (child instanceof SVGElement) return child;
    }
    this.destruct();
    throw new Error(this.path + " is not a valid SVG");
  }

  /**
   * Set the same attributes to the svg from the element
   */
  copySameAttributesFromOriginalElement() {
    for (const attr of this.element.attributes) {
      if (attr.name === "data-i-svg" || attr.name === "id") continue;
      if (attr.name === "style") {
        this.svg.setAttribute(
          attr.name,
          attr.value.replace(/display\:\s*?none\;?/gi, "")
        );
        continue;
      }
      this.svg.setAttribute(attr.name, attr.value);
    }
  }

  /**
   * Init the path of the svg
   * @param path
   * @returns
   */
  private initPath(path: string) {
    const splittedPath = document.location.pathname.split("/");
    if (splittedPath[splittedPath.length - 1]?.includes("."))
      splittedPath.pop();
    const absolutePath = splittedPath.join("/");
    return path.startsWith("/") ? path : absolutePath + "/" + path;
  }

  /**
   * Update the svg path
   * @param path
   */
  public updatePath(path: string) {
    this.path = this.initPath(path);
    this.init();
  }

  /**
   * Remove the svg
   */
  public destruct() {
    const injectedIndex = findInjectedElementIndex(this.element);
    this.element.removeAttribute("data-i-svg");
    this.element.style.display = "";
    this.svg.remove();
    InjectedElements.splice(injectedIndex, 1);
  }
}

export { InjectSVG, InjectedElements };
