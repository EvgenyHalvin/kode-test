import { React, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Selector from './Selector';

function Sidebar(props) {
  const { types, subtypes, getSelectedOptions, isGotItems, cards } = props;

  const [selectedItems, setSelectedItems] = useState({});
  const [menuList, setMenuList] = useState({ one: false, two: false });
  const [queryLint, setQueryLint] = useState({
    type: '',
    subtype: '',
  });

  const history = useHistory();
  const { search } = useLocation();

  const deserializeQuery = (query) => {
    const pairs = query.substring(1).split('&');
    const array = pairs.map((elem) => elem.split('='));
    const queryObject = Object.fromEntries(array);
    const re = /%20/g;
    setQueryLint({
      type: queryObject.type.replace(re, ' '),
      subtype: queryObject.subtype.replace(re, ' '),
    });
  };

  useEffect(() => {
    deserializeQuery(search);
  }, []);

  function handleQuery(item, typeSelector) {
    if (typeSelector === 'type') {
      setQueryLint({ ...queryLint, type: item });
    }
    if (typeSelector === 'subtype') {
      setQueryLint({ ...queryLint, subtype: item });
    }
  }

  useEffect(() => {
    let query = '';

    if (queryLint.type && !queryLint.subtype) {
      query = `type=${queryLint.type}`;
    }
    if (queryLint.subtype && queryLint.subtype) {
      query = `type=${queryLint.type}&subtype=${queryLint.subtype}`;
    }
    if (!queryLint.type && queryLint.subtype) {
      query = `subtype=${queryLint.subtype}`;
    }

    history.replace({ search: query });
  }, [queryLint]);

  useEffect(() => {
    getSelectedOptions(selectedItems);
  }, [selectedItems, getSelectedOptions]);

  useEffect(() => {
    console.log(queryLint);
    getSelectedOptions(queryLint);
  }, [queryLint, cards]);

  function getSelectedItems(item, typeSelector) {
    typeSelector === 'type'
      ? setSelectedItems({ ...selectedItems, type: item })
      : setSelectedItems({ ...selectedItems, subtype: item });
  }

  function toggleMenu(menuId) {
    setMenuList(() => {
      return Object.assign(
        { one: false, two: false },
        { [menuId]: !menuList[menuId] }
      );
    });
  }

  return (
    <div className="sidebar">
      <Selector
        menuId="one"
        menuList={menuList}
        toggleMenu={toggleMenu}
        selesctItem={getSelectedItems}
        isGotItems={isGotItems}
        listItems={types}
        typeSelector="type"
        queryLint={queryLint}
        handleQuery={handleQuery}
      />
      <Selector
        menuId="two"
        menuList={menuList}
        toggleMenu={toggleMenu}
        selesctItem={getSelectedItems}
        isGotItems={isGotItems}
        listItems={subtypes}
        typeSelector="subtype"
        queryLint={queryLint}
        handleQuery={handleQuery}
      />
    </div>
  );
}

export default Sidebar;
