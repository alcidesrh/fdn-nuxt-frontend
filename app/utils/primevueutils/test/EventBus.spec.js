import EventBus from '../EventBus'

describe('eventBus', () => {
  it('when eventbus is on, callback should be emitted', () => {
    const eventBus = new EventBus()
    const callback = vi.fn()

    eventBus.on('test', callback)
    eventBus.emit('test')

    expect(callback).toHaveBeenCalled()
  })

  it('when eventbus is off, callback should be emitted', () => {
    const eventBus = new EventBus()
    const callback = vi.fn()

    eventBus.on('test', callback)
    eventBus.off('test', callback)
    eventBus.emit('test')

    expect(callback).not.toHaveBeenCalled()
  })
})
