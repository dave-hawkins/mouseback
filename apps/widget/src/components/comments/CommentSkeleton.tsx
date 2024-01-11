const CommentSkeleton = () => {
  return (
    <div className="py-2 w-full space-y-2 flex flex-col border-b border-border/50">
      <div className="flex items-center px-2">
        <div className="h-5 w-5 rounded-full mr-2 bg-gray-200" />
        <div className="w-1/2 bg-gray-50 rounded-full h-4"></div>
      </div>
      <div className="w-1/2 bg-gray-50 rounded-full h-4 mx-2"></div>
    </div>
  );
};

export default CommentSkeleton;
