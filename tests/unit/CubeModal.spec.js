import { mount } from '@vue/test-utils'
import Modal from '@/components/CubeModal.vue'

describe(Modal.name, () => {
  it('sets default props properly', () => {
    const wrapper = mount(Modal)
    expect(Modal.name).toBe('CubeModal')
    expect(wrapper.props()).toHaveProperty('value', false)
    expect(wrapper.props()).toHaveProperty('closeButton', true)
    expect(wrapper.props()).toHaveProperty('transitionName', 'animate')
    expect(wrapper.props()).toHaveProperty('target')
    expect(wrapper.props().target).toBeInstanceOf(HTMLBodyElement)
  })
})
