import React, {Component} from 'react'
import './searchTags.css'

class searchTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTag: 0
        }
    }

    render() {
        let {selectTags} = this.props
        if(!selectTags) {
            return null
        }
        return (
            <div className="searchTagsContainer">
                <div className="searchTagsContent">
                    <ul>
                        {
                            selectTags.map((item, index)=><li onClick={()=>{
                                this.setState({currentTag: index})
                                this.props.handleCurentTagsChange(item)
                            }
                            } className={this.state.currentTag === index ? 'currentSelectTag fl' : 'fl' } key={index}>{item}</li>)
                        }

                    </ul>
                </div>
            </div>
        )
    }

}

export default searchTags
