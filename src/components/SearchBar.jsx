import React, { useState, useCallback, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

function SearchBar(props) {
  const items = props.items;
  const [query, setQuery] = useState("");

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a href={uri} className="underline text-theme-primary">
            {children}
          </a>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2 className="text-2xl">{children}</h2>;
      },
    },
  };

  if (props.source === "blog") {
  }
  let itemType = "";
  switch (props.source) {
    case "blog":
      itemType = "posts";

      break;
    case "podcast":
      itemType = "episodes";
      break;
    default:
      break;
  }

  useEffect(() => {
    handleSearch();
  }, [query]);

  const filteredItems = query
    ? items.filter(
        (item) =>
          item.node.title.toLowerCase().includes(query.toLowerCase()) ||
          (props.source === "blog"
            ? item.node.description.raw
                .toLowerCase()
                .includes(query.toLowerCase())
            : item.node.description.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  function filterItemsBySearch(key) {
    return props.cards.filter(function (card) {
      return (
        (props.source === "blog"
          ? card.props.post.title.toLowerCase().includes(key)
          : card.props.node.title.toLowerCase().includes(key)) ||
        (props.source === "blog"
          ? card.props.post.description.raw.toLowerCase().includes(key)
          : card.props.node.description.toLowerCase().includes(key))
      );
    });
  }

  const handleSearch = useCallback(() => {
    if (query === "" || filteredItems.length === 0) {
      props.setSelectionState(props.cards);
    } else {
      props.setSelectionState(filterItemsBySearch(query.toLowerCase()));
      props.setFilteredState(true);
    }
  });

  return (
    <div className="w-full mx-auto">
      <Combobox
        onChange={(item) => {
          setQuery(item.node.title);
        }}
        as="div"
        className="bg-white border border-gray-300 rounded-md shadow-sm text-left overflow-hidden"
      >
        <div className="flex items-center px-3 py-2">
          <SearchIcon className="h-6 w-6" aria-hidden="true" />
          <Combobox.Input
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            className="w-full ml-3 block focus:outline-none"
            placeholder={`Search ${itemType}...`}
          />
        </div>
        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute z-50 mt-1 py-1 bg-white border border-gray-200 shadow-md rounded-md max-h-60 overflow-y-auto overflow-ellipsis">
            {filteredItems.map((item) => (
              <Combobox.Option key={item.id} value={item}>
                {({ active }) => (
                  <div
                    className={`px-4 py-2 font-medium ${
                      active ? "text-white bg-theme-primary" : "text-gray-900"
                    }`}
                  >
                    <span>{item.node.title}</span>
                    <p
                      className={`font-light text-sm ${
                        active ? "text-slate-200" : "text-gray-400"
                      }`}
                    >
                      {props.source === "blog"
                        ? renderRichText(item.node.description, options)
                        : item.node.description
                            .replace(item.node.title, "")
                            .trim()
                            .replaceAll("\n", " ")
                            .slice(0, 120) + " ..."}
                    </p>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {query && filteredItems.length === 0 && (
          <div className="absolute z-50 mt-1 py-1 bg-white border border-gray-100 shadow-sm rounded-md">
            <p className="text-gray-500 text-sm px-4 py-2">
              Hmm can't find any {itemType}.
            </p>
          </div>
        )}
      </Combobox>
    </div>
  );
}

export default SearchBar;
