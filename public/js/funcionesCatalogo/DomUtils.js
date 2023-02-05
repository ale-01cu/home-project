//TODO: Clase para detener el scroll.
export class DomUtils {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    static keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    static preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }

    static preventDefaultForScrollKeys(e) {
        if (DomUtils.keys[e.keyCode]) {
        DomUtils.preventDefault(e);
        return false;
        }
    }

    static disableScroll() {
        document.addEventListener('wheel', DomUtils.preventDefault, {
        passive: false,
        }); // Disable scrolling in Chrome
        document.addEventListener('keydown', DomUtils.preventDefaultForScrollKeys, {
        passive: false,
        });
    }

    static enableScroll() {
        document.removeEventListener('wheel', DomUtils.preventDefault, {
        passive: false,
        }); // Enable scrolling in Chrome
        document.removeEventListener(
        'keydown',
        DomUtils.preventDefaultForScrollKeys,
        {
            passive: false,
        }
        ); // Enable scrolling in Chrome
    }
}