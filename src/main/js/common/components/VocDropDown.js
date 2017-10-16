import React from 'react'
import Select from 'react-select'
import VocIcon from './VocIcon'

function optionRenderer(item) {
    return <span><VocIcon value={item} className="iconWithName"/>{item.name}</span>
}

export default class VocDropDown extends React.Component {


    onChange = (i) => {
        this.props.onChange(i.id);
    };

    render() {
        return <Select
          value={this.props.value}
          options={this.props.items}
          valueKey="id"
          optionRenderer={optionRenderer}
          valueRenderer={optionRenderer}
          onChange={this.onChange}
          clearable={false}
          id={this.props.id}
        />
    };
}

