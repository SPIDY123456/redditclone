import { Link } from 'react-router-dom';

const PostWithComments = ({ post }) => {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post._id}/comments`} className="comment-icon">
                💬 {post.comments.length} Comments
            </Link>
        </div>
    );
};

export default PostWithComments;
