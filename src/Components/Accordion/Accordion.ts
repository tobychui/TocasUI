///<reference path="./Accordion.d.ts" />

class Accordion {
    /** element 是手風琴元素。 */
    private _element: HTMLElement
    /** options 是手風琴元件的設置選項。 */
    public options: Options

    constructor(element: HTMLElement | string, options: Options) {
        this.options = options

        if (element instanceof HTMLElement) {
            this._element = element
        } else {
            this._element = document.querySelector(element)
        }

        this._bindEvents()
    }

    /**
     * open 能夠開啟指定的手風琴項目。
     *
     * @param index 欲開啟的項目索引
     * @returns 手風琴物件
     */
    public open(index: number): Accordion {
        this._open(index)
        return this
    }

    /**
     * close 能夠關閉指定的手風琴項目。
     *
     * @param index 欲關閉的項目索引
     * @returns 手風琴物件
     */
    public close(index: number): Accordion {
        this._close(index)
        return this
    }

    /**
     * toggle 可以切換指定手風琴項目的開關閉合。
     *
     * @param index 欲切換開關閉的項目索引
     * @returns 手風琴物件
     */
    public toggle(index: number): Accordion {
        if (this._isActive(index)) {
            this._close(index)
        } else {
            this._open(index)
        }
        return this
    }

    /**
     *
     * @returns 手風琴物件
     */
    public closeChildren(): Accordion {
        return this
    }

    /**
     *
     * @param event This is the bar parameter
     * @returns 手風琴物件
     */
    public closeAll(): Accordion {
        return this
    }

    public destroy() {
        this._destroy()
    }

    // --------------------------------------------------------------
    // 內部方法
    // --------------------------------------------------------------

    /**
     * open 能夠開啟指定的手風琴項目。
     *
     * @param index 欲開啟的項目索引
     * @returns 手風琴物件
     */
    private _open(index: number) {
        this._setActive(index)
        this._triggerOpening(index)
        this._triggerOpen(index)

        if (this.options.exclusive) {
            this._closeOthers(index)
        }
    }

    /**
     * close 能夠關閉指定的手風琴項目。
     *
     * @param index 欲關閉的項目索引
     * @returns 手風琴物件
     */
    private _close(index: number) {
        this._setHidden(index)
        this._triggerClosing(index)
        this._triggerClose(index)
    }

    /**
     *
     * @param index 欲保持開啟的項目索引，此索引以外的項目都會被關閉
     * @returns 手風琴物件
     */
    private _closeOthers(index: number) {

    }

    // --------------------------------------------------------------
    // Is
    // --------------------------------------------------------------

    private _isActive(index: number): boolean {
        return this._getContent(index).classList.contains(ClassName.Active)
    }

    // --------------------------------------------------------------
    // Set
    // --------------------------------------------------------------

    /**
     * setActive 能夠將指定的項目設置為啟用狀態。
     *
     * @param index 欲啟用的項目索引
     */
    private _setActive(index: number) {
        this._element.querySelectorAll(Selector.Title)[index].classList.add(ClassName.Active)
        this._element.querySelectorAll(Selector.Content)[index].classList.add(ClassName.Active)
    }

    /**
     * setHidden 能夠將指定的項目設置為停用狀態。
     *
     * @param index 欲停用的項目索引
     */
    private _setHidden(index: number) {
        this._element.querySelectorAll(Selector.Title)[index].classList.remove(ClassName.Active)
        this._element.querySelectorAll(Selector.Content)[index].classList.remove(ClassName.Active)
    }

    // --------------------------------------------------------------
    // Get
    // --------------------------------------------------------------

    private _getContent(index: number): Element {
        return this._element.querySelectorAll(Selector.Content)[index]
    }

    private _getContents(): NodeListOf<Element> {
        return this._element.querySelectorAll(Selector.Content)
    }

    // --------------------------------------------------------------
    // Trigger
    // --------------------------------------------------------------

    /**
     * trigger 可以觸發指定的事件。
     *
     * @param event 欲觸發的事件名稱。
     */
    private _triggerOpen(index: number) {
        var contentElement = this._getContent(index)
        this.options.onOpen.call(contentElement)
        this.options.onChange.call(contentElement)
    }

    /**
     * trigger 可以觸發指定的事件。
     *
     * @param event 欲觸發的事件名稱。
     */
    private _triggerOpening(index: number) {
        var contentElement = this._getContent(index)
        this.options.onOpening.call(contentElement)
        this.options.onChanging.call(contentElement)
    }

    /**
     * trigger 可以觸發指定的事件。
     *
     * @param event 欲觸發的事件名稱。
     */
    private _triggerClose(index: number) {
        var contentElement = this._getContent(index)
        this.options.onClose.call(contentElement)
        this.options.onChange.call(contentElement)
    }

    /**
     * trigger 可以觸發指定的事件。
     *
     * @param event 欲觸發的事件名稱。
     */
    private _triggerClosing(index: number) {
        var contentElement = this._getContent(index)
        this.options.onClosing.call(contentElement)
        this.options.onChanging.call(contentElement)
    }

    // --------------------------------------------------------------
    // Handler
    // --------------------------------------------------------------

    private _handlerClick(evnet: Event) {
        if (!(event.target instanceof Element)) {
            return
        }
        var index = [...this._getContents()].indexOf(event.target)
        if (this._isActive(index)) {
            if (this.options.collapsible) {
                this._close(index)
            }
        } else {
            this._open(index)
        }
    }

    private _bindEvents() {
        this._element.querySelectorAll(Selector.Title).forEach((element: HTMLElement) => {
            element.addEventListener('click', element.dataset._handlerClick = (event: Event) => {
                this._handlerClick(event)
            })
        })
    }

    private _destroy() {

    }
}