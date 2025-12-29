const CommentsContainer = () => {

    const commentsData = [
        {
            name: "User1",  
            text: "This is a great video!",
            replies: [
                {
                    name: "User1",  
                    text: "This is a great video!",
                    replies: [],
                }
            ]
        },
        {
            name: "User1",  
            text: "This is a great video!",
            replies: [
                {
                    name: "User1",  
                    text: "This is a great video!",
                    replies: [
                        {
                            name: "User1",  
                            text: "This is a great video!",
                            replies: [
                                {
                                    name: "User1",  
                                    text: "This is a great video!",
                                    replies: [
                                        {
                                            name: "User1",  
                                            text: "This is a great video!",
                                            replies: [
                                                {
                                                    name: "User1",  
                                                    text: "This is a great video!",
                                                    replies: [],
                                                }   
                                            ],
                                        }
                                    ],
                                }
                            ],
                        }
                    ],
                }
            ]
        },
        {
            name: "User1",  
            text: "This is a great video!",
            replies: [
                
            ]
        },
        {
            name: "User1",  
            text: "This is a great video!",
            replies: [
                
            ]
        },
        {
            name: "User1",  
            text: "This is a great video!",
            replies: [
                
            ]
        },
        {
            name: "User1",  
            text: "This is a great video!",
            replies: [
                
            ]
        },
    ];

    const Comment = ({data}) => {
        const { name, text, replies } = data;
        return (
            <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
                <img
                    className="w-12 h-12 rounded-full" 
                    alt="user"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAbFBMVEX///8AAAAsLCz8/PwEBAT5+fn09PTt7e3w8PDg4OB/f3+tra2CgoJBQUHc3Nzk5OQPDw+NjY1NTU3Hx8d5eXm8vLybm5tkZGQ4ODheXl5wcHC2trbQ0NDW1tZpaWlISEijo6MjIyMXFxdWVlYkIv9JAAAEsUlEQVR4nO2aa3OyOhCAE5cQ5I4IUrzg5f//x5MEUV+1NiiB9UyeD+10OmOf2W52NxdCLBaLxWKxWCwWi8VisVj+n8DlyxchfQG6b98FSGMA+C7xr5JVQJcaPN9n9Wq1y/Y5b3+BGgAGjLjz4JTSC+kpmLuEMMzpLjOa5eHsIu046lsV5gz1OhVq8+yghB3afVNfZlmMWFxk+HpxjXMXdIfKnxdBWyDR2YvkJiy7Vb4nY2rxIjOX0XTrF9qCmqs1OrXqHUB4SOmLiItfhRxdwAVu5rzylpnvZB66JcrI+nWetKxxrU7psjm8jPeZw2Zq11tUmfv5twr+lucrbKmSUz1xmk9teoto9Cf6sqR04g49ISqIQqQ4/p3fLccCjzgBd6nr7dAlIDKfL7S96WKORhxIcdCNuKiIBZomBFDqe1O6xxNx/RSXhC4WccJXfcR3HE3Ik0an3Xcskql9L8yjPhGP5lP7XoirPuIVnnr4tREXOd6DBk+Oi6rSY3Gu+NS+HeD6fSLuu1hyHEjPzolFnPSaVWbF1LY3yOlQJ8vlsZaYDtnUvh1AQr1oy91diOpsJT92B51/iR9zNFOtOhGUY5aW+ArRgbP02OglOaUbguzgs9YT3+EphWe2lY75bItOXPfsEJs3ACtfR1z+tmSEoTMnbvjbMZxzvk8J3aktnyAqhZy1nke9rfE+Rm9V49wyfeqtSEs0U+Et6k6ZkfzplkKGOyoAX35fAMLLinap7lxzflai2T08RfXQbHFdkq33IkN1Kv6IeqBCWLyub7b91XIdyztQtGly9paPDcDlm6AM/WVYBlvOCM4r5RboTr2fDFDqPrl9LoTPHuSVOI+9Z3KtthdzwDPRXhA+82AX+ZvftmW5H+0CPEdBV3K/kfdA1ap4Uvi8YieX67EJ8ZQXkLfKJPaPXadJmyz/p7e7edikXXFP/VgWnumXqnzLBPHDXrnxy6AQBKX/0Ev9OYbXH0KAB7dnns7jiHj9uW1JUeBNH3Eg2zpVas5F8m6/f/Oo4jzeOsvttHeG8v+9rrpAPgb4Zsa6+4dEa9WVJjoZEl2cLanu9v6OJZuyISX1u96U1olqWpOw/XlXW6bLabId/1bvycRTcdqaj4/I76R6O03OyGussfO89f5QnEbJ6OMuJOqY8xNxWUNXo19keT4dQtwJvfGc1XY+UAcRH2VKu6EOZJqPUxZBLEy9t2Na8sVoC1T8FS/SuoDQIvJG3JBmd+PJ28hPCUeSFuSHwQIuPuaQjxVwvhvE+cKOjyQefNx47gjGmW8TrWe0ffgZoQ1BG/BhxdPAeF2RzUfufgcVd2jDRqiI+dAZfn7jbFy811M9PW8xbJkWBxIP7d0OW6Z3Qz3f1OhTmk4VNnimtPyYHm83vZ4Y6lNtDId8/+JC8BPSvVFtwnq9d9NHzIhmu37y9knKXxhu+9uPjyR+ozJ7yFKkZrwdmhp81QcE9oYCLj50b6yqyEuTzIR1K54ZW50i4G499ER7Na9NPgrxBt9DXDHaO3ljSFx8amPsfYVIFW6o4ctUqcyJA/CDKXFKD6Y6kDwmS6LDzBSRudY5/a2qxWKxWCwWi8VisVgsFovFYhmL/wAIJDWPptFE0wAAAABJRU5ErkJggg=="
                />
                <div className="px-3">
                    <p className="font-bold">{name}</p>
                    <p>{text}</p> 
                </div>
            </div>
        );
    };   

    const CommentsList = ({comments}) => { 
        return comments.map((comment, index) => (
            <div key={index}>
                <Comment data={comment} />
                <div className="pl-5 border border-l-black ml-5">
                    {/* <Comment key={index} data={comment} />
                    <Comment key={index} data={comment} />
                    <Comment key={index} data={comment} /> */}
                    <CommentsList comments={comment.replies} />
                </div>
            </div>
        ));
    };

    return (
        <div className="m-5 p-2">
            <h1 className="text-2xl font-bold">Comments:</h1>
            {/* <Comment data={commentsData[0]} /> */}
            <CommentsList comments={commentsData} />
        </div>
    )
}

export default CommentsContainer