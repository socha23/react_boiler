const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-15');

require("jest-enzyme/lib/index")


// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });