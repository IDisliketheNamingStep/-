import React, {Component} from 'react'
import './recommendGroup.css'
import index from "postcss-normalize";

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
        //url: https://www.douban.com/group/202728/
        // picture: https://img3.doubanio.com/view/group/sqxs/public/ce9cf903bd47971.webp
        // name: "「米飯大好き」"
        // n_member: 7514
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
                                        {/*<span>{item.n_member}</span>*/}
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
