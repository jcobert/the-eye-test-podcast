import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, FilterIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FilterListbox(props) {
  const [selected, setSelected] = React.useState("All");
  const tags = props.options;
  const keywords = {
    Betting: ["bets", "gambl", "picks", "over/under", "moneyline"],
    Baseball: ["baseball", "mlb", "mets", "yankees"],
    Football: ["football", "nfl", "jets"],
    Golf: ["golf", "pga", "masters"],
    Basketball: ["basketball", "nba", "knicks", "nets"],
  };
  React.useEffect(() => {
    handleFilter();
  }, [selected]);

  // TODO - node.tags does not yet exist and will be an array
  function filterEpisodesByTag(key) {
    // return props.cards.filter(function (episode) {
    //   return episode.props.node.tags.indexOf(key) >= 0;
    // });
  }

  function filterEpisodesByKeywords(category) {
    const keys = keywords[category];
    console.log(keys);
    return props.cards.filter(function (episode) {
      return (
        keys.some((key) =>
          episode.props.node.title.toLowerCase().includes(key)
        ) ||
        keys.some((key) =>
          episode.props.node.description.toLowerCase().includes(key)
        )
      );
    });
  }

  function filterBlogPostsByKeywords(category) {
    const keys = keywords[category];
    console.log(keys);
    return props.cards.filter(function (blogPost) {
      return (
        keys.some((key) =>
          blogPost.props.post.title.toLowerCase().includes(key)
        ) ||
        keys.some((key) =>
          blogPost.props.post.description.raw.toLowerCase().includes(key)
        )
      );
    });
  }

  const handleFilter = React.useCallback(() => {
    if (selected === "All") {
      props.setSelectionState(props.cards);
      props.setFilteredState(false);
    } else {
      if (props.source === "blog") {
        props.setSelectionState(filterBlogPostsByKeywords(selected));
      } else {
        props.setSelectionState(filterEpisodesByKeywords(selected));
      }
      props.setFilteredState(true);
    }
  });

  const handleChange = React.useCallback((e) => {
    setSelected(e);
  });

  return (
    <div className="w-full md:w-56">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {props.title}
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#7396c8] focus:border-[#7396c8]">
                <span className="flex items-center">
                  <FilterIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="ml-3 block truncate">{selected}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {tags.map((tag, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-[#3c76bd]" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={tag}
                      onClick={handleFilter}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {tag}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-[#3c76bd]",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default FilterListbox;
