import React, {Component} from 'react'
import './backtoTop.css'

class backtoTop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topButtonShowMark: false
        }
        this.toTopShowMark = this.toTopShowMark.bind(this)
    }
    scrolltoTop() {
        let itimer = setInterval(()=> {
            document.documentElement.scrollTop -= 80
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(itimer)
                // console.log('我到顶部啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦')
            }
        },0)
    }
    toTopShowMark() {
        let tempScroll = document.documentElement.scrollTop
        if((tempScroll > 800 && this.state.topButtonShowMark === true) || (tempScroll < 800 && this.state.topButtonShowMark === false)) {
            return
        }
        this.setState({topButtonShowMark: !this.state.topButtonShowMark})
    }
    componentDidMount() {
        // 挂载滚动监听
        window.addEventListener('scroll', this.toTopShowMark)
    }
    componentWillUnmount() {
        // 移除滚动监听
        window.removeEventListener('scroll', this.toTopShowMark);
    }

    render() {
        return (
            <div className="backtoTopContainer">
                <div onClick={()=>this.scrolltoTop()} className={this.state.topButtonShowMark?"backtoTopContent topShow" : 'backtoTopContent'}>
                </div>
            </div>
        )
    }

}

export default backtoTop
