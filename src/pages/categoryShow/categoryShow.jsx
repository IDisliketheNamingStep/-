import React, {Component} from 'react'
import './categoryShow.css'

import TopBar from '../../components/commons/topBar/topBar'
import MovieNav from '../../components/commons/movieNav/movieNav'
import CatListShow from '../../components/commons/catListShow/catListShow'
import ImgTitleRateShowUnit from "../../components/commons/imgTitleRateShowUnit/imgTitleRateShowUnit";

class categoryShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchSubject: []
        }
        this.handleResInfoFromCatListShow = this.handleResInfoFromCatListShow.bind(this)
        this.onRef = this.onRef.bind(this)
    }
    // 接收子组件传出来的信息并保存
    async handleResInfoFromCatListShow(searchSubject) {
        let tempArr = this.state.searchSubject
        searchSubject = [...tempArr, ...searchSubject.data]
        await this.setState({searchSubject})
    }
    // 点击了加载更多,触发子组件函数获取信息
    async loadmore() {
        this.child.loadmore0()
    }
    // this.child绑定子组件对象
    async onRef(ref) {
        this.child = ref
    }

    render() {
        let {searchSubject} = this.state
        // 设置searchSubject为空时的处理，防报错
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
                            <CatListShow onRef={this.onRef}  handleResInfoFromCatListShow={this.handleResInfoFromCatListShow} />
                            {/*展示区容器*/}
                            <div className="showMovieUnitBox">
                                {
                                    [].map((item, index)=> <span key={index}><ImgTitleRateShowUnit {...item}/></span>)
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
        // searchSubject数据已回来时，返回以下内容
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
                                this.state.searchSubject.map((item, index)=> <span key={index}><ImgTitleRateShowUnit {...item}/></span>)
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
