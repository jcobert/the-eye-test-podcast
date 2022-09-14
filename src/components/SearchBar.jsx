import React, { useState, useCallback, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";

function SearchBar(props) {
  const episodes = props.episodes;
  const [query, setQuery] = useState("");

  useEffect(() => {
    handleSearch();
  }, [query]);

  const filteredEpisodes = query
    ? episodes.filter(
        (episode) =>
          episode.node.title.toLowerCase().includes(query.toLowerCase()) ||
          episode.node.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function filterEpisodesBySearch(key) {
    return props.cards.filter(function (ep) {
      return (
        ep.props.node.title.toLowerCase().includes(key) ||
        ep.props.node.description.toLowerCase().includes(key)
      );
    });
  }

  const handleSearch = useCallback(() => {
    if (query === "" || filteredEpisodes.length === 0) {
      props.setSelectionState(props.cards);
    } else {
      props.setSelectionState(filterEpisodesBySearch(query.toLowerCase()));
      // props.setFilteredState(true);
    }
  });

  return (
    <div className="w-full mx-auto md:ml-0 md:mr-4">
      <Combobox
        onChange={(episode) => {
          setQuery(episode.name);
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
            placeholder="Search episodes..."
          />
        </div>
        {filteredEpisodes.length > 0 && (
          <Combobox.Options className="absolute z-50 mt-1 py-1 bg-white border border-gray-200 shadow-md rounded-md max-h-32 overflow-y-auto overflow-elipsis">
            {filteredEpisodes.map((episode) => (
              <Combobox.Option key={episode.id} value={episode}>
                {({ active }) => (
                  <div
                    className={`px-4 py-2 space-x-2 font-medium ${
                      active ? "text-white bg-[#3c76bd]" : "text-gray-900"
                    }`}
                  >
                    <span>{episode.node.title}</span>
                    {/* <span>
                      {episode.nicknames.map((nickname, i) => (
                        <span
                          className={`font-light text-sm ${
                            active ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {nickname}
                          {`${episode.nicknames.length - 1 === i ? "" : ", "}`}
                        </span>
                      ))}
                    </span> */}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {query && filteredEpisodes.length === 0 && (
          <div className="absolute z-50 mt-1 py-1 bg-white border border-gray-100 shadow-sm rounded-md">
            <p className="text-gray-500 text-sm px-4 py-2">
              Hmm can't find anyone by that name.
            </p>
          </div>
        )}
      </Combobox>
    </div>
  );
}

export default SearchBar;
