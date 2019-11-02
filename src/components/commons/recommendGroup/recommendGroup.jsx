import React, {Component} from 'react'
import './recommendGroup.css'

class recommendGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {recommend_groups} = this.props
        if(JSON.stringify(recommend_groups) === '[]') {
            return '广告位招租'
        }
        return (
            <div className="recommendGroupContainer fl">
                <div className="recommendGroupContent">
                    <div className="guideWords">喜欢看电视剧的人常去的小组 · · · · · ·</div>
                    <ul>
                        {
                            recommend_groups.map((item, index)=> {
                                return (
                                    <li className='fl' key={index}>
                                        <a href={item.url} target='_blank' rel='noreferrer noopener'>
                                            <img src={item.picture} alt=""/>
                                        </a>
                                            <span>{item.name}<i>({item.n_member})</i></span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }

}

export default recommendGroup
