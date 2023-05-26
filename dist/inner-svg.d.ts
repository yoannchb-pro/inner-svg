type LoadFn = (injection: InjectSVG) => any;
declare class InjectSVG {
    element: HTMLElement;
    path: string;
    svg: SVGElement;
    private firstLoadFn;
    private eachLoadFn;
    constructor(element: HTMLElement, path: string);
    /**
     * Called when the first svg is injected (not when the path change)
     * @param fn
     */
    onFirstLoad(fn: LoadFn): void;
    /**
     * Called every time a new svg is injected (like when the path change)
     * @param fn
     */
    onEachLoad(fn: LoadFn): void;
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
    copySameAttributesFromOriginalElement(): void;
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
 * Inject a svg into the dom
 * @param element
 * @param path
 * @returns
 */
declare function innerSVG(element: HTMLElement, path: string): InjectSVG;
export { innerSVG as default };
