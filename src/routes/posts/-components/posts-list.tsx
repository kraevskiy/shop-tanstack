interface PostsListProps {
  children: React.ReactNode;
}

const PostsList = ({children}: PostsListProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
};

export default PostsList;
