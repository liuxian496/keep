import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import 'jsdom-global/register';
//require('jsdom-global')();