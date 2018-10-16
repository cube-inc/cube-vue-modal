import { mount } from '@vue/test-utils'
import Modal from '@/components/CubeModal'

describe(Modal.name, () => {
  it('sets default props properly', () => {
    const wrapper = mount(Modal)
    expect(wrapper.name()).toBe('CubeModal')
    expect(wrapper.props()).toHaveProperty('value', false)
    expect(wrapper.props()).toHaveProperty('transition', 'animate')
  })
})
