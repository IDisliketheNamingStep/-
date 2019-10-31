import React, {Component} from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import './catListShow.css'

class catListShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags0Active: 0,
            genresActive: 0,
            countriesActive: 0,
            year_rangeActive: 0,
            tags1Active: 0,
            range: [0, 10],
            playableOnly: false,
            unwatchedOnly: false,
            // https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=&start=0&year_range=1960,1969
            // https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影,经典&start=0&genres=剧情&year_range=2019,2019
            //https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影,励志&start=0&genres=剧情&countries=美国&year_range=2010,2019
            //https://movie.douban.com/j/new_search_subjects?sort=R&range=0,1&tags=&playable=1&unwatched=1&start=0&year_range=1,1959
            tags0: ['全部形式', '电影', '电视剧', '综艺', '动漫', '纪录片', '短片'],
            genres: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠', '情色'],
            countries: ['全部地区', '中国大陆', '美国', '中国香港', '中国台湾', '日本', '韩国', '英国', '法国', '德国', '意大利', '西班牙', '印度', '泰国', '俄罗斯', '伊朗',
                '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'],
            year_range: [{text: '全部年代', year_range: ''}, {text: '2019', year_range: '2019,2019'}, {text: '2018', year_range: '2018,2018'}, {text: '2010年代', year_range: '2010,2019'},
                {text: '2000年代', year_range: '2000,2009'}, {text: '90年代', year_range: '1990,1999'}, {text: '80年代', year_range: '1980,1989'},
                {text: '70年代', year_range: '1970,1979'}, {text: '60年代', year_range: '1960,1969'}, {text: '更早', year_range: '1,1959'}],
            tags1:['全部特色', '经典', '青春', '文艺', '搞笑', '励志', '魔幻', '感人', '女性', '黑帮'],
            sortList: [{text:'近期热门',mark:'U'}, {text:'标记最多',mark:'T'}, {text:'评分最高',mark:'S'}, {text:'最新上映',mark:'R'}],
            sortActive: 0,
            start: 0

        }
        this.rangeRefs0 = React.createRef()
        this.rangeRefs1 = React.createRef()
    }
    //https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影,励志&start=0&genres=剧情&countries=美国&year_range=2010,2019
    //playableOnly: false,
    //             unwatchedOnly: false,
    async getMovieInfo() {
        let {start, tags0Active,tags0, genresActive,genres, countriesActive,countries, year_rangeActive,year_range, tags1Active,tags1, range, playableOnly, unwatchedOnly, sortActive, sortList} = this.state
        let tempTagArr = []
        if(tags0Active !== 0) {
            tempTagArr.push(tags0[tags0Active])
        }
        if(tags1Active !== 0) {
            tempTagArr.push(tags1[tags1Active])
        }
        let url = '/api/j/new_search_subjects?sort=' + sortList[sortActive].mark + '&range=' + range.join(',') + '&tags=' + tempTagArr.join(',') + '&start=' + start
        // let url = '/api/j/new_search_subjects?sort=' + sortList[sortActive].mark + '&range=' + range + '&tags=' + tempTagArr.join(',') + '&start=' + start +
        // '&genres=' + genres[genresActive] +
        // '&countries=' + countries[countriesActive] +
        // '&year_range=' + year_range[year_rangeActive].year_range
        if(genresActive !== 0) {
            url = url + '&genres=' + genres[genresActive]
        }
        if (countriesActive !== 0) {
            url = url + '&countries=' + countries[countriesActive]
        }
        if (year_rangeActive !== 0) {
            url = url + '&year_range=' + year_range[year_rangeActive].year_range
        }
        if(playableOnly) {
            url += '&playable=1'
        }
        if(unwatchedOnly) {
            url += '&unwatched=1'
        }
        let res = await axios.get(url)
        await this.props.handleResInfoFromCatListShow(res)
        console.log(res.data, '2666666666666666666666');

    }
    async handleKeyWordsChange(tagName, index) {
        tagName += 'Active'
        console.log(index)
        await this.setState({[tagName]: index})
        this.getMovieInfo()
        // console.log(this.state[tagName], '23333')
    }
    async handleSortTypeChange(index) {
        await this.setState({sortActive: index})
        this.getMovieInfo()
    }
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
        // console.log('233333333333333333', this.state.range)
    }
    async handlePlayableChange(attrName) {
        await this.setState({[attrName]: !this.state[attrName]})
        this.getMovieInfo()
    }
    componentDidMount() {
        this.getMovieInfo()
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
