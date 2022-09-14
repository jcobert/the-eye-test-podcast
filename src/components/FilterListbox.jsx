import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, FilterIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FilterListbox(props) {
  const [selected, setSelected] = React.useState("All");
  const tags = props.options;

  React.useEffect(() => {
    handleFilter();
  }, [selected]);

  // TODO - node.tags does not yet exist and will be an array
  function filterEpisodesByTag(key) {
    // return props.cards.filter(function (episode) {
    //   return episode.props.node.tags.indexOf(key) >= 0;
    // });
  }

  const handleFilter = React.useCallback(() => {
    if (selected === "All") {
      props.setSelectionState(props.cards);
      props.setFilteredState(false);
    } else {
      props.setSelectionState(filterEpisodesByTag(selected));
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
                  {/* <span className="ml-3 block truncate">{currentAssortment.filter === false ? "All" : selected}</span> */}
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
