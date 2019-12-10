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
    selectedId?: string;
    searchValue: string;
    filteredItems: ProductSelection[];
    items: ProductSelection[];
}

export function GetActiveProductIdFromUrl() {
    if (window.location.pathname.startsWith('/ato/products/'))
        return window.location.pathname.replace(/\/ato\/products\/([\w-]+).*/, '$1');
    return undefined;
}

export function GetProductParamsFromUrl() {
    if (window.location.pathname.startsWith('/ato/products/')) {
        return window.location.pathname.replace(/\/ato\/products\/[\w-]+(\/.*)/, '$1');
    }
    return undefined;
}

class BaseProductSelector extends React.PureComponent<any, ProductSelectorState> {
    static visible() {
        return window.location.pathname.startsWith('/ato/products')
    }
    static getDerivedStateFromProps(props, state) {
        state.visible = BaseProductSelector.visible();
        const newProductId = GetActiveProductIdFromUrl();
        if (newProductId != state.selectedId)
            if (!newProductId || newProductId == 'select') {
                state.selectedId = newProductId
                state.selected = undefined
            } else if (state.items.length > 0) {
                state.selectedId = newProductId;
                state.selected = state.items.filter((function(p, i) { return p.id === newProductId; }))[0].name;
        }
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
        var productId = this.state.selectedId;
        if (value != this.state.selected) {
            const product = this.state.items.find((function(p, i) { return p.name === value }));
            productId = (product == undefined) ? '' : product.id;
            this.props.history.push('/ato/products/' + productId + GetProductParamsFromUrl());
        }

        this.setState({
            selected: value,
            selectedId: productId,
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
          toggleText={selected || 'Choose product'}
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
