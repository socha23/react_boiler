import renderer from 'react-test-renderer'

module.exports = {
    testSnapshot: (elem) => {
        return () => {
            expect(renderer.create(elem).toJSON()).toMatchSnapshot();
        }
    }
};