import React, {Component} from 'react'
import './rankShow.css'
class rankShow extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {actors, cover_url, is_playable, score, title, types, release_date, regions, rankPos, vote_count} = this.props
        if(!release_date) {
            return <div/>
        }
        let year = release_date.slice(0, 4)
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
