import crudReducer from 'common/crud/crudReducer'
import crudActions from 'common/crud/crudActions'

const LIST_1 = [
        {id: "1", value: "one"}
];

const LIST_2 = [
        {id: "1", value: "one"},
        {id: "2", value: "two"}
];

test('after receive items on empty state new items are added', () => {
    const crud = new TestCrud();
    crud.receive(LIST_2);
    expect(crud.items()).toEqual(LIST_2)
});

test('after receive items missing items are removed', () => {
    const crud = new TestCrud();
    crud.receive(LIST_2);
    crud.receive(LIST_1);

    expect(crud.items()).toEqual(LIST_1)
});

const LIST_2_CHANGED = [
        {id: "1", value: "one"},
        {id: "2", value: "two_changed"}
];

test('after receive items items are updated', () => {
    const crud = new TestCrud();
    crud.receive(LIST_2);
    crud.receive(LIST_2_CHANGED);

    expect(crud.items()[0].value).toEqual("one");
    expect(crud.items()[1].value).toEqual("two_changed");
});

test('receive items doesnt change original state', () => {
    const crud = new TestCrud();
    crud.receive(LIST_2);
    crud.receive(LIST_2_CHANGED);

    expect(crud.items()[1].value).toEqual("two_changed");
    expect(LIST_2[1].value).toEqual("two");
});

const LIST_2_COPY = [
        {id: "1", value: "one"},
        {id: "2", value: "two"}
];

test('receive items doesnt change list object if not changed', () => {
    const crud = new TestCrud();
    crud.receive(LIST_2);
    const oldItems = crud.items();

    crud.receive(LIST_2_COPY);

    expect(crud.items()).toBe(oldItems);
});

test('receive items doesnt change index object if not changed', () => {
    const crud = new TestCrud();
    crud.receive(LIST_2);
    const oldItems = crud.itemsById();

    crud.receive(LIST_2_COPY);

    expect(crud.itemsById()).toBe(oldItems);
});

test('receive items doesnt change unmodified items', () => {
    const crud = new TestCrud();
    crud.receive(LIST_2);
    crud.receive(LIST_2_CHANGED);

    expect(crud.items()[0]).toBe(LIST_2[0]);
});

test('receive items doesnt change unmodified items in itemsById', () => {
    const crud = new TestCrud();

    crud.receive(LIST_2);
    const ONE_A = crud.itemsById()["1"];

    crud.receive(LIST_2_CHANGED);
    const ONE_B = crud.itemsById()["1"];

    expect(ONE_A).toBe(ONE_B);
});

function TestCrud() {
    const reducer = crudReducer("test");
    const actions = crudActions("test");

    this.receive = (items) => {
        this.state = reducer(this.state, actions.receive(items));
        return this;
    };

    this.items = () => {
        return this.state.items;
    };

    this.itemsById = () => {
        return this.state.itemsById;
    };

    return this;
}
