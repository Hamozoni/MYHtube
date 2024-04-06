import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Error from '../Error/Error';
import Comment from './Comment'

import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';

import { useContext, useEffect, useState } from 'react';
import { fetchChannelApi } from '../../Utils/FetchApi';

import './Comments.scss';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const VideoComments = ({id,fetchQuery,renderedFrom})=> {

    const [comments,setComments] = useState([]);
    const [commentsCount,setCommentsCount] = useState(0);
    const [continuation,setContinuation] = useState('')
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isComm,setComm] = useState(true);

    const { lang,theme } = useContext(statesContext);

    const fetchComments = (isLoadMore = false)=>{
        setError(null);
        if(isLoadMore) {
            setIsLoadingMore(true)
        }else {
            setIsLoading(true);
        }
     
        fetchChannelApi(`${fetchQuery}?id=${id}&sort_by=newest&lang=${lang}`)
            .then((data)=>{

                if(isLoadMore){
                   setComments( prev => [...data?.data,...data?.data]);
                }else {
                    setComments(data?.data);
                }
                setCommentsCount(data?.commentsCount);
                setContinuation(data?.continuation);
                console.log(data)
            })
            .catch((err)=>{
                setError(err);
            })
            .finally(()=> {
                setIsLoading(false);
                setIsLoadingMore(false)

            })

    }


    useEffect(fetchComments,[id,lang,fetchQuery]);

    // const loadMore = ()=>{
    //     setIsLoadingMore(true);
    //     if(continuation?.length > 0) {
    //         fetchChannelApi(`${fetchQuery}?id=${id}&lang=${lang}&token=${continuation}&sort_by=newest`)
    //         .then((data)=>{
    //             setComments( prev => [...prev,...data?.data]);
    //             setContinuation(data?.continuation);
    //             setIsLoadingMore(false);
    //         })
    //     }
    // }

   return (

        error ? <Error error={error} /> : isLoading ? '' :
         <div className={`${!isComm  && 'active'} ${renderedFrom} back-color-${theme}-1 comments`}>
                <section className='comment-head' >
                    <h5 
                        className={`t-color-${theme} comm-title`}
                        onClick={()=>  setComm(!isComm)}
                        >
                        {commentsCount} {language[lang].comments}
                        {
                          renderedFrom === 'watch'  &&
                            <span className={`${theme} comm-arrows`} >
                                {isComm ?<ExpandMoreIcon/> : <ClearIcon />}
                            </span>
                        }
                    </h5>
                </section>
                <div className={`${isComm && 'active'} ${renderedFrom} wrapper`}>  
                    {
                        comments?.map((comment)=>(
                            <Comment key={comment?.commentId} comment={comment} />
                        ))
                    } 
                    
                    {/* {  
                      continuation?.length > 0 &&
                      <LoadMoreBtn onClickHandler={loadMore} isLoadingMore={isLoadingMore}/>
                    } */}
                
                </div>
         </div>
   )
};

export default VideoComments;