import { findInjectedElementIndex } from "utils";

const InjectedElements: { element: HTMLElement; instance: InjectSVG }[] = [];

class InjectSVG {
  public svg: SVGElement;

  constructor(public element: HTMLElement, public path: string) {
    InjectedElements.push({ element, instance: this });
    this.path = this.initPath(path);
    this.init();
  }

  /**
   * Inject the svg
   */
  private async init() {
    if (this.svg) this.svg.remove();
    await this.loadSVG();
    this.setSameAttributes();
    this.element.style.display = "none";
    this.element.parentNode.insertBefore(this.svg, this.element);
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
  private setSameAttributes() {
    for (const attr of this.element.attributes) {
      if (attr.name === "data-i-svg" || attr.name === "id") continue;
      this.svg.setAttribute(attr.name, attr.value);
    }
    if (this.element.style.display === "none") this.svg.style.display = "";
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
