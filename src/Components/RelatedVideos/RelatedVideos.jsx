import { useContext} from 'react';
import MainChannelCard from '../MainChannelCard/MainChannelCard';
import Playlist from '../PlayListCard/PlayList'
import VideoCard from '../VideoCard/VideoCard';

import "./style.scss";
import Shorts from '../Images/shorts.svg'

import ShortCard from '../SortsCard/ShortCard';
import QueryListing from './QueryListing';
import { statesContext } from '../../Contexts/statesContext';

const RelatedVideos = ({elements, renderFrom})=> {
        
        const {theme} = useContext(statesContext);

        return ( 
            <div className={`${renderFrom} ${theme} related-videos `}  >
                { elements?.map((el,i)=>(
                        el?.type === 'video' || el?.viewCount ?  
                            <VideoCard 
                                key={el?.videoId  + i} 
                                data={el} 
                                renderFrom={renderFrom} 
                            />                     
                    : el?.type  === 'channel' ?
                        <MainChannelCard key={el.channelId + i} data={el}  renderFrom={ renderFrom}/>
                    : el.type === 'playlist' ?
                            <Playlist
                                key={el.playlistId + i} 
                                playlist={el} 
                                renderFrom={renderFrom}
                            /> 
                    : el?.type === "shorts_listing" ? 
                        <section className={`${theme} listing`}>
                            <h5 className={`${theme} listing-title`}>
                                <img src={Shorts} alt='shorts' />
                                {el?.title}
                            </h5>
                            <div className={`${theme} shorts-container`}>  
                                {
                                    el?.data?.map((short,i,shorts)=>(
                                        <ShortCard key={short?.videoId +i} short={short} shorts={shorts}/>
                                    ))
                                }
                            </div>
                        </section>
                        : el?.type === "video_listing" ?
                        <section className={`${theme} listing`}>
                            <h5 className={`${theme} listing-title`}>{el?.title}</h5>
                            <div className={`${renderFrom} ${theme} videos-container`}>
                                {
                                    el?.data?.map((el,i)=>(
                                        <VideoCard 
                                            key={el?.videoId + i} 
                                            data={el} 
                                            renderFrom={renderFrom}
                                        /> 
                                        ))
                                }
                            </div>
                        </section>
                        : el?.type === 'query_listing' ?
                        <section className={`${theme} listing`}>
                            <h5 className={`${theme} listing-title`}> {el?.title}</h5>
                            <div className={`${theme} query-container`}>

                                {
                                    el?.data?.map((query,i)=>(
                                        <QueryListing key={query?.query + i}  query={query} />
                                    ))
                                }
                            </div>
                        </section>
                    : ""
                ))}
            </div>
        )

}

export default RelatedVideos