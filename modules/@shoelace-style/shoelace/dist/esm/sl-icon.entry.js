import { r as registerInstance, c as createEvent, a as getAssetPath, h } from './index-d587ef97.js';

const cache = new Map();
const requests = new Map();
const requestIcon = (url) => {
    let req = requests.get(url);
    if (!req) {
        req = fetch(url).then(async (res) => {
            if (res.ok) {
                const div = document.createElement('div');
                div.innerHTML = await res.text();
                const svg = div.firstElementChild;
                if (svg && svg.tagName.toLowerCase() === 'svg') {
                    cache.set(url, div.innerHTML);
                    return svg.outerHTML;
                }
                else {
                    console.warn(`Invalid SVG icon: ${url}`);
                    return '';
                }
            }
            else {
                return '';
            }
        });
        requests.set(url, req);
    }
    return req;
};

const iconCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block;width:1em;height:1em;contain:strict;box-sizing:content-box !important}.icon,svg{display:block;height:100%;width:100%}";

const parser = new DOMParser();
const Icon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.slLoad = createEvent(this, "slLoad", 7);
        this.slError = createEvent(this, "slError", 7);
    }
    handleChange() {
        this.setIcon();
    }
    componentDidLoad() {
        this.setIcon();
    }
    getLabel() {
        let label = '';
        if (this.label) {
            label = this.label;
        }
        else if (this.name) {
            label = this.name.replace(/-/g, ' ');
        }
        else if (this.src) {
            label = this.src.replace(/.*\//, '').replace(/-/g, ' ').replace(/\.svg/i, '');
        }
        return label;
    }
    setIcon() {
        const url = this.name ? getAssetPath(`./icons/${this.name}.svg`) : this.src;
        requestIcon(url)
            .then(source => {
            const doc = parser.parseFromString(source, 'text/html');
            const svg = doc.body.querySelector('svg');
            if (svg) {
                this.svg = svg.outerHTML;
                this.slLoad.emit();
            }
            else {
                this.svg = '';
                this.slError.emit();
            }
        })
            .catch(error => this.slError.emit(error));
    }
    render() {
        return h("div", { part: "base", class: "icon", role: "img", "aria-label": this.getLabel(), innerHTML: this.svg });
    }
    static get assetsDirs() { return ["icons"]; }
    static get watchers() { return {
        "name": ["handleChange"],
        "src": ["handleChange"]
    }; }
};
Icon.style = iconCss;

export { Icon as sl_icon };
