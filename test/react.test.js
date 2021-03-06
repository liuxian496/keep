import App from '../src/App';
import Apple from '../src/Apple';

describe('<App />', () => {
    it('Apple without crashing in shallow mode.', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Apple)).to.have.length(1);
    });
});