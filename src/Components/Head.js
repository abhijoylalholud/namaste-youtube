import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);
    const dispatch = useDispatch();
    
    useEffect(() => {
        //const timer = setTimeout(() => getSearchSuggestions(), 200);
        const timer = setTimeout(() => {   
            if(searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions();
            }
        }, 200);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        //console.log("API call: " + searchQuery);
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        //console.log(json[1]);
        setSuggestions(json[1]);
        dispatch(
            cacheResults({
                [searchQuery]: json[1],
            })
        );
    };
    
    const toggleMenuHandler = () => {
        dispatch(toggleMenu())
    };

    return (
        <div className="grid grid-flow-col p-5 m-2 shadow-lg">
            <div className="flex col-span-1">
                <img 
                onClick={() => toggleMenuHandler()}
                className="h-8 cursor-pointer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg==" alt="menu" />
                <a href="/">
                <img className="h-8 mx-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAxlBMVEX////cAAApKSkAAAAfHx8iIiIbGxsTExNZWVmOjo7m5uYJCQkYGBjS0tKysrJPT09xcXGdnZ3mdHTs7Ozz8/MvLy/xtbW/v7/Gxsb39/fe3t799PTW1tZra2tDQ0OKior65eX0xsZjY2OAgIBVVVU3Nzeurq53d3ecnJzuoqL31tZ8fHylpaVGRkblkpLle3viTEzgXFzcKCj319frrKzqj4/cPj7haWngWlrxy8vqm5vhTk7fODjtsLDmhITzvr7dHBzaKyt6Y0M8AAALdElEQVR4nO2ca2OiPBOG0YC0godVW7VqRdtauz0fd7vP7nbf//+nXtRkJpy0mBCM5f7UIoaZixgmkwmGUahQoUKFChUqVOgrqZ+3Abujgff8/vFydXX3et96fHx4ePpX2qCnp7eHn4+t+9e7q6uX48l3b5C3D1lrMLm6az1s4vJ5vf14vZp4eXuVhf78lEcpqIerPetmr1mRWqm1R7jes0W10J+8fZSlq+xZlUr3eXspR0pY7QktBb/BlV7y9lSCVLEqlby8XRXWnTpYj3n7Kix1rPTvWscqYf3N21tB/VAJ6ylvbwWlklWppHcg76mF9Z63v0KaqIX1K29/hfRLLawfefsrJKXje6n0lre/QvpPLaxS3v4KSTErrR+HfdWwnvP2WECKIwe9Y4fnNI7+lgDrOG+PBTRJ4+i90RKGpXOg9SeNoy2/J74JwtJ5Kp0qJm0tvvEhBkvnqPRvaliCQf9/+forpFSDEIVlDASGrodc3RXT4zaw/KFr6wfj7xydFVWqJfsW98WtE6y5uSquVFPDVuCrWy745+SoDKX6OQVhGYOtMhb5+ClFTwKwDOP7FkNXHl5KUio/I7C2Gbo0TjuIwko/dH1pWMYgVfhR8pT6J1USYPlDV5qRz1PonWRJgWUYL18BVrpEaTKsFJNMjVOl0mAZg43V37rDktezPp3o0heWrJ6VIpj3lPkmXXJgpamH89Q5J1syYKXLnXoq3ZMrcVhps/JfOIJPnzTVGNYnn/dJsLZIx2u8904kn2VM0qPSOkUjkCn1tltCzMlRGdo6B7/1Ck9uroprW1hbb/fRuV45VRodYE1SPRcC0nndcJsVaU9kY7DOsFJt3FnBuhdApff2nRRZuxUs0b2JOm86TDWva4kMVlR3eXssoO9pHP2ZbmkiVjpv0FReUzrJ22MBDVTD0jhRqr4O3svbYRHJqEBOo7z9FZKEMTuNdJ7tpAzhxfUzb3+FpHSLtN6V3cpjh4+8/RWTWlhe3u6KSeK7xT6hvL0VlMIXhui9v2IhpYOWzhvollIYaf3L21dhKexaOs+iqZSNWjpnSUGKduDrPdUBKQkf/mlc5RCQ+HbejdJ5o2FImb/3T+eN5FF9ZDhy/dY5856g919/pRN7u/810bjKaJP63vvHy93r39bjw/+2Wfl6evj54/719er4ff/f3B1RZzAYtD3v+fvz+2Qy+fg45vXhH3r3P/I8zz/t68EpVEgT9TtM7bxN2X2NCShvU3Zfh5UyVe6wqtMm1egm8MFwBB/UBdrvQPvxGp1samGHYBnEpKqcBo7fwAekJ9B8G5qJF6ltamGXYF2aYEsgVJ5a7Lgj0nyblNfK0QpW1wa7h/xxhx22piLN7xcs9Mb9xh2uwmFbZMjaM1jGKfu9mZfc0Tp0OFIVaX3PYKExFe7oGI4eCbW+Z7BqMDoRLkS+AIJjodb3DJYB7ji9uIMbvVmrNsbfNiJy8ejGuGS3YI1Y8FA5hGM9R5aFMLPr94CWO8MJ38YGdgvWjDnBBQnfXHbsQNp18Pee6gG7W7AwSkBrICS1Z9KusxewDBhKMEog0UPC2g9YECaAE9jZxAKHgPYDFozm5hk9AiEpHJGg/YDVZ/3IYokH6GuOSMYhpP2AZZyz4ZwlHi7CB2RoT2BBoEAjUOxqgcBhODsbTafTy3ltc3QUI1mwTr75VlzXYzPy/drNwsbmeDaM+1iGThgcd5UtBbdczJ6eXPoxeMW0LMt0HXIQiOvbpw2mJj3UhUO3LPiIgQVfa1wkNhWCVTslrm+FaZPLSK+vTYnjLmw0K7ZDmhuTsNsJRviVgdDTCFyvSSBJuOxypMH1riqxqCqsK9YddsieM1eisFx2kkUSmwrCuiaQlKyUgx28cx600STXUiExXbOrmMt/R2AQs+OoUg7JdPHGYaQBv1tM8UCaLAYWOkcSmwrAOucmmGXrwuB04gRQLa/TkE6Kd20VgzKDTXpr+pYVtsM31YVRQxmsqVvmBZ3WSEhvuEJZ3gTBiL4MFdqB/3wdRO7Z0ptbxbDsbhiIiy6cxtxPv9luBrTYpZaJB0jL08CBt5HvY0404M8UVhmSbGABsJhB42XL5O9tBrDmLmchM886X30IUVfZchrnDuJicyFVsBYGBPJi5og5gEaR6dkIbZQZVTOBIwujWYzqroaEGtp/6ne1DnZ4lrlTBsue+k+VGdfR2e8Q82/24rnTv4hdWJAlZsAiWOD/NgIri8shvQPGMktUwbJXM9UbHOZZbAM2hiPFspUBLJYutbtor736CK7LOj3Ss5XCgqkrdi27GzrCUkr4CM2g9oY554/wbHynGQduBXEWBkFvrCJYsBwAiXDWkU7QRnrKAWQvM3gesnDBN5GlHOhl0G2H9nnOtK5KWDCRxt8hvaFwNYuFoZijk5fqRbE7UYGUMukELws9GqIytk6mGhaWHNCT4Bz2AMcZm+BSXrzY9UifRRE05sQKETAWHZomeJgtrCEO36ueBPMziCVgFQajC4liD1+brVjRwAGXW+NgNRI8zBYWd9JqzMdIgc2du5EfplTBoEUvzIpq8NEDy/v46HYTPMwWFgYvdOYfCWa4X2pgti1LLBS1gqb1w4b5Ogr5qBoWZ9PqGA6ibM0gY1g3wRk9u0eRu2gEYPXjPcwWlpEMiy2qIyyJ61MoDAgCDm2A1Y73cIdgZZO5D+Y4aODAWb+7sNrqYV3zmQ3IQhawYtXlch94Vb1gWaNufamxGf2WTHX4QQvmYXrBKlv2StGWJeuWG7ViAkAtYEWVEaw5Bg84SShgxWvI5Ylgrl7AShCO8CRmmauAFdB5NMGgG6wKiUg+p6Ua2sPiaoizVgErheJgaTo3zF5bwNrVrEP2ioO14/ms1WoOJv+yqTKKUxwsI2xY4NBqCVM1LG4uuEor49ImwBqetLN9L0ssLPAnLgd/nuCh4gWLmG2Ay+1BzlHjNLj1W55iYXGrO+xWYa8fJXioaimMGtBkDeGOGlbc4kosTg8oFtZZqNQhsG54mOChqkVWagBuNYKaMdaOzEr+gGJhoWVsvQd/BXRFmhtDmLGfg4U1H6lgQUdiLUWXJ6CdzJ6PsbAQDatdRny0DCOy2vJZWFz1UjXk5DpYeDmadsO7xc4BfK7SMcuImA9FF1DPw8GiTmMB3DpYOB6yQ1ihk1wYUucm/HQYhW+x4jXIkWdRGLJUPCxuhF9WhmAmB8YD/DnR0oIGjkbrYHFoVr/fM67aMaY+a0miiqyidSD0W9XYvcxSFQ+Lu5FWz+j3uIGGbWNAnmVnXKvNuazuWljcWmVlWqvNLri1y7jKP9KY35xx+RhWYsDdQHdU7XS62PczWWNNhoUhn4+CL+mE4rLAAm3FcRb/QYnEOlhDrmnLcWxr0egaWGWr4vJrULgbEkc/M7Ad285qyEqCdcO5xAs3g4cWaBefDVlGfx0sI9KyPYfy3wgsN3wyV/TRS8j/8a9fUAIrocbc5Yp5LkJnuE0oz1sLa1wJfs86Mm7sBFhuPXwV/q0/08gekOUZGRQrUyXB6jgxtEz+rUihG2teYKC4FlYn1CH84ZidFoFFqqEO7DY5C4xyzM4Gwr8xRrKSYBntIztshxOse2ryJ7gXfSz4WgvLqPP+W4vHLeMXgWUv7gl310LvsOqfhm00idBrdDbo1q5QRRLXh8Tm7DRtEh44m+CHSZaz2RNCm4JdYQRa5+o8b2Arl0Uay8c8Pc2mFY9j+r+z6EfVU3YZi0ReojDnbbRcMs30JYHfDpmihZj9m3N/Fr9Y7PWfiHEva+s1lh8Tck3rdMe0LTZsVMfQPL9bsdpcfs8hUxo+zulJ9HZ0DwPt9Ka+GY5DbuOCzdkBoY2R23nO71Ns17r1ereWZEW/5n+6zY7IYbfeTbHztNrrDRNzVb6N3W5N3gsWChUqVKhQoS+l/wOwMf8+fZ8MtQAAAABJRU5ErkJggg==" alt="logo" />
                </a>

            </div>
            <div className="col-span-10 px-10">
                <div>
                    <input 
                        className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"     
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    />
                    <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">🔍</button>
                </div>
                { showSuggestions && (
                <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
                    <ul>
                        {suggestions.map((s) => (
                            <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">🔍 {s}</li>
                        ))}
                    </ul>
                </div> )}

            </div>
            <div className="col-span-1">
                <img className="h-8" alt="user-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAbFBMVEX///8AAAAsLCz8/PwEBAT5+fn09PTt7e3w8PDg4OB/f3+tra2CgoJBQUHc3Nzk5OQPDw+NjY1NTU3Hx8d5eXm8vLybm5tkZGQ4ODheXl5wcHC2trbQ0NDW1tZpaWlISEijo6MjIyMXFxdWVlYkIv9JAAAEsUlEQVR4nO2aa3OyOhCAE5cQ5I4IUrzg5f//x5MEUV+1NiiB9UyeD+10OmOf2W52NxdCLBaLxWKxWCwWi8VisVj+n8DlyxchfQG6b98FSGMA+C7xr5JVQJcaPN9n9Wq1y/Y5b3+BGgAGjLjz4JTSC+kpmLuEMMzpLjOa5eHsIu046lsV5gz1OhVq8+yghB3afVNfZlmMWFxk+HpxjXMXdIfKnxdBWyDR2YvkJiy7Vb4nY2rxIjOX0XTrF9qCmqs1OrXqHUB4SOmLiItfhRxdwAVu5rzylpnvZB66JcrI+nWetKxxrU7psjm8jPeZw2Zq11tUmfv5twr+lucrbKmSUz1xmk9teoto9Cf6sqR04g49ISqIQqQ4/p3fLccCjzgBd6nr7dAlIDKfL7S96WKORhxIcdCNuKiIBZomBFDqe1O6xxNx/RSXhC4WccJXfcR3HE3Ik0an3Xcskql9L8yjPhGP5lP7XoirPuIVnnr4tREXOd6DBk+Oi6rSY3Gu+NS+HeD6fSLuu1hyHEjPzolFnPSaVWbF1LY3yOlQJ8vlsZaYDtnUvh1AQr1oy91diOpsJT92B51/iR9zNFOtOhGUY5aW+ArRgbP02OglOaUbguzgs9YT3+EphWe2lY75bItOXPfsEJs3ACtfR1z+tmSEoTMnbvjbMZxzvk8J3aktnyAqhZy1nke9rfE+Rm9V49wyfeqtSEs0U+Et6k6ZkfzplkKGOyoAX35fAMLLinap7lxzflai2T08RfXQbHFdkq33IkN1Kv6IeqBCWLyub7b91XIdyztQtGly9paPDcDlm6AM/WVYBlvOCM4r5RboTr2fDFDqPrl9LoTPHuSVOI+9Z3KtthdzwDPRXhA+82AX+ZvftmW5H+0CPEdBV3K/kfdA1ap4Uvi8YieX67EJ8ZQXkLfKJPaPXadJmyz/p7e7edikXXFP/VgWnumXqnzLBPHDXrnxy6AQBKX/0Ev9OYbXH0KAB7dnns7jiHj9uW1JUeBNH3Eg2zpVas5F8m6/f/Oo4jzeOsvttHeG8v+9rrpAPgb4Zsa6+4dEa9WVJjoZEl2cLanu9v6OJZuyISX1u96U1olqWpOw/XlXW6bLabId/1bvycRTcdqaj4/I76R6O03OyGussfO89f5QnEbJ6OMuJOqY8xNxWUNXo19keT4dQtwJvfGc1XY+UAcRH2VKu6EOZJqPUxZBLEy9t2Na8sVoC1T8FS/SuoDQIvJG3JBmd+PJ28hPCUeSFuSHwQIuPuaQjxVwvhvE+cKOjyQefNx47gjGmW8TrWe0ffgZoQ1BG/BhxdPAeF2RzUfufgcVd2jDRqiI+dAZfn7jbFy811M9PW8xbJkWBxIP7d0OW6Z3Qz3f1OhTmk4VNnimtPyYHm83vZ4Y6lNtDId8/+JC8BPSvVFtwnq9d9NHzIhmu37y9knKXxhu+9uPjyR+ozJ7yFKkZrwdmhp81QcE9oYCLj50b6yqyEuTzIR1K54ZW50i4G499ER7Na9NPgrxBt9DXDHaO3ljSFx8amPsfYVIFW6o4ctUqcyJA/CDKXFKD6Y6kDwmS6LDzBSRudY5/a2qxWKxWCwWi8VisVgsFovFYhmL/wAIJDWPptFE0wAAAABJRU5ErkJggg==" />
            </div>
        </div>
    )
}

export default Head