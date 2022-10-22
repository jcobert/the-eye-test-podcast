import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, FilterIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FilterListbox(props) {
  const [selected, setSelected] = React.useState("Any");

  const items = props.options;
  const searchTerms = {
    category: {
      Betting: ["bets", "gambl", "picks", "over/under", "moneyline"],
      Baseball: ["baseball", "mlb", "mets", "yankees"],
      Football: ["football", "nfl", "jets"],
      Golf: ["golf", "pga", "masters", "us open"],
      Basketball: ["basketball", "nba", "knicks", "nets"],
      UFC: ["ufc", "mma ", "peruvian necktie", "octagon", "dana white"],
    },
  };

  let keywords = null;
  if (props.filter === "category") {
    keywords = searchTerms.category;
  }

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

  function filterBlogPostsByAuthor(author) {
    return props.cards.filter(function (blogPost) {
      return blogPost.props.post.author.name === author;
    });
  }

  const handleFilter = React.useCallback(() => {
    if (selected === "Any") {
      props.setSelectionState(props.cards);
      props.setFilteredState(false);
    } else {
      if (props.source === "blog") {
        if (props.filter === "category") {
          props.setSelectionState(filterBlogPostsByKeywords(selected));
        } else if (props.filter === "author") {
          props.setSelectionState(filterBlogPostsByAuthor(selected));
        }
      } else if (props.source === "podcast") {
        props.setSelectionState(filterEpisodesByKeywords(selected));
      }
      props.setFilteredState(true);
    }
  });

  const handleChange = React.useCallback((e) => {
    if (props.filter === "author") {
      setSelected(e[0]);
    } else {
      setSelected(e);
    }
    props.resetState(false);
  });

  return (
    <div className="w-full">
      <Listbox value={props.reset ? "Any" : selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm text-gray-700">
              {props.title}
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full text-slate-700 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#7396c8] focus:border-[#7396c8]">
                <span className="flex items-center">
                  <FilterIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="ml-3 block truncate">
                    {props.reset ? "Any" : selected}
                  </span>
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
                // enter="transition ease-in duration-100"
                // enterFrom="opacity-0"
                // enterTo="opacity-100"
                // leave="transition ease-out duration-100"
                // leaveFrom="opacity-100"
                // leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full divide-y divide-slate-100 bg-white shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {items.map((item, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-white bg-theme-primary"
                            : "text-slate-700",
                          "cursor-default select-none relative pl-3 pr-9",
                          props.filter !== "author" ? "py-4 md:py-2" : "py-2"
                        )
                      }
                      value={item}
                      onClick={handleFilter}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "" : "",
                                "ml-3 block truncate"
                              )}
                            >
                              {props.filter === "author" && i > 0 ? (
                                <div className="flex flex-col items-start">
                                  <span>{item[0]}</span>
                                  <span
                                    className={` text-sm ${
                                      active
                                        ? "text-slate-50"
                                        : "text-slate-500"
                                    }`}
                                  >
                                    {item[1]}
                                  </span>
                                </div>
                              ) : (
                                item
                              )}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-theme-primary",
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
