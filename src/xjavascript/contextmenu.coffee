# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'contextmenu'
# 模組事件鍵名。
EVENT_NAMESPACE  = ".#{NAME}"
# 模組命名空間。
MODULE_NAMESPACE = "module-#{NAME}"

# 模組設定。
Settings =
    # 消音所有提示，甚至是錯誤訊息。
    silent        : false
    # 顯示除錯訊息。
    debug         : true
    # 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true
    # 目標選擇器。
    target        : null
    # 複合式選單是否可因為使用者點擊選單外面而自動關閉。
    closable      : true
    # 複合式選單是否可以因為在觸控裝置上長按而顯示。
    touch         : true
    # 當複合式選單出現時所會呼叫的回呼函式。
    onShow        : (event, target, x, y) => true
    # 當複合式選單隱藏時所會呼叫的回呼函式。
    onHide        : => true
    # 當複合式選單被停用時所會呼叫的回呼函式。
    onDisable     : =>
    # 當複合式選單被啟用時所會呼叫的回呼函式。
    onEnable      : =>
    # 當複合式選單被點擊項目時所會呼叫的回呼函式。
    onSelect      : (event, value, element) =>

# 中繼資料名稱。
Metadata =
    DISABLE: 'disable'

# 事件名稱。
Event =
    SHOW       : "show#{EVENT_NAMESPACE}"
    HIDE       : "hide#{EVENT_NAMESPACE}"
    DISABLE    : "disable#{EVENT_NAMESPACE}"
    ENABLE     : "enable#{EVENT_NAMESPACE}"
    SELECT     : "select#{EVENT_NAMESPACE}"
    CONTEXTMENU: "contextmenu#{EVENT_NAMESPACE}"
    CLICK      : "click#{EVENT_NAMESPACE}"

# 樣式名稱。
ClassName =
    VISIBLE  : 'visible'
    ANIMATING: 'animating'
    DOWNWARD : 'downward'
    UPWARD   : 'upward'
    RIGHTWARD: 'rightward'
    LEFTWARD : 'leftward'
    HIDDEN   : 'hidden'

# 選擇器名稱。
Selector =
    BODY: 'body'
    ITEM: ':scope > .item'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------

    $item    = $this.find Selector.ITEM
    $body    = ts Selector.BODY
    $parent  = if not settings.target then $this.parent() else ts(settings.target)
    padding  = 10
    duration =
        hidden : 80
        visible: 10

    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =
        show: (x, y) =>
            debug '顯示複合式選單', element
            module.set.position x, y
            module.animate.show =>
                module.remove.animating()

            return $allModules

        hide: =>
            debug '隱藏複合式選單', element
            if module.is.hidden()
                return
            if not module.trigger.hide()
                return
            module.animate.hide =>
                module.remove.animating()

            return $allModules

        animate:
            show: (callback) =>
                $this
                    .off         'animationend'
                    .removeClass ClassName.HIDDEN
                    .addClass    ClassName.VISIBLE, ClassName.ANIMATING
                    .one         'animationend', =>
                        callback.call() if callback?
                    .emulate 'animationend', duration.visible

            hide: (callback) =>
                $this
                    .off         'animationend'
                    .removeClass ClassName.VISIBLE
                    .addClass    ClassName.HIDDEN, ClassName.ANIMATING
                    .one         'animationend', =>
                        callback.call() if callback?
                    .emulate 'animationend', duration.hidden

        disable: =>
            debug '停用複合式選單', element
            module.set.disable()

            return $allModules

        enable: =>
            debug '啟用複合式選單', element
            module.set.enable()

            return $allModules

        set:
            position: (x, y) =>
                r = module.get.rect()
                w = window.innerWidth
                h = window.innerHeight

                if not module.trigger.show x, y
                    return

                if x < padding
                    left = padding
                else if x + r.width + padding > w
                    left = w - r.width - padding
                else
                    left = x

                if y < padding
                    top = padding
                else if y + r.height + padding > h
                    top = h - r.height - padding
                else
                    top = y

                $this
                    .css 'left', "#{left}px"
                    .css 'top' , "#{top}px"
            visible: =>
                $this.addClass ClassName.VISIBLE
            hidden: =>
                $this.removeClass ClassName.VISIBLE
            disable: =>
                $this
                    .trigger Event.DISABLE   , element
                    .data    Metadata.DISABLE, true
            enable: =>
                $this
                    .trigger Event.ENABLE    , element
                    .data    Metadata.DISABLE, false

        remove:
            animating: =>
                $this.removeClass ClassName.ANIMATING

        is:
            disable: =>
                $this.data Metadata.DISABLE
            enable: =>
                not $this.data Metadata.DISABLE
            visible: =>
                $this.hasClass ClassName.VISIBLE
            hidden: =>
                not $this.hasClass ClassName.VISIBLE
            closable: =>
                settings.closable

        get:
            rect: =>
                module.set.visible()
                rect = element.getBoundingClientRect()
                module.set.hidden()
                return rect
            value: (element) =>
                ts(element).attr 'data-value'

        trigger:
            show: (x, y) =>
                debug '發生 SHOW 事件', element, document.elementFromPoint(x, y), x, y
                settings.onShow.call element, document.elementFromPoint(x, y), x ,y
            hide: =>
                debug '發生 HIDE 事件', element
                settings.onHide.call element

        bind:
            events: =>
                # FIX: 重複的 Event Listner。
                $body.on Event.CLICK, =>
                    debug '發生 CLICK 事件', element
                    module.hide() if module.is.closable()
                $parent.on Event.CONTEXTMENU, (event) =>
                    debug '發生 CONTEXTMENU 事件', element
                    event.preventDefault()
                    if module.is.disable()
                        return
                    if not settings.touch and ts.isTouchDevice()
                        return
                    module.show event.clientX, event.clientY
                $item.on Event.CLICK, ->
                    debug '發生 CLICK 事件', element
                    $this.trigger Event.SELECT, element, module.get.value(@), @
                $this.on Event.SELECT, (event, context, value, element) =>
                    debug '發生 SELECT 事件', element, value
                    settings.onSelect.call context, event, value, element
                $this.on Event.DISABLE, (event, context) =>
                    debug '發生 DISABLE 事件', element
                    settings.onDisable.call context, event
                $this.on Event.ENABLE, (event, context) =>
                    debug '發生 ENABLE 事件', element
                    settings.onEnable.call context, event

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化複合式選單', element
            module.set.enable()
            module.bind.events()

        instantiate: =>
            debug '實例化複合式選單', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀複合式選單', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            $body.off   EVENT_NAMESPACE
            $item.off   EVENT_NAMESPACE
            $parent.off EVENT_NAMESPACE
            return $allModules