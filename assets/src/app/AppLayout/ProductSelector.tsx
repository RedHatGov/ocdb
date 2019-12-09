import * as React from 'react';
import * as Api from '@app/lib/api'
import { ContextSelector, ContextSelectorItem } from '@patternfly/react-core';
import { withRouter } from 'react-router-dom';

interface ProductSelection {
    id: string,
    name: string,
}

interface ProductSelectorState {
    visible: boolean;
    isOpen: boolean;
    selected?: string;
    searchValue: string;
    filteredItems: ProductSelection[];
    items: ProductSelection[];
}

class BaseProductSelector extends React.Component<any, ProductSelectorState> {
    static visible() {
        return window.location.pathname.startsWith('/ato/products')
    }

    static getDerivedStateFromProps(props, state) {
        state.visible = BaseProductSelector.visible();
        return state;
    }

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

    filterItems(searchValue) {
        return searchValue === ''
             ? this.state.items
             : this.state.items.filter(item => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
    }

    onSearchInputChange(searchValue) {
        this.setState({ searchValue, filteredItems: this.filterItems(searchValue) });
    };

    onSearchButtonClick(event) {
        this.setState({ filteredItems: this.filterItems(this.state.searchValue) });
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
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
      const { isOpen, selected, searchValue, filteredItems, visible } = this.state;
      if (!visible) {
          return ''
      }

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

export const ProductSelector = withRouter(BaseProductSelector);
