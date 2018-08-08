import Enzyme, { configure, shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import localStorage from './__mocks__/localStorage'

configure({ adapter: new Adapter() })

global.shallow = shallow
global.render = render
global.mount = mount
global.localStorage = localStorage

Object.values = obj =>
  Object.keys(obj)
    .map(key => obj[key])