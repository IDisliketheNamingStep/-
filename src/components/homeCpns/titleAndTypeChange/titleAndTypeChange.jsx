import React, {Component} from 'react'
import './titleAndTypeChange.css'

class titleAndTypeChange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catAndType0: [{title: '剧情', type: 11}, {title: '喜剧', type: 24}, {title: '动作', type: 5}, {title: '爱情', type: 13}, {title: '科幻', type: 17},
                {title: '动画', type: 25}, {title: '悬疑', type: 10,},{title: '惊悚', type: 19}, {title: '恐怖', type: 20}, {title: '纪录片', type: 1}, {title: '短片', type: 23},
                {title: '情色', type: 6}, {title: '同性', type: 26}],
            catAndType1: [{title: '音乐', type: 14}, {title: '歌舞', type: 7}, {title: '家庭', type: 28}, {title: '儿童', type: 8},
                {title: '传记', type: 2}, {title: '历史', type: 4}, {title: '战争', type: 22}, {title: '犯罪', type: 3}, {title: '西部', type: 27}, {title: '奇幻', type: 16},
                {title: '冒险', type: 15}, {title: '灾难', type: 15}, {title: '武侠', type: 29}, {title: '古装', type: 30}, {title: '运动', type: 18}, {title: '黑色电影', type: 31}],
            catSlideMark: false
        }
    }
    handleCatSlide() {
        let catSlideMark = !this.state.catSlideMark
        this.setState({catSlideMark})
    }

    render() {
        let {catAndType0, catAndType1, catSlideMark} = this.state
        let {catName} = this.props
        return (
            <div className="titleAndTypeChangeContainer">
                <div className="titleAndTypeChangeContent">
                    <h1 className='fl'>豆瓣电影分类排行榜 - {catName}片</h1>
                    <div className="moreCat fr">
                        <span className='moreButton' onClick={()=>this.handleCatSlide()}>更多类型</span>
                        <div className={catSlideMark ? 'catListBox catSlideDown' : 'catListBox'}>
                            <ul>
                                {
                                    catAndType0.map((item, index)=> <li className='fl' key={index}><span onClick={()=>{
                                        this.handleCatSlide()
                                        this.props.handleTypeChange(item)
                                    }}>{item.title}</span></li>)
                                }
                            </ul>
                            <ul>
                                {
                                    catAndType1.map((item, index)=> <li className='fl' key={index}><span onClick={()=>{
                                        this.handleCatSlide()
                                        this.props.handleTypeChange(item)
                                    }}>{item.title}</span></li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default titleAndTypeChange
