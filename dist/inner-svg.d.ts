declare class InjectSVG {
    element: HTMLElement;
    path: string;
    svg: SVGElement;
    constructor(element: HTMLElement, path: string);
    /**
     * Inject the svg
     */
    private init;
    /**
     * Laod the svg
     */
    private loadSVG;
    /**
     * Create the svg element
     * @param svgText
     * @returns
     */
    private initSVG;
    /**
     * Set the same attributes to the svg from the element
     */
    private setSameAttributes;
    /**
     * Init the path of the svg
     * @param path
     * @returns
     */
    private initPath;
    /**
     * Update the svg path
     * @param path
     */
    updatePath(path: string): void;
    /**
     * Remove the svg
     */
    destruct(): void;
}
/**
 * Inject an svg into the dom
 * @param element
 * @param path
 * @returns
 */
declare function innerSVG(element: HTMLElement, path: string): InjectSVG;
export { innerSVG as default };
