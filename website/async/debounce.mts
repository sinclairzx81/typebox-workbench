export type DebounceCallback = () => Promise<unknown> | unknown
export type ErrorCallback = (error: Error) => void

export class Debounce {
  private callback: DebounceCallback | null
  private waiting: boolean

  /**
   * Creates a new Debounce
   * @param millisecond The maximum millisecond window for this debounce
   * @param deferred Should the debounce defer the last callback to execute once a debounce window ends
   */
  constructor(private readonly millisecond: number, private readonly deferred: boolean = false) {
    this.callback = null
    this.waiting = false
  }

  public run(callback: DebounceCallback, errorCallback: ErrorCallback = () => {}) {
    if (this.deferred) {
      this.#runDeferred(callback, errorCallback)
    } else {
      this.#runDefault(callback, errorCallback)
    }
  }

  async #runDeferred(callback: DebounceCallback, errorCallback: ErrorCallback) {
    if (this.waiting) {
      this.callback = callback
      return
    }
    this.waiting = true
    this.#execute(callback).catch(errorCallback)
    await this.#delay()
    while (this.callback !== null) {
      this.#execute(this.callback).catch(errorCallback)
      this.callback = null
      await this.#delay()
    }
    this.waiting = false
  }

  async #runDefault(callback: DebounceCallback, errorCallback: ErrorCallback) {
    if (this.waiting) return
    this.waiting = true
    this.#execute(callback).catch(errorCallback)
    await this.#delay()
    this.waiting = false
  }

  async #execute(callback: DebounceCallback) {
    await callback()
  }

  #delay() {
    return new Promise((resolve) => setTimeout(resolve, this.millisecond))
  }
}
