import React, {Component} from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

import BacktoTop from '../../components/commons/backtoTop/backtoTop'
import './homePage.css'
import TopBar from '../../components/commons/topBar/topBar'
import MovieNav from '../../components/commons/movieNav/movieNav'
import TitleAndTypeChange from '../../components/homeCpns/titleAndTypeChange/titleAndTypeChange'
import RankShow from '../../components/homeCpns/rankShow/rankShow'

axios.defaults.withCredentials=true;

class homePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 图文或列表
            showImgText: true,
            // 是否只显示未看过的
            showUnWatchedOnly: false,
            // 是否只显示可播放的
            showPlayableOnly:false,
            // 当前分类可播放数量
            playable_count: null,
            // 当前分类总数量
            total: null,
            // 当前分类未观看数量
            unwatched_count: null,
            // 分类名
            catName: '剧情',
            // 展示列表
            rankList: [],
            // 页面滚动到底部函数节流标志，默认为false，到底部设置为true，直到取回数据后再设置false
            loading: false,
            // 定义触发到底部函数的高度
            minidistance: 720,
            // 分类名标记，新旧一样时，展示列表追加新数据，新旧不一时，展示列表先置空
            oldType: 11,
            type: 11,
            // 排名区间
            // interval_id: '100%3A90',
            rankSection: 0,
            //        let rankArr = ['95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%', '30%', '25%', '20%', '15%', '10%', '5%', ]
            interval_id: ['100%3A90', '95%3A85', '90%3A80', '85%3A75', '80%3A70', '75%3A65', '70%3A60', '65%3A55', '60%3A50', '55%3A45', '50%3A40', '45%3A35',
                '40%3A30', '35%3A25', '30%3A20', '25%3A15', '20%3A10', '15%3A5', '10%3A0'],
            action: '',
            // 获取信息的起始位置，每次自增20
            start: 0,
            // 每次获取20条信息
            limit: 20
        }
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.bindScroll = this.bindScroll.bind(this)
        this.homePageRefs = React.createRef()
    }
    async handlerankSectionChange() {
        let tempSect = this.state.rankSection
        let rankSection = ReactDom.findDOMNode(this.homePageRefs.current).options.selectedIndex
        if(tempSect === rankSection) {
            return
        }
        await this.setState({rankSection, rankList: [], start: 0})
        this.getAbstractInfo()
        this.getMovieList()
        // console.log(rankSection, this.state.rankSection,this.state.rankList, '2333333')
    }
    // 用户选择了其他类型的排行榜
    async handleTypeChange(item) {
        let newType = item.type
        let type = this.state.type
        if(newType === type) {
            return
        }
        await this.setState({type: newType, start: 0, catName: item.title})
        this.getMovieList()
        this.getAbstractInfo()
    }
    // 获取信息函数
    async getMovieList() {
        let {showUnWatchedOnly, showPlayableOnly, oldType, type, interval_id, rankSection, action, start, limit} = this.state
        // 判断action字符串
        if(showUnWatchedOnly && showPlayableOnly) {
            action = 'playable+unwatched'
        }else if (showPlayableOnly) {
            action = 'playable'
        }else if (showUnWatchedOnly) {
            action = 'unwatched'
        }
        // 判断排行区间===================================================
        interval_id = interval_id[rankSection]

        let rankList = this.state.rankList
        let res = await axios.get('/api/j/chart/top_list?type=' + type + '&interval_id=' + interval_id + '&action=' + action+ '&start=' + start+ '&limit=' + limit, {withCredentials: true})
        res = res.data
        if (oldType !== type) {
            rankList = []
            this.setState({oldType: type})
        }
        rankList.push(...res)
        await this.setState({rankList})
        this.setState({loading: false})
        // console.log(this.state.rankList, '211111')
    }

    // 获取概述信息函数https://movie.douban.com/j/chart/top_list_count?type=11&interval_id=100%3A90
    async getAbstractInfo() {
        let {type, interval_id, rankSection} = this.state
        interval_id = interval_id[rankSection]
        // let res = await axios.get('/api/j/chart/top_list?type=' + type + '&interval_id=' + interval_id + '&action=' + action+ '&start=' + start+ '&limit=' + limit, {withCredentials: true})
        let res = await axios.get('/api/j/chart/top_list_count?type=' + type + '&interval_id=' + interval_id)
        res = res.data
        let {playable_count, total, unwatched_count} = res
        this.setState({playable_count, total, unwatched_count})
        // console.log(playable_count, total, unwatched_count, '211111')
    }
    // 监听页面滑动到底部触发获取下一页信息
    async bindScroll() {
        let {start, loading, minidistance} = this.state
        let distance = document.documentElement.offsetHeight - document.documentElement.scrollTop - document.documentElement.clientHeight
        if(distance < minidistance) {
            if(loading) {
                return
            }
            this.setState({loading: true})
            start += 20
            await this.setState({start})
            this.getMovieList()
            // console.log('我距离底部还有', distance)
        }
    }

    componentDidMount() {
        // 挂载滚动监听
        window.addEventListener('scroll', this.bindScroll)
        // 获取第一次剧情片信息
        // this.getMovieList()

        // 获取概述信息函数https://movie.douban.com/j/chart/top_list_count?type=11&interval_id=100%3A90
        // this.getAbstractInfo()
    }
    componentWillUnmount() {
        // 移除滚动监听
        window.removeEventListener('scroll', this.bindScroll);
    }

    render() {
        let {playable_count, unwatched_count, catName} =this.state
        let rankArr = ['95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%', '30%', '25%', '20%', '15%', '10%', '5%', ]
        return (
            <div className="homePageContainer">
                <BacktoTop />
                <TopBar />
                <div className="homeNavContainer">
                    <MovieNav />
                </div>

                <div className="homeContentContainer">
                    <div className="homeContIner">
                        <TitleAndTypeChange catName={catName} handleTypeChange={this.handleTypeChange} />
                        <div className="rankSection">
                            <label>选择排行区间 (上下5%区间)： </label>
                            <select ref={this.homePageRefs} onChange={()=>this.handlerankSectionChange()}>
                                {
                                    rankArr.map((item, index)=> <option key={index}>{item}</option>)
                                }
                            </select>
                        </div>
                        <div className="actionAndShowType">
                            <div className="actionChoice clearfix">
                                <input onClick={()=>this.setState({showUnWatchedOnly: !this.state.showUnWatchedOnly})} id='checkbox0' type="checkbox"/><label htmlFor='checkbox0'>我没看过（{unwatched_count}）</label>
                                <input onClick={()=>this.setState({showPlayableOnly: !this.state.showPlayableOnly})} id='checkbox1' type="checkbox"/><label htmlFor='checkbox1'>可在线播放（{playable_count}）</label>
                            </div>
                            <div className="showTpeChoice clearfix fr">
                                <input onClick={()=>this.setState({showImgText: true})} defaultChecked={true} name='showType' id='showType0' type="radio"/><label htmlFor='showType0'>图文查看</label>
                                <input onClick={()=>this.setState({showImgText: false})} name='showType' id='showType1' type="radio"/><label htmlFor='showType1'>列表查看</label>
                            </div>
                        </div>
                        <div className="rankShowArea">
                            {
                                this.state.rankList.map((item, index)=><RankShow showImgText={this.state.showImgText} showPlayableOnly={this.state.showPlayableOnly} showUnWatchedOnly={this.state.showUnWatchedOnly} key={index} rankPos={index} {...item} />)
                            }
                        </div>
                    </div>
                </div>
                <div className="footer" />
            </div>
        )
    }

}

export default homePage
