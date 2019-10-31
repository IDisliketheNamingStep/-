import React, {Component} from 'react'
import './categoryShow.css'

import TopBar from '../../components/commons/topBar/topBar'
import MovieNav from '../../components/commons/movieNav/movieNav'
import CatListShow from '../../components/commons/catListShow/catListShow'
import RecommendGroup from "../../components/commons/recommendGroup/recommendGroup";
import ImgTitleRateShowUnit from "../../components/commons/imgTitleRateShowUnit/imgTitleRateShowUnit";

class categoryShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchSubject: []
        }
        this.handleResInfoFromCatListShow = this.handleResInfoFromCatListShow.bind(this)
    }
    async handleResInfoFromCatListShow(searchSubject) {
        searchSubject = searchSubject.data
        await this.setState({searchSubject})
        console.log(searchSubject,this.state.searchSubject.data, '211111111111')

    }
    // TODO
    // 点击了加载更多
    async loadmore() {
        let page_start = this.state.page_start + 20
        await this.setState({page_start})
        this.getMoviesListInfo()
    }

    render() {
        let {searchSubject} = this.state
        console.log(searchSubject, '6666666');
        if(JSON.stringify(searchSubject) === '[]') {
            return (
                <div className="categoryShowContainer">
                    <TopBar />
                    <div className="homeNavContainer">
                        <MovieNav handleCurContentTypeChange={this.handleCurContentTypeChange} />
                    </div>
                    <div className="categoryShowContent">
                        <h1 className='pageTitle'>选影视</h1>
                        {/*左侧内容列*/}
                        <div className="catMainContent fl">
                            <CatListShow  handleResInfoFromCatListShow={this.handleResInfoFromCatListShow} />
                            {/*展示区容器*/}
                            <div className="showMovieUnitBox">
                                {
                                    [].map((item, index)=> <span key={index}><ImgTitleRateShowUnit {...item}/></span>)
                                    // this.state.searchSubjects.map((item, index)=> <a onMouseOver={()=>this.gethoverMovieInfo(item.id)} key={index} target='_blank' rel='noopener noreferrer' href={item.url}><ImgTitleRateShowUnit movieDetailList={this.state.movieDetailList[item.id]} {...item}/></a>)
                                    // this.state.searchSubjects.map((item, index)=><ImgTitleRateShowUnit onMouseOver={()=>this.gethoverMovieInfo(item.id)} key={index} movieDetailList={this.state.movieDetailList[item.id]} {...item}/>)
                                }
                            </div>
                            {/*点击加载更多*/}
                            <div onClick={()=>this.loadmore()} className="loadmore">加载更多</div>
                            {/*底部空白*/}
                            <div className="footer" />
                        </div>
                        <div className="catAdsArea fr">
                            广告位招租
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="categoryShowContainer">
                <TopBar />
                <div className="homeNavContainer">
                    <MovieNav handleCurContentTypeChange={this.handleCurContentTypeChange} />
                </div>
                <div className="categoryShowContent">
                    <h1 className='pageTitle'>选影视</h1>
                    {/*左侧内容列*/}
                    <div className="catMainContent fl">
                        <CatListShow  handleResInfoFromCatListShow={this.handleResInfoFromCatListShow} />
                        {/*展示区容器*/}
                        <div className="showMovieUnitBox">
                            {
                                this.state.searchSubject.data.map((item, index)=> <span key={index}><ImgTitleRateShowUnit {...item}/></span>)
                                // this.state.searchSubjects.map((item, index)=> <a onMouseOver={()=>this.gethoverMovieInfo(item.id)} key={index} target='_blank' rel='noopener noreferrer' href={item.url}><ImgTitleRateShowUnit movieDetailList={this.state.movieDetailList[item.id]} {...item}/></a>)
                                // this.state.searchSubjects.map((item, index)=><ImgTitleRateShowUnit onMouseOver={()=>this.gethoverMovieInfo(item.id)} key={index} movieDetailList={this.state.movieDetailList[item.id]} {...item}/>)
                            }
                        </div>
                        {/*点击加载更多*/}
                        <div onClick={()=>this.loadmore()} className="loadmore">加载更多</div>
                        {/*底部空白*/}
                        <div className="footer" />
                    </div>
                    <div className="catAdsArea fr">
                        广告位招租
                    </div>
                </div>
            </div>
        )
    }

}

export default categoryShow
