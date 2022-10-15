import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import ContributorCard from "./ContributorCard";

function PostPreview(props) {
  const [open, setOpen] = React.useState(false);

  const image = getImage(props.post.heroImage);
  const avatar = getImage(props.post.author.image);
  const layout = props.layout;

  let avatarComponent = "";
  if (layout !== "compact") {
    avatarComponent = (
      <GatsbyImage
        image={avatar}
        alt="author photo"
        className="rounded-full border border-theme-primary"
      />
    );
  }

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

  // scroll animation options
  const sal = {
    type: "slide-up",
    easing: "ease-out-expo",
    duration: "700",
  };

  return (
    <div
      className="flex flex-col"
      data-sal={props.animate ? sal.type : ""}
      data-sal-easing={sal.easing}
      data-sal-duration={sal.duration}
    >
      <div className="md:max-w-2xl mx-auto flex-1">
        {/* Date Published */}
        <div
          className={`${layout === "compact" ? "hidden" : "text-slate-600"}`}
        >
          {props.post.publishDate}
        </div>
        {/* Body */}
        <div className="bg-slate-50 rounded border border-slate-400 shadow-md h-full flex flex-col justify-between">
          <div className="flex flex-col gap-y-6 text-left px-8 pt-6 md:pt-8 h-full justify-between">
            <div className="grid grid-flow-row">
              {/* Preview Image */}
              <div
                className={`rounded-lg ${
                  layout === "compact"
                    ? "row-start-3 row-span-1"
                    : "row-start-1"
                }`}
              >
                <GatsbyImage
                  image={image}
                  alt="blog post image"
                  className={`rounded-lg shadow-md w-full mx-auto border border-slate-300 ${
                    layout === "compact" ? "h-28" : "h-36 sm:h-56"
                  }`}
                />
              </div>
              {/* Title */}
              <div
                className={`text-center font-medium text-theme-primary ${
                  layout === "compact"
                    ? "row-start-1 row-span-1 text-2xl"
                    : "row-start-2 py-4 text-3xl"
                }`}
              >
                <h4>{props.post.title}</h4>
              </div>
              {/* Author */}
              <div
                className={`text-center ${
                  layout === "compact"
                    ? "row-start-2 row-span-1 pb-4"
                    : "row-start-3"
                }`}
              >
                <div className="flex justify-center items-center gap-x-2">
                  {/* Avatar */}
                  <div
                    className={`${
                      layout === "compact" ? "hidden" : "w-10 lg:w-12 md:mx-2"
                    } cursor-pointer`}
                    onClick={() => setOpen(true)}
                  >
                    {avatarComponent}
                  </div>
                  {/* Name */}
                  <div className="flex flex-col cursor-pointer group" onClick={() => setOpen(true)}>
                    <p className="text-slate-700 group-hover:text-theme-primary transition">
                      By {props.post.author.name}
                    </p>
                    {/* Title */}
                    <p
                      className={`${
                        layout === "compact"
                          ? "hidden"
                          : "text-slate-500 text-sm"
                      } group-hover:text-slate-400 transition`}
                    >
                      {props.post.author.title}
                    </p>
                  </div>
                </div>
              </div>
              <Transition.Root show={open} as={React.Fragment}>
                <Dialog as="div" className="relative z-40" onClose={setOpen}>
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50/95 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                          <ContributorCard contributor={props.post.author} />
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>
            {/* Date (compact layout only) */}
            <div
              className={`${
                layout === "compact" ? "text-slate-600" : "hidden"
              }`}
            >
              {props.post.publishDate}
            </div>
            {/* Description */}
            <p
              className={`${
                layout === "compact" ? " leading-5" : "text-base sm:text-lg"
              }`}
            >
              {renderRichText(props.post.description, options)}
            </p>
            {/* CTA */}
            <div
              className={`bg-theme-primary hover:bg-gray-50 text-white hover:text-theme-primary text-lg h-16 md:h-14 mx-auto mt-4 mb-8 rounded-md border border-white hover:border-theme-primary transition-all ${
                layout === "compact"
                  ? "w-full"
                  : "w-full sm:w-10/12 md:w-5/12 lg:w-4/12"
              }`}
            >
              <Link
                to={`/blog/${props.post.slug}`}
                className="flex justify-center h-full gap-x-2"
              >
                <p className="self-center">Read more</p>
                <div className="self-center">
                  <ChevronRightIcon className="w-6" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
