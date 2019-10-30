import React, {Component} from 'react'
import axios from 'axios'

import BacktoTop from '../../components/commons/backtoTop/backtoTop'
import './homePage.css'
import TopBar from '../../components/homeCpns/topBar/topBar'
import MovieNav from '../../components/homeCpns/movieNav/movieNav'
import TitleAndTypeChange from '../../components/homeCpns/titleAndTypeChange/titleAndTypeChange'
import RankShow from '../../components/homeCpns/rankShow/rankShow'


axios.defaults.withCredentials=true;


class homePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            interval_id: '100%3A90',
            action: '',
            // 获取信息的起始位置，每次自增20
            start: 0,
            // 每次获取20条信息
            limit: 20
        }
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.bindScroll = this.bindScroll.bind(this)
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
    }
    // 获取信息函数
    async getMovieList() {
        let {oldType, type, interval_id, action, start, limit} = this.state
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
        this.getMovieList()
    }
    componentWillUnmount() {
        // 移除滚动监听
        window.removeEventListener('scroll', this.bindScroll);
    }

    render() {
        let {catName} =this.state
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
                        <div className="rankShowArea">
                            {
                                this.state.rankList.map((item, index)=><RankShow key={index} rankPos={index} {...item} />)
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
