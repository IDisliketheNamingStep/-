import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

import './selectMovie.css'
import axios from 'axios'

import RecommendGroup from '../../components/commons/recommendGroup/recommendGroup'
import SearchTags from '../../components/commons/searchTags/searchTags'
import ImgTitleRateShowUnit from '../../components/commons/imgTitleRateShowUnit/imgTitleRateShowUnit'
import TopBar from '../../components/commons/topBar/topBar'
import MovieNav from '../../components/commons/movieNav/movieNav'
axios.defaults.withCredentials=true;

class selectMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 当前内容类型，默认为电影
            curContentType: 'movie',
            // 当前内容title
            pageTitle: {'movie':'选电影','tv':'热门电视剧'},
            // 获取信息的起始序号
            page_start: 0,
            // 每次获取信息的数量
            page_limit: 20,
            // 是否只展示未看过标志，默认false，此时未选中
            showUnWatchedOnly: false,
            // 是否只展示可播放，默认false，此时未选中
            showPlayableOnly: false,
            // 排序类型
            sortType: 'recommend',
            // 展示信息列表
            searchSubjects:[],
            // 已经查看过详情的电影列表，以电影id为索引值
            movieDetailList: {},
            // 当前标签
            currentTag: '热门',
            // 判断当前标签是否为‘最新’
            defaultChecked: true,
            // selectTags: ["热门", "最新", "经典", "可播放", "豆瓣高分", "冷门佳片", "华语", "欧美", "韩国", "日本", "动作", "喜剧", "爱情", "科幻", "悬疑", "恐怖", "动画"]
            selectTags: [],
            // 推荐小组
            recommend_groups: []
        }
        this.handleCurentTagsChange = this.handleCurentTagsChange.bind(this)
        // this.handleCurContentTypeChange = this.handleCurContentTypeChange.bind(this)
        this.sortTypeRefs = React.createRef()
    }

    // 获取标签数组https://movie.douban.com/j/search_tags?type=movie&source=
    async getSelectTagsInfo() {
        let {curContentType} = this.state
        let selectTags = await axios.get('/api/j/search_tags?type=' + curContentType + '&source=')
        selectTags = selectTags.data.tags
        await this.setState({selectTags})
    }
    // 获取推荐小组信息https://movie.douban.com/j/tv/recommend_groups?tag=%E7%83%AD%E9%97%A8
    async getRecommend_groupsInfo() {
        let {curContentType, currentTag} = this.state
        if(curContentType !== 'tv') {
            return
        }
        let recommend_groups = await axios.get('/api/j/tv/recommend_groups?tag=' + currentTag)
        recommend_groups = recommend_groups.data.groups
        await this.setState({recommend_groups})
    }
    // 获取hover电影详情信息https://movie.douban.com/j/subject_abstract?subject_id=26709258
    async gethoverMovieInfo(subject_id) {
        let {movieDetailList} = this.state
        if(movieDetailList[subject_id]) {
            return
        }
        let res = await axios.get('/api/j/subject_abstract?subject_id=' + subject_id)
        res = res.data.subject
        movieDetailList = {...movieDetailList, [subject_id]: res}
        await this.setState({movieDetailList})
        // console.log(res, '4444444444444444444',movieDetailList)
    }
    // 获取展示数据https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0
    async getMoviesListInfo() {
        let {curContentType, showUnWatchedOnly, showPlayableOnly, searchSubjects, currentTag, sortType, page_limit, page_start} = this.state
        let url = '/api/j/search_subjects?type=' + curContentType + '&tag=' + currentTag + '&sort=' + sortType + '&page_limit=' + page_limit + '&page_start=' + page_start
        // 判断若标签为最新，则排序默认为按时间排序
        if (currentTag === '最新') {
            url = '/api/j/search_subjects?type=' + curContentType +'&tag=' + currentTag + '&page_limit=' + page_limit + '&page_start=' + page_start
        }
        // 判断是否只展示可播放的
        if(showPlayableOnly) {
            url += '&playable=on'
        }
        // 判断是否只展示未看过的
        if (showUnWatchedOnly) {
            url += '&watched=on'
        }
        let res = await axios.get(url)
        res = res.data.subjects
        searchSubjects.push(...res)
        await this.setState({searchSubjects})
        // console.log(res, '233', searchSubjects)
    }
    // 子组件searchTags传出修改当前标签
    async handleCurentTagsChange(currentTag) {
        let tempTag = this.state.currentTag
        let sortType = this.state.sortType
        let defaultChecked = true
        if(tempTag === currentTag) {
            return
        }
        if (currentTag === '最新') {
            defaultChecked = false
            sortType = 'time'
        }
        await this.setState({defaultChecked, sortType, currentTag, searchSubjects: []})
        this.getMoviesListInfo()
        this.getRecommend_groupsInfo()
    }
    // 处理排序标准改变
    async handleSortTypeChange(sortType) {
        let tempSortType = this.state.sortType
        if(tempSortType === sortType) {
            return
        }
        await this.setState({sortType, searchSubjects: []})
        this.getMoviesListInfo()
        // console.log(this.state.sortType, '2333333333333333333')
    }
    // 只展示没看过的
    async handleWatchedChange() {
        await this.setState({showUnWatchedOnly: !this.state.showUnWatchedOnly, searchSubjects: []})
        this.getMoviesListInfo()
    }
    // 只展示可播放的
    async handlePlayableChange() {
        await this.setState({showPlayableOnly: !this.state.showPlayableOnly, searchSubjects: []})
        this.getMoviesListInfo()
    }
    // 点击了加载更多
    async loadmore() {
        let page_start = this.state.page_start + 20
        await this.setState({page_start})
        this.getMoviesListInfo()
    }
    // 处理子组件movieNav传出内容类型改变
    // async handleCurContentTypeChange(index) {
    //     let {curContentType} = this.state
    //     if (index === 1) {
    //         if (curContentType === 'movie') {
    //             return
    //         }
    //         await this.setState({curContentType: 'movie', pageTitle: '选电影', searchSubjects: [], page_start: 0})
    //         await this.getSelectTagsInfo()
    //         await this.setState({currentTag: this.state.selectTags[0]})
    //         await this.getMoviesListInfo()
    //     }
    //     if (index === 2) {
    //         if (curContentType === 'tv') {
    //             return
    //         }
    //         await this.setState({curContentType: 'tv', pageTitle: '热门电视剧', searchSubjects: [], page_start: 0})
    //         await this.getSelectTagsInfo()
    //         await this.setState({currentTag: this.state.selectTags[0]})
    //         await this.getMoviesListInfo()
    //         this.getRecommend_groupsInfo()
    //     }
    // }

    async componentDidMount() {
        let curContentType = this.props.match.params.curContentType
        // console.log(this.props.match.params.curContentType,'222222')
        await this.setState({curContentType})
        // 获取标签数组https://movie.douban.com/j/search_tags?type=movie&source=
        this.getSelectTagsInfo()
        // 获取展示数据https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0
        this.getMoviesListInfo()
        // 获取推荐小组信息https://movie.douban.com/j/tv/recommend_groups?tag=%E7%83%AD%E9%97%A8
        this.getRecommend_groupsInfo()
    }

    render() {
        return (
            <div className="selectMovieContainer">
                <TopBar />
                <div className="homeNavContainer">
                    {/*<MovieNav handleCurContentTypeChange={this.handleCurContentTypeChange} />*/}
                    <MovieNav />
                </div>
                <div className="selectMovieContent">
                    <h1 className='pageTitle'>{this.state.pageTitle[this.state.curContentType]}</h1>
                    {/*左侧内容列*/}
                    <div className="selectMainContent fl">
                        {/*分类标签*/}
                        <SearchTags handleCurentTagsChange={this.handleCurentTagsChange} selectTags={this.state.selectTags} />
                        {/*排序及展示选项切换*/}
                        <div className="sortAndShowChoiceContent">
                            {/*排序选项*/}
                            <div ref={this.sortTypeRefs} className="sortContent fl clearfix">
                                <input  defaultChecked={true}  disabled={!this.state.defaultChecked} onClick={()=>this.handleSortTypeChange('recommend')} id='recommend' name='sortType' type="radio" /><label htmlFor="recommend">按热度排序</label>
                                <input checked={(!this.state.defaultChecked) || this.state.sortType === 'time'} disabled={!this.state.defaultChecked} onChange={()=>null} onClick={()=>this.handleSortTypeChange('time')} id='time' name='sortType' type="radio" /><label htmlFor="time">按时间排序</label>
                                <input disabled={!this.state.defaultChecked} onClick={()=>this.handleSortTypeChange('rank')} id='rank' name='sortType' type="radio" /><label htmlFor="rank">按评价排序</label>
                            </div>
                            {/*展示选项*/}
                            <div className="showChoiceContent fr clearfix">
                                <input onChange={()=>this.handleWatchedChange()} id='unWatchedOnly' type="checkbox" /><label htmlFor="unWatchedOnly">我没看过的</label>
                                <input onChange={()=>this.handlePlayableChange()} id='isPlayableOnly' type="checkbox" /><label htmlFor="isPlayableOnly">可在线播放</label>
                            </div>
                        </div>
                        {/*展示区容器*/}
                        <div className="showMovieUnitBox">
                            {
                                this.state.searchSubjects.map((item, index)=> <span onMouseOver={()=>this.gethoverMovieInfo(item.id)} key={index} ><ImgTitleRateShowUnit movieDetailList={this.state.movieDetailList[item.id]} {...item}/></span>)
                            }
                        </div>
                        {/*点击加载更多*/}
                        <div onClick={()=>this.loadmore()} className="loadmore">加载更多</div>
                        {/*底部空白*/}
                        <div className="footer" />

                    </div>
                    {/*右侧广告列*/}
                    <div className="selectAdsArea fr">
                        <RecommendGroup recommend_groups={this.state.recommend_groups} />
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(selectMovie)
