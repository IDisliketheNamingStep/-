import React, {Component} from 'react'
import './movieNav.css'

class movieNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieNavList: ['影讯&购票', '选电影^_^', '电视剧^_^', '排行榜^_^', '分类^_^', '影评', '2018年度榜单', '2018书影音报告']
        }
    }

    render() {
        let movieNavList = this.state.movieNavList
        return (
            <div className="movieNavContainer">
                <div className="movieNavContent">
                    <div className="navFirstLine">
                        <a rel="noopener noreferrer" target='_blank' className='fl' href="https://movie.douban.com/">豆瓣电影</a>
                        {/*<input type="text" placeholder='搜索电影、电视剧、综艺、影人'/>*/}
                        {/*<span>1</span>*/}
                        <div className="searchBar fl">
                            <input type="text" placeholder='搜索电影、电视剧、综艺、影人'/>
                        </div>
                        <div className="fl searchButton" />
                    </div>
                    <div className="secLineContainer">
                        {
                            <ul>
                                {
                                    movieNavList.map((item, index)=><li onClick={()=>this.props.handleCurContentTypeChange(index)} className='fl' key={index}>{item}</li>)
                                }
                            </ul>
                        }
                    </div>
                    <div className="movieAnnual" />
                </div>
            </div>
        )
    }

}

export default movieNav
