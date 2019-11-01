import React, {Component} from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import './catListShow.css'

class catListShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // tags0选中标记
            tags0Active: 0,
            // genres选中标记
            genresActive: 0,
            // countries选中标记
            countriesActive: 0,
            // year_range选中标记
            year_rangeActive: 0,
            // tags1选中标记
            tags1Active: 0,
            // 评分范围
            range: [0, 10],
            // 是否只显示可播放标记
            playableOnly: false,
            // 是否只显示未看过标记
            unwatchedOnly: false,
            // 排序类型选中标志
            sortActive: 0,
            // 信息起始标志
            start: 0,
            // 以下为分类列表
            tags0: ['全部形式', '电影', '电视剧', '综艺', '动漫', '纪录片', '短片'],
            genres: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠', '情色'],
            countries: ['全部地区', '中国大陆', '美国', '中国香港', '中国台湾', '日本', '韩国', '英国', '法国', '德国', '意大利', '西班牙', '印度', '泰国', '俄罗斯', '伊朗',
                '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'],
            year_range: [{text: '全部年代', year_range: ''}, {text: '2019', year_range: '2019,2019'}, {text: '2018', year_range: '2018,2018'}, {text: '2010年代', year_range: '2010,2019'},
                {text: '2000年代', year_range: '2000,2009'}, {text: '90年代', year_range: '1990,1999'}, {text: '80年代', year_range: '1980,1989'},
                {text: '70年代', year_range: '1970,1979'}, {text: '60年代', year_range: '1960,1969'}, {text: '更早', year_range: '1,1959'}],
            tags1:['全部特色', '经典', '青春', '文艺', '搞笑', '励志', '魔幻', '感人', '女性', '黑帮'],
            sortList: [{text:'近期热门',mark:'U'}, {text:'标记最多',mark:'T'}, {text:'评分最高',mark:'S'}, {text:'最新上映',mark:'R'}],

        }
        this.rangeRefs0 = React.createRef()
        this.rangeRefs1 = React.createRef()
    }
    //https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影,励志&start=0&genres=剧情&countries=美国&year_range=2010,2019
    async getMovieInfo() {
        let {start, tags0Active,tags0, genresActive,genres, countriesActive,countries, year_rangeActive,year_range, tags1Active,tags1, range, playableOnly, unwatchedOnly, sortActive, sortList} = this.state
        let tempTagArr = []
        if(tags0Active !== 0) {
            tempTagArr.push(tags0[tags0Active])
        }
        if(tags1Active !== 0) {
            tempTagArr.push(tags1[tags1Active])
        }
        // 默认URL，未加任何选项
        let url = '/api/j/new_search_subjects?sort=' + sortList[sortActive].mark + '&range=' + range.join(',') + '&tags=' + tempTagArr.join(',') + '&start=' + start
        // 增加剧情选项搜索
        if(genresActive !== 0) {
            url = url + '&genres=' + genres[genresActive]
        }
        // 增加地区限制搜索
        if (countriesActive !== 0) {
            url = url + '&countries=' + countries[countriesActive]
        }
        // 增加年代条件搜索
        if (year_rangeActive !== 0) {
            url = url + '&year_range=' + year_range[year_rangeActive].year_range
        }
        // 判断是否只显示可播放的
        if(playableOnly) {
            url += '&playable=1'
        }
        // 判断是否只显示未看过的
        if(unwatchedOnly) {
            url += '&unwatched=1'
        }
        let res = await axios.get(url)
        // 将数据传给父组件保存
        await this.props.handleResInfoFromCatListShow(res.data)
    }
    // 改变标签选中标志，每次改变重新获取信息
    async handleKeyWordsChange(tagName, index) {
        tagName += 'Active'
        await this.setState({[tagName]: index})
        this.getMovieInfo()
    }
    // 改变排序类型，每次改变重新获取信息
    async handleSortTypeChange(index) {
        await this.setState({sortActive: index})
        this.getMovieInfo()
    }
    // 改变评分范围，每次改变重新获取信息
    async handleRangeChange() {
        let {range} = this.state
        let temp0 = ReactDom.findDOMNode(this.rangeRefs0.current).options.selectedIndex
        let temp1 = ReactDom.findDOMNode(this.rangeRefs1.current).options.selectedIndex
        if(temp0 > temp1) {
            range = [temp1, temp0]
        } else {
            range = [temp0, temp1]
        }
        await this.setState({range})
        this.getMovieInfo()
    }
    // 处理‘未看过’与‘可播放’选中及取消
    async handlePlayableChange(attrName) {
        await this.setState({[attrName]: !this.state[attrName]})
        this.getMovieInfo()
    }
    // 父组件点击了‘加载更多’会触发这个函数
    async loadmore0() {
        // 获取的起始信息自增
        let start = this.state.start + 20
        await this.setState({start})
        this.getMovieInfo()
    }
    async componentDidMount() {
        // 组件一经挂在即获取信息
        this.getMovieInfo()
        // 组件一经挂载即向父组件传递本组件对象
        await this.props.onRef(this)
    }

    render() {
        return (
            <div className="catListShowContainer">
                <div className="catListShowContent">
                    <ul>
                        {
                            this.state.tags0.map((item, index)=><li onClick={()=>this.handleKeyWordsChange('tags0', index)} className={this.state.tags0Active === index ? 'active fl' : 'fl'} key={index}>{item}</li>)
                        }
                    </ul>
                    <ul>
                        {
                            this.state.genres.map((item, index)=><li onClick={()=>this.handleKeyWordsChange('genres', index)} className={this.state.genresActive === index ? 'active fl' : 'fl'} key={index}>{item}</li>)
                        }
                    </ul>
                    <ul>
                        {
                            this.state.countries.map((item, index)=><li onClick={()=>this.handleKeyWordsChange('countries', index)} className={this.state.countriesActive === index ? 'active fl' : 'fl'} key={index}>{item}</li>)
                        }
                    </ul>
                    <ul>
                        {
                            this.state.year_range.map((item, index)=><li onClick={()=>this.handleKeyWordsChange('year_range', index)} className={this.state.year_rangeActive === index ? 'active fl' : 'fl'} key={index}>{item.text}</li>)
                        }
                    </ul>
                    <ul>
                        {
                            this.state.tags1.map((item, index)=><li onClick={()=>this.handleKeyWordsChange('tags1', index)} className={this.state.tags1Active === index ? 'active fl' : 'fl'} key={index}>{item}</li>)
                        }
                    </ul>
                </div>
                <div className="sortTypeAndShowChoice">
                    <div className="">
                        <ul className='sortType'>
                            {
                                this.state.sortList.map((item, index)=><li onClick={()=>this.handleSortTypeChange(index)} className={this.state.sortActive === index? 'sortActive':null} key={index}>{item.text}</li>)
                            }
                        </ul>
                    </div>
                    <div className="showChoice fr">
                        <input onChange={()=>this.handlePlayableChange('playableOnly')} id='checkbox0' type="checkbox"/><label htmlFor='checkbox0'>可播放</label>
                        <input onChange={()=>this.handlePlayableChange('unwatchedOnly')} id='checkbox1' type="checkbox"/><label htmlFor='checkbox1'>我没看过</label>
                    </div>
                    <div className="selectScore">
                        <label>最低分</label><select ref={this.rangeRefs0} onChange={()=>this.handleRangeChange()} name="range" id="range">
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                        <label>最高分</label><select ref={this.rangeRefs1} onChange={()=>this.handleRangeChange()} defaultValue='10' name="range" id="range">
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                    </div>
                </div>
            </div>
        )
    }

}

export default catListShow
