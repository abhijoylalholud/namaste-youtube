import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {

    //const params = useParams();
    const [searchParams] = useSearchParams();
    //console.log(searchParams.get("v"));

    const dispatch = useDispatch();
    useEffect(() => {
        //dispatch an action to close the menu
        dispatch(closeMenu());
    }, []);
    return (
        <div className="flex flex-col w-full">
            <div className="px-5 flex">
                <div>
                    <iframe     
                        width="1200"    
                        height="600" 
                        src={`https://www.youtube.com/embed/${searchParams.get("v")}?si=jTKSLsPoGlm-kC9g`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="w-full">
                    <LiveChat />
                </div>
            </div>
            <CommentsContainer />
        </div>
    )
}

export default WatchPage