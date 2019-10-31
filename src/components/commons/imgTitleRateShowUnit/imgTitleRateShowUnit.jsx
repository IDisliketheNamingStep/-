import React, {Component} from 'react'
import './imgTitleRateShowUnit.css'

class imgTitleRateShowUnit extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {url, movieDetailList, cover, title, rate, is_new} = this.props
        if(!movieDetailList) {
            return (
                <div className="imgTitleRateShowUnitContainer fl">
                    <a target='_blank' rel='noreferrer noopener' href={url}>
                        <div className="imgTitleRateShowUnitContent">
                            <img src={cover} alt=""/>
                            <p className='textOverflow2 clearfix'>
                                <img alt='' src={require('../../../assets/images/ic_new.png')} className={is_new ? 'isNew' : 'hide'} />
                                <span>{title}</span>
                                <span>{rate}</span>
                            </p>
                        </div>
                    </a>
                </div>
            )
        }
        let {title1, short_comment, playable, actors, directors, types, duration, region, star, score} = 'undefined'
        if(movieDetailList) {
            title1 = movieDetailList.title
            short_comment= movieDetailList.short_comment
            playable = movieDetailList.playable
            actors = movieDetailList.actors
            directors = movieDetailList.directors
            types = movieDetailList.types
            duration = movieDetailList.duration
            region = movieDetailList.region
            star = movieDetailList.star
            score = movieDetailList.rate
        }
        let starCSS = 'stars' + star
        return (
            <div className="imgTitleRateShowUnitContainer fl">
                <a target='_blank' rel='noreferrer noopener' href={url}>
                    <div className="imgTitleRateShowUnitContent">
                        <img src={cover} alt=""/>
                        <p className='textOverflow2 clearfix'>
                            <img alt='' src={require('../../../assets/images/ic_new.png')} className={is_new ? 'isNew' : 'hide'} />
                            <span>{title}</span>
                            <span>{rate}</span>
                        </p>
                    </div>
                </a>
                <div className="detailPopBox">
                    <div className="detailPopContent">
                        <a target='_blank' rel='noreferrer noopener' href={url}>
                            <p className="movieTitle">{title1}</p>
                        </a>
                        <span className={star?  'stars ' + starCSS :'stars'} >&nbsp;</span>
                        <span className="score">{score}</span>
                        <ul className='clearfix'>
                            <li className={playable?'show':null}>可播放</li>
                            <li>{duration}</li>
                            <li>{region?region:null}</li>
                            {
                                types.map((item, index)=><li key={index}>{item}</li>)
                            }
                            <li>{directors[0]}(导演)</li>
                            {
                                [0,1,2].map((item, index)=><li key={index}>{actors[index]}</li>)
                            }
                        </ul>
                        <p>
                            <span className="wantWatch">想看</span>
                            <span className="watched">看过</span>
                        </p>
                    </div>
                    <p className="userComment">
                        {short_comment.content}
                        <br/>
                        <span className="userNickname">{short_comment.author}的短评</span>
                    </p>
                </div>
            </div>
        )
    }

}

export default imgTitleRateShowUnit
