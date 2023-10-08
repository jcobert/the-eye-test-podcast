import React from "react";

function TwitterSkeleton(props) {
  const count = props?.count || 1;
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr?.push(i);
  }

  const style =
    !!props?.width || !!props?.height
      ? {
          width: props?.width,
          height: props?.height,
        }
      : undefined;

  return (
    <div
      className="flex flex-col p-8 border rounded-lg h-fit overflow-clip gap-y-4 animate-pulse bg-gray-50"
      style={style}
    >
      {arr?.map(() => (
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-wrap items-center w-full gap-4">
            <div className="flex-none w-12 h-12 bg-gray-200 rounded-full" />
            <div className="w-1/2 h-4 bg-gray-200 rounded-3xl" />
          </div>

          <div className="w-full h-4 bg-gray-200 rounded-3xl" />
          <div className="w-full h-4 bg-gray-200 rounded-3xl" />
          <div className="w-full h-4 bg-gray-200 rounded-3xl" />

          <div className="w-full border-b" />
        </div>
      ))}
    </div>
  );
}

export default TwitterSkeleton;
