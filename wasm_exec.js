// TinyGo WASM Runtime Stub
if (typeof window !== 'undefined') {
  window.Go = class Go {
    constructor() {
      this.argv = ['js'];
      this.env = {};
      this.exit = (code) => console.log('Go exit:', code);
      this._exitPromise = new Promise(resolve => this._resolveExitPromise = resolve);
    }
    async run(instance) {
      console.log('🐹 TINYGO: Runtime initialized');
    }
    importObject() {
      return {
        go: {
          'runtime.wasmExit': () => {},
          'runtime.wasmWrite': () => {},
          'runtime.nanotime1': () => Date.now() * 1000000,
        }
      };
    }
  };
}
