import React, {Component} from 'react'
import './rankShow.css'
class rankShow extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {showImgText, showUnWatchedOnly, showPlayableOnly, actors, cover_url, is_playable, is_watched, score, title, types, release_date, regions, rankPos, vote_count} = this.props
        // 数据未请求回来前返回空
        if(!release_date) {
            return <div/>
        }
        let year = release_date.slice(0, 4)

        // 判断是否只显示可播放的内容============
        if (showPlayableOnly && !is_playable) {
            return null
        }
        // 判断是否只显示未看过的===============
        if (showUnWatchedOnly && is_watched) {
            return null
        }
        // 判断显示形式，图文or列表============
        if (!showImgText) {
            return (
                <div className="rankShowContainer textOnlyRankContainer clearfix fl">
                    <div className="rankShowContent textOnlyRankContent">
                        <div className="descArea textOnlyRankdescArea">
                            <p className="filmTitle">
                                <span className={is_playable ?'playable fl' : 'fl'}>{title}</span>
                                <span className="score fl">{score}</span>
                                <span className="comsNum fl">{vote_count}评价</span>
                                <span className='fr'>{rankPos + 1}</span>
                            </p>
                        </div>
                    </div>
                    {/*===========================================================================*/}
                    <div className="hoverRankContainer rankShowContainer clearfix fl">
                        <div className="hoverRankContent rankShowContent">
                            <img src={cover_url} alt=""/>
                            <div className="descArea">
                                <p className="filmTitle">
                                    <span className={is_playable ?'playable' : null}>{title}</span>
                                    <span className='fr'>{rankPos + 1}</span>
                                </p>
                                <p className="actors textOverflow">{actors.join(' / ')}</p>
                                <p className="yearAndTags textOverflow">{year} / {regions.join(' / ')} / {types.join(' / ')}</p>
                                <span className="stars" >&nbsp;</span>
                                <span className="score">{score}</span>
                                <span className="comsNum">{vote_count}评价</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="rankShowContainer clearfix fl">
                <div className="rankShowContent">
                    <img src={cover_url} alt=""/>
                    <div className="descArea">
                        <p className="filmTitle">
                            <span className={is_playable ?'playable' : null}>{title}</span>
                            <span className='fr'>{rankPos + 1}</span>
                        </p>
                        <p className="actors textOverflow">{actors.join(' / ')}</p>
                        <p className="yearAndTags textOverflow">{year} / {regions.join(' / ')} / {types.join(' / ')}</p>
                        <span className="stars" >&nbsp;</span>
                        <span className="score">{score}</span>
                        <span className="comsNum">{vote_count}评价</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default rankShow
