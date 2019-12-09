import * as React from 'react';
import * as Api from '@app/lib/api'
import { ContextSelector, ContextSelectorItem } from '@patternfly/react-core';

interface ProductSelection {
    id: string,
    name: string,
}
interface ProductSelectorState {
    isOpen: boolean;
    selected?: string;
    searchValue: string;
    filteredItems: ProductSelection[];
    items: ProductSelection[];
}

export class ProductSelector extends React.Component<{}, ProductSelectorState> {
    finalizeSelector(componets) {
        const items = componets.map((function(component, idx) {
            return { id: component['key'], name: component['name']};
        }))
        this.setState({items: items, filteredItems: items, searchValue: ''});
    };

    onToggle(event, isOpen) {
        this.setState({
            isOpen
        });
    };

    onSelect(event, value) {
        this.setState({
            selected: value,
            isOpen: !this.state.isOpen
        });
    };

    onSearchInputChange(value) {
        this.setState({ searchValue: value });
    };

    onSearchButtonClick(event) {
        const filtered =
            this.state.searchValue === ''
            ? this.state.items
            : this.state.items.filter(item => item.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1);

        this.setState({ filteredItems: filtered || [] });
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selected: undefined,
            searchValue: '',
            filteredItems: [],
            items: []
        };
        Api.components().then(data => this.finalizeSelector(data));
        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  render() {
      const { isOpen, selected, searchValue, filteredItems } = this.state;
      return (
        <ContextSelector
          toggleText={selected}
          onSearchInputChange={this.onSearchInputChange}
          isOpen={isOpen}
          searchInputValue={searchValue}
          onToggle={this.onToggle as any}
          onSelect={this.onSelect}
          onSearchButtonClick={this.onSearchButtonClick}
          screenReaderLabel="Selected Project:"
        >
          {filteredItems.map((item, index) => (
            <ContextSelectorItem key={index}>{item.name}</ContextSelectorItem>
          ))}
        </ContextSelector>
      );
  }
}
