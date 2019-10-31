import React, {Component} from 'react'
import './topBar.css'

class topBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageCatList: ['豆瓣', '读书', '电影', '音乐', '同城', '小组', '阅读', 'FM', '时间', '豆品', '更多']
        }
    }

    render() {
        let pageCatList = this.state.pageCatList
        return (
            <div className="topBarContainer">
                <div className="topBarContent">
                    <ul>
                        {
                            pageCatList.map((item, index)=><li className='fl' key={index}>{item}</li> )
                        }

                    </ul>
                    <p className='fr'>
                        <span>下载豆瓣客户端</span>
                        <span>登录/注册</span>
                    </p>
                </div>
            </div>
        )
    }

}

export default topBar
