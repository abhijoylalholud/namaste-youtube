const VideoCard = ({info}) => {
    console.log(info);
    const {snippet, statistics} = info;
    const {title, channelTitle, thumbnails} = snippet;
    return (
        <div className="p-2 m-2 w-72 shadow-lg">
            <img className="rounded-lg" src={thumbnails.medium.url} alt="video" />
            <ul>
                <li className="font-bold py-2">{title}</li>
                <li>{channelTitle}</li>
                <li>Views: {statistics.viewCount}</li>
            </ul>
        </div>
    )
}

export default VideoCard;